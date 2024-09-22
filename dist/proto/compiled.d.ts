export declare const enum Functions {
    FUNC_RESERVED = "FUNC_RESERVED",
    FUNC_IS_LOGIN = "FUNC_IS_LOGIN",
    FUNC_GET_SELF_WXID = "FUNC_GET_SELF_WXID",
    FUNC_GET_MSG_TYPES = "FUNC_GET_MSG_TYPES",
    FUNC_GET_CONTACTS = "FUNC_GET_CONTACTS",
    FUNC_GET_DB_NAMES = "FUNC_GET_DB_NAMES",
    FUNC_GET_DB_TABLES = "FUNC_GET_DB_TABLES",
    FUNC_GET_USER_INFO = "FUNC_GET_USER_INFO",
    FUNC_GET_AUDIO_MSG = "FUNC_GET_AUDIO_MSG",
    FUNC_SEND_TXT = "FUNC_SEND_TXT",
    FUNC_SEND_IMG = "FUNC_SEND_IMG",
    FUNC_SEND_FILE = "FUNC_SEND_FILE",
    FUNC_SEND_XML = "FUNC_SEND_XML",
    FUNC_SEND_EMOTION = "FUNC_SEND_EMOTION",
    FUNC_SEND_RICH_TXT = "FUNC_SEND_RICH_TXT",
    FUNC_SEND_PAT_MSG = "FUNC_SEND_PAT_MSG",
    FUNC_FORWARD_MSG = "FUNC_FORWARD_MSG",
    FUNC_ENABLE_RECV_TXT = "FUNC_ENABLE_RECV_TXT",
    FUNC_DISABLE_RECV_TXT = "FUNC_DISABLE_RECV_TXT",
    FUNC_EXEC_DB_QUERY = "FUNC_EXEC_DB_QUERY",
    FUNC_ACCEPT_FRIEND = "FUNC_ACCEPT_FRIEND",
    FUNC_RECV_TRANSFER = "FUNC_RECV_TRANSFER",
    FUNC_REFRESH_PYQ = "FUNC_REFRESH_PYQ",
    FUNC_DOWNLOAD_ATTACH = "FUNC_DOWNLOAD_ATTACH",
    FUNC_GET_CONTACT_INFO = "FUNC_GET_CONTACT_INFO",
    FUNC_REVOKE_MSG = "FUNC_REVOKE_MSG",
    FUNC_REFRESH_QRCODE = "FUNC_REFRESH_QRCODE",
    FUNC_DECRYPT_IMAGE = "FUNC_DECRYPT_IMAGE",
    FUNC_EXEC_OCR = "FUNC_EXEC_OCR",
    FUNC_ADD_ROOM_MEMBERS = "FUNC_ADD_ROOM_MEMBERS",
    FUNC_DEL_ROOM_MEMBERS = "FUNC_DEL_ROOM_MEMBERS",
    FUNC_INV_ROOM_MEMBERS = "FUNC_INV_ROOM_MEMBERS"
}
export declare const encodeFunctions: {
    [key: string]: number;
};
export declare const decodeFunctions: {
    [key: number]: Functions;
};
export interface Request {
    func?: Functions;
    empty?: Empty;
    str?: string;
    txt?: TextMsg;
    file?: PathMsg;
    query?: DbQuery;
    v?: Verification;
    m?: MemberMgmt;
    xml?: XmlMsg;
    dec?: DecPath;
    tf?: Transfer;
    ui64?: Long;
    flag?: boolean;
    att?: AttachMsg;
    am?: AudioMsg;
    rt?: RichText;
    pm?: PatMsg;
    fm?: ForwardMsg;
}
export declare function encodeRequest(message: Request): Uint8Array;
export declare function decodeRequest(binary: Uint8Array): Request;
export interface Response {
    func?: Functions;
    status?: number;
    str?: string;
    wxmsg?: WxMsg;
    types?: MsgTypes;
    contacts?: RpcContacts;
    dbs?: DbNames;
    tables?: DbTables;
    rows?: DbRows;
    ui?: UserInfo;
    ocr?: OcrMsg;
}
export declare function encodeResponse(message: Response): Uint8Array;
export declare function decodeResponse(binary: Uint8Array): Response;
export interface Empty {
}
export declare function encodeEmpty(message: Empty): Uint8Array;
export declare function decodeEmpty(binary: Uint8Array): Empty;
export interface WxMsg {
    is_self?: boolean;
    is_group?: boolean;
    id?: Long;
    type?: number;
    ts?: number;
    roomid?: string;
    content?: string;
    sender?: string;
    sign?: string;
    thumb?: string;
    extra?: string;
    xml?: string;
}
export declare function encodeWxMsg(message: WxMsg): Uint8Array;
export declare function decodeWxMsg(binary: Uint8Array): WxMsg;
export interface TextMsg {
    msg?: string;
    receiver?: string;
    aters?: string;
}
export declare function encodeTextMsg(message: TextMsg): Uint8Array;
export declare function decodeTextMsg(binary: Uint8Array): TextMsg;
export interface PathMsg {
    path?: string;
    receiver?: string;
}
export declare function encodePathMsg(message: PathMsg): Uint8Array;
export declare function decodePathMsg(binary: Uint8Array): PathMsg;
export interface XmlMsg {
    receiver?: string;
    content?: string;
    path?: string;
    type?: number;
}
export declare function encodeXmlMsg(message: XmlMsg): Uint8Array;
export declare function decodeXmlMsg(binary: Uint8Array): XmlMsg;
export interface MsgTypes {
    types?: {
        [key: number]: string;
    };
}
export declare function encodeMsgTypes(message: MsgTypes): Uint8Array;
export declare function decodeMsgTypes(binary: Uint8Array): MsgTypes;
export interface RpcContact {
    wxid?: string;
    code?: string;
    remark?: string;
    name?: string;
    country?: string;
    province?: string;
    city?: string;
    gender?: number;
}
export declare function encodeRpcContact(message: RpcContact): Uint8Array;
export declare function decodeRpcContact(binary: Uint8Array): RpcContact;
export interface RpcContacts {
    contacts?: RpcContact[];
}
export declare function encodeRpcContacts(message: RpcContacts): Uint8Array;
export declare function decodeRpcContacts(binary: Uint8Array): RpcContacts;
export interface DbNames {
    names?: string[];
}
export declare function encodeDbNames(message: DbNames): Uint8Array;
export declare function decodeDbNames(binary: Uint8Array): DbNames;
export interface DbTable {
    name?: string;
    sql?: string;
}
export declare function encodeDbTable(message: DbTable): Uint8Array;
export declare function decodeDbTable(binary: Uint8Array): DbTable;
export interface DbTables {
    tables?: DbTable[];
}
export declare function encodeDbTables(message: DbTables): Uint8Array;
export declare function decodeDbTables(binary: Uint8Array): DbTables;
export interface DbQuery {
    db?: string;
    sql?: string;
}
export declare function encodeDbQuery(message: DbQuery): Uint8Array;
export declare function decodeDbQuery(binary: Uint8Array): DbQuery;
export interface DbField {
    type?: number;
    column?: string;
    content?: Uint8Array;
}
export declare function encodeDbField(message: DbField): Uint8Array;
export declare function decodeDbField(binary: Uint8Array): DbField;
export interface DbRow {
    fields?: DbField[];
}
export declare function encodeDbRow(message: DbRow): Uint8Array;
export declare function decodeDbRow(binary: Uint8Array): DbRow;
export interface DbRows {
    rows?: DbRow[];
}
export declare function encodeDbRows(message: DbRows): Uint8Array;
export declare function decodeDbRows(binary: Uint8Array): DbRows;
export interface Verification {
    v3?: string;
    v4?: string;
    scene?: number;
}
export declare function encodeVerification(message: Verification): Uint8Array;
export declare function decodeVerification(binary: Uint8Array): Verification;
export interface MemberMgmt {
    roomid?: string;
    wxids?: string;
}
export declare function encodeMemberMgmt(message: MemberMgmt): Uint8Array;
export declare function decodeMemberMgmt(binary: Uint8Array): MemberMgmt;
export interface UserInfo {
    wxid?: string;
    name?: string;
    mobile?: string;
    home?: string;
}
export declare function encodeUserInfo(message: UserInfo): Uint8Array;
export declare function decodeUserInfo(binary: Uint8Array): UserInfo;
export interface DecPath {
    src?: string;
    dst?: string;
}
export declare function encodeDecPath(message: DecPath): Uint8Array;
export declare function decodeDecPath(binary: Uint8Array): DecPath;
export interface Transfer {
    wxid?: string;
    tfid?: string;
    taid?: string;
}
export declare function encodeTransfer(message: Transfer): Uint8Array;
export declare function decodeTransfer(binary: Uint8Array): Transfer;
export interface AttachMsg {
    id?: Long;
    thumb?: string;
    extra?: string;
}
export declare function encodeAttachMsg(message: AttachMsg): Uint8Array;
export declare function decodeAttachMsg(binary: Uint8Array): AttachMsg;
export interface AudioMsg {
    id?: Long;
    dir?: string;
}
export declare function encodeAudioMsg(message: AudioMsg): Uint8Array;
export declare function decodeAudioMsg(binary: Uint8Array): AudioMsg;
export interface RichText {
    name?: string;
    account?: string;
    title?: string;
    digest?: string;
    url?: string;
    thumburl?: string;
    receiver?: string;
}
export declare function encodeRichText(message: RichText): Uint8Array;
export declare function decodeRichText(binary: Uint8Array): RichText;
export interface PatMsg {
    roomid?: string;
    wxid?: string;
}
export declare function encodePatMsg(message: PatMsg): Uint8Array;
export declare function decodePatMsg(binary: Uint8Array): PatMsg;
export interface OcrMsg {
    status?: number;
    result?: string;
}
export declare function encodeOcrMsg(message: OcrMsg): Uint8Array;
export declare function decodeOcrMsg(binary: Uint8Array): OcrMsg;
export interface ForwardMsg {
    id?: Long;
    receiver?: string;
}
export declare function encodeForwardMsg(message: ForwardMsg): Uint8Array;
export declare function decodeForwardMsg(binary: Uint8Array): ForwardMsg;
export interface Long {
    low: number;
    high: number;
    unsigned: boolean;
}
