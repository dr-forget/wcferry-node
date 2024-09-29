此方法仅适合@zippybee/wechatcore@2.1.13以上版本 @zippybee/wechatcore-v1(3.9.2.23)此sdk仅支持host远程连接Ï

使用方法

```javascript
const { Wcferry } = require("@zippybee/wechatcore-v1");
const fs = require('fs')
const path = require('path')

  const wcferry = new Wcferry({
    host: "127.0.0.1",
    port: 10086,
  });

  const send_xml=()=>{
     const res = wcferry.send_xml_message(
       path.join(__dirname, "./applet.xml"), //xml字符串  从消息中采集一条即可
        "x323423423uio",//微信id
    );
    // res 1 发送成功  0  失败
  }

  wcferry.start();

  send_xml()

```

