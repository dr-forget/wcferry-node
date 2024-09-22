import { wcf } from './proto/wcf';
import { type ToPlainType } from './utils';
import { FileSavableInterface } from './file-ref';
export type UserInfo = ToPlainType<wcf.UserInfo>;
export type Contact = ToPlainType<wcf.RpcContact>;
export type DbTable = ToPlainType<wcf.DbTable>;
export interface wcferryOptions {
    host: string;
    cacheDir?: string;
    recvPyq?: boolean;
}
export declare class wcferry {
    private cmdsocket;
    private msgsocket;
    private storedCallback;
    private option;
    readonly NotFriend: {
        fmessage: string;
        medianote: string;
        floatbottle: string;
        filehelper: string;
        newsapp: string;
    };
    constructor(option: wcferryOptions);
    private trapOnExit;
    stop(): void;
    start(): void;
    private createMsgSocket;
    listening(callback: (message: any) => void): void;
    stopListening(): number | undefined;
    private sendCmdMessage;
    setRecvPyq(flag: boolean): "未开启监听" | undefined;
    isLogin(): boolean;
    getSelfWxid(): string;
    /** 获取登录账号个人信息 */
    getUserInfo(): UserInfo;
    /** 获取完整通讯录 */
    getContacts(): Contact[];
    /** 通过 wxid 查询微信号昵称等信息 */
    getContact(wxid: string): Contact | undefined;
    /** 获取所有数据库 */
    getDbNames(): string[];
    /** 获取数据库中所有表 */
    getDbTables(db: string): DbTable[];
    /**
     * 执行 SQL 查询，如果数据量大注意分页
     * @param db
     * @param sql
     */
    dbSqlQuery(db: string, sql: string): Record<string, string | number | Buffer | undefined>[];
    /**
     * 获取消息类型
     * {"47": "石头剪刀布 | 表情图片", "62": "小视频", "43": "视频", "1": "文字", "10002": "撤回消息", "40": "POSSIBLEFRIEND_MSG", "10000": "红包、系统消息", "37": "好友确认", "48": "位置", "42": "名片", "49": "共享实时位置、文件、转账、链接", "3": "图片", "34": "语音", "9999": "SYSNOTICE", "52": "VOIPNOTIFY", "53": "VOIPINVITE", "51": "微信初始化", "50": "VOIPMSG"}
     */
    getMsgTypes(): {
        code?: number;
        label?: string;
    }[];
    /**
     * 刷新朋友圈
     * @param id 开始 id，0 为最新页 (string based uint64)
     * @returns 1 为成功，其他失败
     */
    refreshPyq(id: string): number;
    /** 获取群聊列表 */
    getChatRooms(): Contact[];
    /**
     * 获取好友列表
     * @returns
     */
    getFriends(): Required<{
        wxid?: string;
        code?: string;
        remark?: string;
        name?: string;
        country?: string;
        province?: string;
        city?: string;
        gender?: number;
    }>[];
    /**
     * 获取群成员
     * @param roomid 群的 id
     * @param times 重试次数
     * @returns 群成员列表: {wxid1: 昵称1, wxid2: 昵称2, ...}
     */
    getChatRoomMembers(roomid: string, times?: number): Promise<Record<string, string>>;
    /**
     * 获取群成员昵称
     * @param wxid
     * @param roomid
     * @returns 群名片
     */
    getAliasInChatRoom(wxid: string, roomid: string): string | undefined;
    /**
     * be careful to SQL injection
     * @param wxids wxids
     */
    getNickName(...wxids: string[]): Array<string | undefined>;
    /**
     * 邀请群成员
     * @param roomid
     * @param wxids
     * @returns int32 1 为成功，其他失败
     */
    inviteChatroomMembers(roomid: string, wxids: string[]): number;
    /**
     * 添加群成员
     * @param roomid
     * @param wxids
     * @returns int32 1 为成功，其他失败
     */
    addChatRoomMembers(roomid: string, wxids: string[]): number;
    /**
     * 删除群成员
     * @param roomid
     * @param wxids
     * @returns int32 1 为成功，其他失败
     */
    delChatRoomMembers(roomid: string, wxids: string[]): number;
    /**
     * 撤回消息
     * @param msgid (uint64 in string format): 消息 id
     * @returns int: 1 为成功，其他失败
     */
    revokeMsg(msgid: string): number;
    /**
     * 转发消息。可以转发文本、图片、表情、甚至各种 XML；语音也行，不过效果嘛，自己验证吧。
     * @param msgid (uint64 in string format): 消息 id
     * @param receiver string 消息接收人，wxid 或者 roomid
     * @returns int: 1 为成功，其他失败
     */
    forwardMsg(msgid: string, receiver: string): number;
    /**
     * 发送文本消息
     * @param msg 要发送的消息，换行使用 `\n` （单杠）；如果 @ 人的话，需要带上跟 `aters` 里数量相同的 @
     * @param receiver 消息接收人，wxid 或者 roomid
     * @param aters 要 @ 的 wxid，多个用逗号分隔；`@所有人` 只需要 `notify@all`
     * @returns 0 为成功，其他失败
     */
    sendTxt(msg: string, receiver: string, aters?: string): number;
    /**
     * @param image location of the resource, can be:
     * - a local path (`C:\\Users` or `/home/user`),
     * - a link starts with `http(s)://`,
     * - a buffer (base64 string can be convert to buffer by `Buffer.from(<str>, 'base64')`)
     * - an object { type: 'Buffer', data: number[] } which can convert to Buffer
     * - a FileSavableInterface instance
     * @param receiver 消息接收人，wxid 或者 roomid
     * @returns 0 为成功，其他失败
     */
    sendImage(image: string | Buffer | {
        type: 'Buffer';
        data: number[];
    } | FileSavableInterface, receiver: string): Promise<number>;
    /**
     * @param file location of the resource, can be:
     * - a local path (`C:\\Users` or `/home/user`),
     * - a link starts with `http(s)://`,
     * - a buffer (base64 string can be convert to buffer by `Buffer.from(<str>, 'base64')`)
     * - an object { type: 'Buffer', data: number[] } which can convert to Buffer
     * - a FileSavableInterface instance
     * @param receiver 消息接收人，wxid 或者 roomid
     * @returns 0 为成功，其他失败
     */
    sendFile(file: string | Buffer | {
        type: 'Buffer';
        data: number[];
    } | FileSavableInterface, receiver: string): Promise<number>;
    /**
     * @deprecated Not supported
     * 发送XML
     * @param xml.content xml 内容
     * @param xml.path 封面图片路径
     * @param receiver xml 类型，如：0x21 为小程序
     * @returns 0 为成功，其他失败
     */
    sendXML(xml: {
        content: string;
        path?: string;
        type: number;
    }, receiver: string): number;
    /**
     * @deprecated Not supported
     * 发送表情
     * @param path 本地表情路径，如：`C:/Projs/WeChatRobot/emo.gif`
     * @param receiver 消息接收人，wxid 或者 roomid
     * @returns 0 为成功，其他失败
     */
    sendEmotion(path: string, receiver: string): number;
    /**
     * 发送富文本消息
     *  卡片样式：
     *       |-------------------------------------|
     *       |title, 最长两行
     *       |(长标题, 标题短的话这行没有)
     *       |digest, 最多三行，会占位    |--------|
     *       |digest, 最多三行，会占位    |thumburl|
     *       |digest, 最多三行，会占位    |--------|
     *       |(account logo) name
     *       |-------------------------------------|
     * @param desc.name 左下显示的名字
     * @param desc.account 填公众号 id 可以显示对应的头像（gh_ 开头的）
     * @param desc.title 标题，最多两行
     * @param desc.digest 摘要，三行
     * @param desc.url 点击后跳转的链接
     * @param desc.thumburl 缩略图的链接
     * @param receiver 接收人, wxid 或者 roomid
     * @returns 0 为成功，其他失败
     */
    sendRichText(desc: Omit<ReturnType<wcf.RichText['toObject']>, 'receiver'>, receiver: string): number;
    /**
     * 获取语音消息并转成 MP3
     * @param msgid 语音消息 id
     * @param dir MP3 保存目录（目录不存在会出错）
     * @param times 超时时间（秒）
     * @returns 成功返回存储路径；空字符串为失败，原因见日志。
     */
    getAudioMsg(msgid: string, dir: string, times?: number): Promise<string>;
    /**
     * 获取 OCR 结果。鸡肋，需要图片能自动下载；通过下载接口下载的图片无法识别。
     * @param extra 待识别的图片路径，消息里的 extra
     * @param times OCR 结果
     * @returns
     */
    getOCRResult(extra: string, times?: number): Promise<string>;
    /**
     *  下载附件（图片、视频、文件）。这方法别直接调用，下载图片使用 `download_image`
     * @param msgid 消息中 id
     * @param thumb 消息中的 thumb
     * @param extra 消息中的 extra
     * @returns 0 为成功, 其他失败。
     */
    downloadAttach(msgid: string, thumb?: string, extra?: string): number;
    private readonly UserDir;
    private getMsgAttachments;
    /**
     *  解密图片。这方法别直接调用，下载图片使用 `download_image`。
     * @param src 加密的图片路径
     * @param dir 保存图片的目录
     * @returns
     */
    decryptImage(src: string, dir: string): string;
    /**
     * 下载图片
     * @param msgid 消息中 id
     * @param dir 存放图片的目录（目录不存在会出错）
     * @param extra 消息中的 extra, 如果为空，自动通过msgid获取
     * @param times 超时时间（秒）
     * @returns 成功返回存储路径；空字符串为失败，原因见日志。
     */
    downloadImage(msgid: string, dir: string, extra?: string, thumb?: string, times?: number): Promise<string>;
    /**
     * 通过好友申请
     * @param v3 加密用户名 (好友申请消息里 v3 开头的字符串)
     * @param v4 Ticket (好友申请消息里 v4 开头的字符串)
     * @param scene 申请方式 (好友申请消息里的 scene); 为了兼容旧接口，默认为扫码添加 (30)
     * @returns 1 为成功，其他失败
     */
    acceptNewFriend(v3: string, v4: string, scene?: number): number;
    /**
     * 接收转账
     * @param wxid 转账消息里的发送人 wxid
     * @param transferid 转账消息里的 transferid
     * @param transactionid 转账消息里的 transactionid
     * @returns 1 为成功，其他失败
     */
    receiveTransfer(wxid: string, transferid: string, transactionid: string): number;
}
