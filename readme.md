# WeChat Core SDK for Node.js ![npm version](https://img.shields.io/npm/v/@zippybee/wechatcore.svg)

# CLI ![npm version](https://img.shields.io/npm/v/@zippybee/wcf-cli.svg)

#### 注意：

2.0.x 版本与 2.1.x 版本有较大改动 底层 socket nng 部分重写 两版本并不兼容 请注意函数方法名：建议所有开发者 升级到最新版本

## 使用步骤

```bash
npm i @zippybee/wechatcore
```

### 示例代码

```javascript
const { Wcferry } = require('@zippybee/wechatcore');

const client = new Wcferry();
client.start();

const isLogin = client.isLogin();
const userinfo = client.getUserInfo();

console.log(isLogin, userinfo);

const off = client.listening((msg) => {
  console.log('收到消息:', msg.content);
});
```

#### Wcferry Option

| 参数名称                                                                      | 是否必填 | 默认值                                       | 类型     |
| ----------------------------------------------------------------------------- | -------- | -------------------------------------------- | -------- |
| host(service 地址 默认启动 wcf 127.0.0.1 可填远程 service 地址)               | `false`  | `''`                                         | `string` |
| port 端口                                                                     | `false`  | `10086`                                      | `number` |
| recvPyq (是否结束朋友圈消息)                                                  | `false`  | false                                        | `bool`   |
| service (启动模式为 service 模式，此模式仅做注入 dll 使用 其他业务需自行实现) | `false`  | false                                        | `bool`   |
| wcf_path (指定 wcf 工作目录 一般用于 docker 挂载目录使用)                     | `false`  | `path.join(__dirname, '../wcf-sdk/sdk.dll')` | `string` |

### 还提供 service 模式 （远程调用可用此模式 此模式 与 本地模式互斥）

注意 本模式下 只注入 dll 其他逻辑自行实现 可通过 tcp://0.0.0.0:10086

```javascript
const { Wcferry } = require("@zippybee/wechatcore");

const client = new Wcferry({ port: 10086，service:true }); //开启service模式

client.start()

// 启动成功 即可通过远程调用 wcf service

// 示例代码
const { Wcferry } = require("@zippybee/wechatcore");

const client = new Wcferry({ port: 10086，host:'上述service ip 即可' });

client.start();

const isLogin = client.isLogin();
const userinfo = client.getUserInfo();

console.log(isLogin, userinfo);

const off = client.on((msg) => {
  console.log("收到消息:", msg.content);
});

```

#### CLI 启动 service 模式

```
npm i @zippybee/wcf-cli -g

zippy-wcf start -p 10086   //启动wcf服务    -p 运行端口   -d wcf dll 所在目录 默认不用指定

zippy-wcf stop  //关闭wcf服务
```

### 项目工程

1. **构建 Protobuf 文件**：自动拉取最新的 `.proto` 文件并进行编译。

   ```bash
   npm run build-proto
   ```

   **注意（Windows 用户）**：编译需要特定的环境设置。如果遇到 `3221225781` 错误代码，请安装 Visual Studio 2022 及必要的工具：

   ```bash
   choco install visualstudio2022-workload-vctools --package-parameters "--includeRecommended"
   ```

   请确保提前安装了 Chocolatey (`choco`)。

2. **获取 WCF SDK**：自动获取最新的微信框架 (WCF) SDK。

   ```bash
   npm run get-wcf
   ```

3. **构建项目**：编译项目。

   ```bash
   npm run build
   ```

### 免责声明

本项目的代码仅供学习和研究用途。任何人不得将本项目或其代码用于违反法律或从事任何非法活动。

使用本项目中的代码或衍生代码所造成的任何后果，开发者不承担任何责任。请在遵守适用法律的前提下使用本项目。

## 致谢

本项目借鉴了 并复制相关代码 特别感谢 [stkevintan](https://github.com/stkevintan) 的付出

[node-wcferry]: https://github.com/wechatferry/wechatferry
