const { Wcferry } = require('@zippybee/wechatcore');

const client = new Wcferry();
client.start();

const isLogin = client.isLogin();
const userinfo = client.getUserInfo();

console.log(isLogin, userinfo);

const off = client.listening((msg) => {
  console.log('收到消息:', msg.content);
});