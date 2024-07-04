# WeChat Core SDK for Node.js

本项目基于 [node-wcferry](https://github.com/stkevintan/node-wcferry) 升级而来，旨在兼容最新的微信版本 3.9.10.27。

## 致谢

特别感谢 GitHub 用户 [stkevintan](https://github.com/stkevintan) 对原开源项目做出的贡献。

## 使用步骤

```bash
npm i @zippybee/wechatcore
```

### 示例代码

```javascript
const { Wcferry } = require("@zippybee/wechatcore");

const client = new Wcferry({ port: 10086 });
client.start();

const isLogin = client.isLogin();
const userinfo = client.getUserInfo();

console.log(isLogin, userinfo);

const off = client.on((msg) => {
  console.log("收到消息:", msg.content);
});
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
