import { app, BrowserWindow, ipcMain, Menu, shell, globalShortcut } from "electron";
import { fileURLToPath } from "node:url";
import { WCF } from "./wcf";
import { ElectronUpdate } from "./update";
import path from "node:path";
const isDev = !app.isPackaged;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;

let win: BrowserWindow | null;
let wcf: WCF | null = null;
let electronUpdate: ElectronUpdate | null = null;

const appLock = app.requestSingleInstanceLock(); // 单实例锁
if (!appLock) {
  app.quit(); // 如果获取锁失败，则退出应用
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized() || !win.isVisible) {
        win.show();
      }
      win.focus();
    }
  });
}

function startMemoryMonitor(win: BrowserWindow) {
  const memoryUsage = process.memoryUsage();
  const totalMB = (memoryUsage.rss / 1024 / 1024).toFixed(1);
  win?.webContents.send("memory-usage", totalMB);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });
  wcf = new WCF(win);
  wcf?.crateTray(); // 创建托盘
  electronUpdate = new ElectronUpdate(win);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    electronUpdate?.checkElectronUpdate(); // 检测更新

    // 定时上报内存信息
    startMemoryMonitor(win as BrowserWindow);
    wcf?.registerSchedule("*/2 * * * *", () => {
      startMemoryMonitor(win as BrowserWindow);
    });
    wcf?.registerSchedule("0 */12 * * *", async () => {
      const res = await wcf?.checkUpdate(); // 检测更新
      await electronUpdate?.checkElectronUpdate(); // 检测更新
      win?.webContents.send("wcf:checkUpdateNotiy", res); // 检测更新
    });
    wcf?.reportConfig(); // 上报配置文件
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win?.webContents.toggleDevTools();
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  // 注册相关事件
  ipcMain.handle("wcf:checkUpdate", wcf.checkUpdate); //检测更新
  ipcMain.handle("wcf:checkWCF", wcf.checkWCF); //检测WCF是否安装
  ipcMain.handle("wcf:downloadWCF", wcf.downloadWCF); //下载WCF
  ipcMain.handle("wcf:chekWcfIsRun", wcf.checkWCFIsRun); //检测WCF是否运行
  ipcMain.handle("wcf:startWcfHttpServer", wcf.startWcfServer); //启动HTTP服务
  ipcMain.handle("wcf:closeWcfHttpServer", wcf.closeWcfServer); //关闭HTTP服务
  ipcMain.handle("wcf:updateConfig", wcf.modifyWCFConfig); //修改配置文件
  ipcMain.handle("wcf:config", wcf.getWCFConfig); //获取配置文件
  ipcMain.handle("wcf:restartWcf", wcf.restartWCF); //重启WCF
  ipcMain.handle("wcf:closeWcf", wcf.closeWCF); //关闭WCF核心
  ipcMain.handle("wcf:startWCF", wcf.startWCF); //启动WCF核心
  ipcMain.handle("wcf:resetWcf", wcf.resetWCF); //重置WCF环境
  ipcMain.handle("wcf:readWcfLog", wcf.readWcfLog); //读取WCF日志
  ipcMain.handle("wcf:injectVersionWcf", (_, data: { version: string; download_wechat: boolean }) => wcf?.injectVersionDll(data.version, data.download_wechat || false)); //注入版本号
  ipcMain.handle("open:url", (_, url) => {
    shell.openExternal(url); // 打开链接
  });
  ipcMain.handle("app:update", electronUpdate.checkElectronUpdate);
  //注册快捷键
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    win?.webContents.toggleDevTools();
  });
  win.on("close", (event) => {
    if (isDev) return; // 开发模式下不阻止关闭
    // 阻止关闭，隐藏窗口
    event.preventDefault();
    win?.hide();
  });
}
const menu = Menu.buildFromTemplate([]);
Menu.setApplicationMenu(menu);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", (event: any) => {
  // On macOS, it is common to keep the application open even when all windows are closed.
  if (process.platform == "darwin") {
    app.quit();
  } else {
    event.preventDefault();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  wcf?.tray?.destroy();
});

process.on("uncaughtException", (error: any) => {
  win?.webContents.send("unhandledRejection", error.message); // 发送到渲染进程
});
// 捕获未处理的 Promise 拒绝
process.on("unhandledRejection", (reason: any) => {
  win?.webContents.send("unhandledRejection", `Pormise:${reason.message}`); // 发送到渲染进程
  // 可以在此处添加自定义处理逻辑
});

app.whenReady().then(createWindow);
