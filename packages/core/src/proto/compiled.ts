/* eslint-disable */
//@ts-nocheck
/* eslint-disable */
//@ts-nocheck
/* eslint-disable */
//@ts-nocheck
/* eslint-disable */
//@ts-nocheck
export const enum Functions {
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
  FUNC_INV_ROOM_MEMBERS = "FUNC_INV_ROOM_MEMBERS",
}

export const encodeFunctions: { [key: string]: number } = {
  FUNC_RESERVED: 0,
  FUNC_IS_LOGIN: 1,
  FUNC_GET_SELF_WXID: 16,
  FUNC_GET_MSG_TYPES: 17,
  FUNC_GET_CONTACTS: 18,
  FUNC_GET_DB_NAMES: 19,
  FUNC_GET_DB_TABLES: 20,
  FUNC_GET_USER_INFO: 21,
  FUNC_GET_AUDIO_MSG: 22,
  FUNC_SEND_TXT: 32,
  FUNC_SEND_IMG: 33,
  FUNC_SEND_FILE: 34,
  FUNC_SEND_XML: 35,
  FUNC_SEND_EMOTION: 36,
  FUNC_SEND_RICH_TXT: 37,
  FUNC_SEND_PAT_MSG: 38,
  FUNC_FORWARD_MSG: 39,
  FUNC_ENABLE_RECV_TXT: 48,
  FUNC_DISABLE_RECV_TXT: 64,
  FUNC_EXEC_DB_QUERY: 80,
  FUNC_ACCEPT_FRIEND: 81,
  FUNC_RECV_TRANSFER: 82,
  FUNC_REFRESH_PYQ: 83,
  FUNC_DOWNLOAD_ATTACH: 84,
  FUNC_GET_CONTACT_INFO: 85,
  FUNC_REVOKE_MSG: 86,
  FUNC_REFRESH_QRCODE: 87,
  FUNC_DECRYPT_IMAGE: 96,
  FUNC_EXEC_OCR: 97,
  FUNC_ADD_ROOM_MEMBERS: 112,
  FUNC_DEL_ROOM_MEMBERS: 113,
  FUNC_INV_ROOM_MEMBERS: 114,
};

export const decodeFunctions: { [key: number]: Functions } = {
  0: Functions.FUNC_RESERVED,
  1: Functions.FUNC_IS_LOGIN,
  16: Functions.FUNC_GET_SELF_WXID,
  17: Functions.FUNC_GET_MSG_TYPES,
  18: Functions.FUNC_GET_CONTACTS,
  19: Functions.FUNC_GET_DB_NAMES,
  20: Functions.FUNC_GET_DB_TABLES,
  21: Functions.FUNC_GET_USER_INFO,
  22: Functions.FUNC_GET_AUDIO_MSG,
  32: Functions.FUNC_SEND_TXT,
  33: Functions.FUNC_SEND_IMG,
  34: Functions.FUNC_SEND_FILE,
  35: Functions.FUNC_SEND_XML,
  36: Functions.FUNC_SEND_EMOTION,
  37: Functions.FUNC_SEND_RICH_TXT,
  38: Functions.FUNC_SEND_PAT_MSG,
  39: Functions.FUNC_FORWARD_MSG,
  48: Functions.FUNC_ENABLE_RECV_TXT,
  64: Functions.FUNC_DISABLE_RECV_TXT,
  80: Functions.FUNC_EXEC_DB_QUERY,
  81: Functions.FUNC_ACCEPT_FRIEND,
  82: Functions.FUNC_RECV_TRANSFER,
  83: Functions.FUNC_REFRESH_PYQ,
  84: Functions.FUNC_DOWNLOAD_ATTACH,
  85: Functions.FUNC_GET_CONTACT_INFO,
  86: Functions.FUNC_REVOKE_MSG,
  87: Functions.FUNC_REFRESH_QRCODE,
  96: Functions.FUNC_DECRYPT_IMAGE,
  97: Functions.FUNC_EXEC_OCR,
  112: Functions.FUNC_ADD_ROOM_MEMBERS,
  113: Functions.FUNC_DEL_ROOM_MEMBERS,
  114: Functions.FUNC_INV_ROOM_MEMBERS,
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

export function encodeRequest(message: Request): Uint8Array {
  let bb = popByteBuffer();
  _encodeRequest(message, bb);
  return toUint8Array(bb);
}

function _encodeRequest(message: Request, bb: ByteBuffer): void {
  // optional Functions func = 1;
  let $func = message.func;
  if ($func !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, encodeFunctions[$func]);
  }

  // optional Empty empty = 2;
  let $empty = message.empty;
  if ($empty !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeEmpty($empty, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string str = 3;
  let $str = message.str;
  if ($str !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $str);
  }

  // optional TextMsg txt = 4;
  let $txt = message.txt;
  if ($txt !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTextMsg($txt, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PathMsg file = 5;
  let $file = message.file;
  if ($file !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodePathMsg($file, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DbQuery query = 6;
  let $query = message.query;
  if ($query !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeDbQuery($query, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Verification v = 7;
  let $v = message.v;
  if ($v !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeVerification($v, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MemberMgmt m = 8;
  let $m = message.m;
  if ($m !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeMemberMgmt($m, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional XmlMsg xml = 9;
  let $xml = message.xml;
  if ($xml !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeXmlMsg($xml, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DecPath dec = 10;
  let $dec = message.dec;
  if ($dec !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeDecPath($dec, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Transfer tf = 11;
  let $tf = message.tf;
  if ($tf !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeTransfer($tf, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 ui64 = 12;
  let $ui64 = message.ui64;
  if ($ui64 !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $ui64);
  }

  // optional bool flag = 13;
  let $flag = message.flag;
  if ($flag !== undefined) {
    writeVarint32(bb, 104);
    writeByte(bb, $flag ? 1 : 0);
  }

  // optional AttachMsg att = 14;
  let $att = message.att;
  if ($att !== undefined) {
    writeVarint32(bb, 114);
    let nested = popByteBuffer();
    _encodeAttachMsg($att, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AudioMsg am = 15;
  let $am = message.am;
  if ($am !== undefined) {
    writeVarint32(bb, 122);
    let nested = popByteBuffer();
    _encodeAudioMsg($am, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RichText rt = 16;
  let $rt = message.rt;
  if ($rt !== undefined) {
    writeVarint32(bb, 130);
    let nested = popByteBuffer();
    _encodeRichText($rt, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PatMsg pm = 17;
  let $pm = message.pm;
  if ($pm !== undefined) {
    writeVarint32(bb, 138);
    let nested = popByteBuffer();
    _encodePatMsg($pm, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ForwardMsg fm = 18;
  let $fm = message.fm;
  if ($fm !== undefined) {
    writeVarint32(bb, 146);
    let nested = popByteBuffer();
    _encodeForwardMsg($fm, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeRequest(binary: Uint8Array): Request {
  return _decodeRequest(wrapByteBuffer(binary));
}

function _decodeRequest(bb: ByteBuffer): Request {
  let message: Request = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Functions func = 1;
      case 1: {
        message.func = decodeFunctions[readVarint32(bb)];
        break;
      }

      // optional Empty empty = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.empty = _decodeEmpty(bb);
        bb.limit = limit;
        break;
      }

      // optional string str = 3;
      case 3: {
        message.str = readString(bb, readVarint32(bb));
        break;
      }

      // optional TextMsg txt = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.txt = _decodeTextMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional PathMsg file = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.file = _decodePathMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional DbQuery query = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.query = _decodeDbQuery(bb);
        bb.limit = limit;
        break;
      }

      // optional Verification v = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.v = _decodeVerification(bb);
        bb.limit = limit;
        break;
      }

      // optional MemberMgmt m = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.m = _decodeMemberMgmt(bb);
        bb.limit = limit;
        break;
      }

      // optional XmlMsg xml = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.xml = _decodeXmlMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional DecPath dec = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.dec = _decodeDecPath(bb);
        bb.limit = limit;
        break;
      }

      // optional Transfer tf = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.tf = _decodeTransfer(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 ui64 = 12;
      case 12: {
        message.ui64 = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bool flag = 13;
      case 13: {
        message.flag = !!readByte(bb);
        break;
      }

      // optional AttachMsg att = 14;
      case 14: {
        let limit = pushTemporaryLength(bb);
        message.att = _decodeAttachMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional AudioMsg am = 15;
      case 15: {
        let limit = pushTemporaryLength(bb);
        message.am = _decodeAudioMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional RichText rt = 16;
      case 16: {
        let limit = pushTemporaryLength(bb);
        message.rt = _decodeRichText(bb);
        bb.limit = limit;
        break;
      }

      // optional PatMsg pm = 17;
      case 17: {
        let limit = pushTemporaryLength(bb);
        message.pm = _decodePatMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional ForwardMsg fm = 18;
      case 18: {
        let limit = pushTemporaryLength(bb);
        message.fm = _decodeForwardMsg(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

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

export function encodeResponse(message: Response): Uint8Array {
  let bb = popByteBuffer();
  _encodeResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeResponse(message: Response, bb: ByteBuffer): void {
  // optional Functions func = 1;
  let $func = message.func;
  if ($func !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, encodeFunctions[$func]);
  }

  // optional int32 status = 2;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($status));
  }

  // optional string str = 3;
  let $str = message.str;
  if ($str !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $str);
  }

  // optional WxMsg wxmsg = 4;
  let $wxmsg = message.wxmsg;
  if ($wxmsg !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeWxMsg($wxmsg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MsgTypes types = 5;
  let $types = message.types;
  if ($types !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeMsgTypes($types, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RpcContacts contacts = 6;
  let $contacts = message.contacts;
  if ($contacts !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeRpcContacts($contacts, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DbNames dbs = 7;
  let $dbs = message.dbs;
  if ($dbs !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeDbNames($dbs, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DbTables tables = 8;
  let $tables = message.tables;
  if ($tables !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeDbTables($tables, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DbRows rows = 9;
  let $rows = message.rows;
  if ($rows !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeDbRows($rows, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UserInfo ui = 10;
  let $ui = message.ui;
  if ($ui !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeUserInfo($ui, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OcrMsg ocr = 11;
  let $ocr = message.ocr;
  if ($ocr !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeOcrMsg($ocr, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeResponse(binary: Uint8Array): Response {
  return _decodeResponse(wrapByteBuffer(binary));
}

function _decodeResponse(bb: ByteBuffer): Response {
  let message: Response = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Functions func = 1;
      case 1: {
        message.func = decodeFunctions[readVarint32(bb)];
        break;
      }

      // optional int32 status = 2;
      case 2: {
        message.status = readVarint32(bb);
        break;
      }

      // optional string str = 3;
      case 3: {
        message.str = readString(bb, readVarint32(bb));
        break;
      }

      // optional WxMsg wxmsg = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.wxmsg = _decodeWxMsg(bb);
        bb.limit = limit;
        break;
      }

      // optional MsgTypes types = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.types = _decodeMsgTypes(bb);
        bb.limit = limit;
        break;
      }

      // optional RpcContacts contacts = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.contacts = _decodeRpcContacts(bb);
        bb.limit = limit;
        break;
      }

      // optional DbNames dbs = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.dbs = _decodeDbNames(bb);
        bb.limit = limit;
        break;
      }

      // optional DbTables tables = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.tables = _decodeDbTables(bb);
        bb.limit = limit;
        break;
      }

      // optional DbRows rows = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.rows = _decodeDbRows(bb);
        bb.limit = limit;
        break;
      }

      // optional UserInfo ui = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.ui = _decodeUserInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional OcrMsg ocr = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.ocr = _decodeOcrMsg(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Empty {
}

export function encodeEmpty(message: Empty): Uint8Array {
  let bb = popByteBuffer();
  _encodeEmpty(message, bb);
  return toUint8Array(bb);
}

function _encodeEmpty(message: Empty, bb: ByteBuffer): void {
}

export function decodeEmpty(binary: Uint8Array): Empty {
  return _decodeEmpty(wrapByteBuffer(binary));
}

function _decodeEmpty(bb: ByteBuffer): Empty {
  let message: Empty = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

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

export function encodeWxMsg(message: WxMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeWxMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeWxMsg(message: WxMsg, bb: ByteBuffer): void {
  // optional bool is_self = 1;
  let $is_self = message.is_self;
  if ($is_self !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $is_self ? 1 : 0);
  }

  // optional bool is_group = 2;
  let $is_group = message.is_group;
  if ($is_group !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $is_group ? 1 : 0);
  }

  // optional uint64 id = 3;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $id);
  }

  // optional uint32 type = 4;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $type);
  }

  // optional uint32 ts = 5;
  let $ts = message.ts;
  if ($ts !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $ts);
  }

  // optional string roomid = 6;
  let $roomid = message.roomid;
  if ($roomid !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $roomid);
  }

  // optional string content = 7;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $content);
  }

  // optional string sender = 8;
  let $sender = message.sender;
  if ($sender !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $sender);
  }

  // optional string sign = 9;
  let $sign = message.sign;
  if ($sign !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $sign);
  }

  // optional string thumb = 10;
  let $thumb = message.thumb;
  if ($thumb !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $thumb);
  }

  // optional string extra = 11;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $extra);
  }

  // optional string xml = 12;
  let $xml = message.xml;
  if ($xml !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $xml);
  }
}

export function decodeWxMsg(binary: Uint8Array): WxMsg {
  return _decodeWxMsg(wrapByteBuffer(binary));
}

function _decodeWxMsg(bb: ByteBuffer): WxMsg {
  let message: WxMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool is_self = 1;
      case 1: {
        message.is_self = !!readByte(bb);
        break;
      }

      // optional bool is_group = 2;
      case 2: {
        message.is_group = !!readByte(bb);
        break;
      }

      // optional uint64 id = 3;
      case 3: {
        message.id = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 type = 4;
      case 4: {
        message.type = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 ts = 5;
      case 5: {
        message.ts = readVarint32(bb) >>> 0;
        break;
      }

      // optional string roomid = 6;
      case 6: {
        message.roomid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string content = 7;
      case 7: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sender = 8;
      case 8: {
        message.sender = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sign = 9;
      case 9: {
        message.sign = readString(bb, readVarint32(bb));
        break;
      }

      // optional string thumb = 10;
      case 10: {
        message.thumb = readString(bb, readVarint32(bb));
        break;
      }

      // optional string extra = 11;
      case 11: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      // optional string xml = 12;
      case 12: {
        message.xml = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface TextMsg {
  msg?: string;
  receiver?: string;
  aters?: string;
}

export function encodeTextMsg(message: TextMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeTextMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeTextMsg(message: TextMsg, bb: ByteBuffer): void {
  // optional string msg = 1;
  let $msg = message.msg;
  if ($msg !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $msg);
  }

  // optional string receiver = 2;
  let $receiver = message.receiver;
  if ($receiver !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $receiver);
  }

  // optional string aters = 3;
  let $aters = message.aters;
  if ($aters !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $aters);
  }
}

export function decodeTextMsg(binary: Uint8Array): TextMsg {
  return _decodeTextMsg(wrapByteBuffer(binary));
}

function _decodeTextMsg(bb: ByteBuffer): TextMsg {
  let message: TextMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string msg = 1;
      case 1: {
        message.msg = readString(bb, readVarint32(bb));
        break;
      }

      // optional string receiver = 2;
      case 2: {
        message.receiver = readString(bb, readVarint32(bb));
        break;
      }

      // optional string aters = 3;
      case 3: {
        message.aters = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PathMsg {
  path?: string;
  receiver?: string;
}

export function encodePathMsg(message: PathMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodePathMsg(message, bb);
  return toUint8Array(bb);
}

function _encodePathMsg(message: PathMsg, bb: ByteBuffer): void {
  // optional string path = 1;
  let $path = message.path;
  if ($path !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $path);
  }

  // optional string receiver = 2;
  let $receiver = message.receiver;
  if ($receiver !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $receiver);
  }
}

export function decodePathMsg(binary: Uint8Array): PathMsg {
  return _decodePathMsg(wrapByteBuffer(binary));
}

function _decodePathMsg(bb: ByteBuffer): PathMsg {
  let message: PathMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string path = 1;
      case 1: {
        message.path = readString(bb, readVarint32(bb));
        break;
      }

      // optional string receiver = 2;
      case 2: {
        message.receiver = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface XmlMsg {
  receiver?: string;
  content?: string;
  path?: string;
  type?: number;
}

export function encodeXmlMsg(message: XmlMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeXmlMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeXmlMsg(message: XmlMsg, bb: ByteBuffer): void {
  // optional string receiver = 1;
  let $receiver = message.receiver;
  if ($receiver !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $receiver);
  }

  // optional string content = 2;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $content);
  }

  // optional string path = 3;
  let $path = message.path;
  if ($path !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $path);
  }

  // optional int32 type = 4;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($type));
  }
}

export function decodeXmlMsg(binary: Uint8Array): XmlMsg {
  return _decodeXmlMsg(wrapByteBuffer(binary));
}

function _decodeXmlMsg(bb: ByteBuffer): XmlMsg {
  let message: XmlMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string receiver = 1;
      case 1: {
        message.receiver = readString(bb, readVarint32(bb));
        break;
      }

      // optional string content = 2;
      case 2: {
        message.content = readString(bb, readVarint32(bb));
        break;
      }

      // optional string path = 3;
      case 3: {
        message.path = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 type = 4;
      case 4: {
        message.type = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MsgTypes {
  types?: { [key: number]: string };
}

export function encodeMsgTypes(message: MsgTypes): Uint8Array {
  let bb = popByteBuffer();
  _encodeMsgTypes(message, bb);
  return toUint8Array(bb);
}

function _encodeMsgTypes(message: MsgTypes, bb: ByteBuffer): void {
  // optional map<int32, string> types = 1;
  let map$types = message.types;
  if (map$types !== undefined) {
    for (let key in map$types) {
      let nested = popByteBuffer();
      let value = map$types[key];
      writeVarint32(nested, 8);
      writeVarint64(nested, intToLong(+key));
      writeVarint32(nested, 18);
      writeString(nested, value);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMsgTypes(binary: Uint8Array): MsgTypes {
  return _decodeMsgTypes(wrapByteBuffer(binary));
}

function _decodeMsgTypes(bb: ByteBuffer): MsgTypes {
  let message: MsgTypes = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<int32, string> types = 1;
      case 1: {
        let values = message.types || (message.types = {});
        let outerLimit = pushTemporaryLength(bb);
        let key: number | undefined;
        let value: string | undefined;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readVarint32(bb);
              break;
            }
            case 2: {
              value = readString(bb, readVarint32(bb));
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: types");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

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

export function encodeRpcContact(message: RpcContact): Uint8Array {
  let bb = popByteBuffer();
  _encodeRpcContact(message, bb);
  return toUint8Array(bb);
}

function _encodeRpcContact(message: RpcContact, bb: ByteBuffer): void {
  // optional string wxid = 1;
  let $wxid = message.wxid;
  if ($wxid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $wxid);
  }

  // optional string code = 2;
  let $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $code);
  }

  // optional string remark = 3;
  let $remark = message.remark;
  if ($remark !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $remark);
  }

  // optional string name = 4;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $name);
  }

  // optional string country = 5;
  let $country = message.country;
  if ($country !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $country);
  }

  // optional string province = 6;
  let $province = message.province;
  if ($province !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $province);
  }

  // optional string city = 7;
  let $city = message.city;
  if ($city !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $city);
  }

  // optional int32 gender = 8;
  let $gender = message.gender;
  if ($gender !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($gender));
  }
}

export function decodeRpcContact(binary: Uint8Array): RpcContact {
  return _decodeRpcContact(wrapByteBuffer(binary));
}

function _decodeRpcContact(bb: ByteBuffer): RpcContact {
  let message: RpcContact = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string wxid = 1;
      case 1: {
        message.wxid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string code = 2;
      case 2: {
        message.code = readString(bb, readVarint32(bb));
        break;
      }

      // optional string remark = 3;
      case 3: {
        message.remark = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 4;
      case 4: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string country = 5;
      case 5: {
        message.country = readString(bb, readVarint32(bb));
        break;
      }

      // optional string province = 6;
      case 6: {
        message.province = readString(bb, readVarint32(bb));
        break;
      }

      // optional string city = 7;
      case 7: {
        message.city = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 gender = 8;
      case 8: {
        message.gender = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RpcContacts {
  contacts?: RpcContact[];
}

export function encodeRpcContacts(message: RpcContacts): Uint8Array {
  let bb = popByteBuffer();
  _encodeRpcContacts(message, bb);
  return toUint8Array(bb);
}

function _encodeRpcContacts(message: RpcContacts, bb: ByteBuffer): void {
  // repeated RpcContact contacts = 1;
  let array$contacts = message.contacts;
  if (array$contacts !== undefined) {
    for (let value of array$contacts) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeRpcContact(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeRpcContacts(binary: Uint8Array): RpcContacts {
  return _decodeRpcContacts(wrapByteBuffer(binary));
}

function _decodeRpcContacts(bb: ByteBuffer): RpcContacts {
  let message: RpcContacts = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated RpcContact contacts = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.contacts || (message.contacts = []);
        values.push(_decodeRpcContact(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbNames {
  names?: string[];
}

export function encodeDbNames(message: DbNames): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbNames(message, bb);
  return toUint8Array(bb);
}

function _encodeDbNames(message: DbNames, bb: ByteBuffer): void {
  // repeated string names = 1;
  let array$names = message.names;
  if (array$names !== undefined) {
    for (let value of array$names) {
      writeVarint32(bb, 10);
      writeString(bb, value);
    }
  }
}

export function decodeDbNames(binary: Uint8Array): DbNames {
  return _decodeDbNames(wrapByteBuffer(binary));
}

function _decodeDbNames(bb: ByteBuffer): DbNames {
  let message: DbNames = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated string names = 1;
      case 1: {
        let values = message.names || (message.names = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbTable {
  name?: string;
  sql?: string;
}

export function encodeDbTable(message: DbTable): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbTable(message, bb);
  return toUint8Array(bb);
}

function _encodeDbTable(message: DbTable, bb: ByteBuffer): void {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional string sql = 2;
  let $sql = message.sql;
  if ($sql !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $sql);
  }
}

export function decodeDbTable(binary: Uint8Array): DbTable {
  return _decodeDbTable(wrapByteBuffer(binary));
}

function _decodeDbTable(bb: ByteBuffer): DbTable {
  let message: DbTable = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sql = 2;
      case 2: {
        message.sql = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbTables {
  tables?: DbTable[];
}

export function encodeDbTables(message: DbTables): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbTables(message, bb);
  return toUint8Array(bb);
}

function _encodeDbTables(message: DbTables, bb: ByteBuffer): void {
  // repeated DbTable tables = 1;
  let array$tables = message.tables;
  if (array$tables !== undefined) {
    for (let value of array$tables) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeDbTable(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeDbTables(binary: Uint8Array): DbTables {
  return _decodeDbTables(wrapByteBuffer(binary));
}

function _decodeDbTables(bb: ByteBuffer): DbTables {
  let message: DbTables = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated DbTable tables = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.tables || (message.tables = []);
        values.push(_decodeDbTable(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbQuery {
  db?: string;
  sql?: string;
}

export function encodeDbQuery(message: DbQuery): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbQuery(message, bb);
  return toUint8Array(bb);
}

function _encodeDbQuery(message: DbQuery, bb: ByteBuffer): void {
  // optional string db = 1;
  let $db = message.db;
  if ($db !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $db);
  }

  // optional string sql = 2;
  let $sql = message.sql;
  if ($sql !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $sql);
  }
}

export function decodeDbQuery(binary: Uint8Array): DbQuery {
  return _decodeDbQuery(wrapByteBuffer(binary));
}

function _decodeDbQuery(bb: ByteBuffer): DbQuery {
  let message: DbQuery = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string db = 1;
      case 1: {
        message.db = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sql = 2;
      case 2: {
        message.sql = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbField {
  type?: number;
  column?: string;
  content?: Uint8Array;
}

export function encodeDbField(message: DbField): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbField(message, bb);
  return toUint8Array(bb);
}

function _encodeDbField(message: DbField, bb: ByteBuffer): void {
  // optional int32 type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }

  // optional string column = 2;
  let $column = message.column;
  if ($column !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $column);
  }

  // optional bytes content = 3;
  let $content = message.content;
  if ($content !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $content.length), writeBytes(bb, $content);
  }
}

export function decodeDbField(binary: Uint8Array): DbField {
  return _decodeDbField(wrapByteBuffer(binary));
}

function _decodeDbField(bb: ByteBuffer): DbField {
  let message: DbField = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
        break;
      }

      // optional string column = 2;
      case 2: {
        message.column = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes content = 3;
      case 3: {
        message.content = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbRow {
  fields?: DbField[];
}

export function encodeDbRow(message: DbRow): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbRow(message, bb);
  return toUint8Array(bb);
}

function _encodeDbRow(message: DbRow, bb: ByteBuffer): void {
  // repeated DbField fields = 1;
  let array$fields = message.fields;
  if (array$fields !== undefined) {
    for (let value of array$fields) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeDbField(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeDbRow(binary: Uint8Array): DbRow {
  return _decodeDbRow(wrapByteBuffer(binary));
}

function _decodeDbRow(bb: ByteBuffer): DbRow {
  let message: DbRow = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated DbField fields = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.fields || (message.fields = []);
        values.push(_decodeDbField(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DbRows {
  rows?: DbRow[];
}

export function encodeDbRows(message: DbRows): Uint8Array {
  let bb = popByteBuffer();
  _encodeDbRows(message, bb);
  return toUint8Array(bb);
}

function _encodeDbRows(message: DbRows, bb: ByteBuffer): void {
  // repeated DbRow rows = 1;
  let array$rows = message.rows;
  if (array$rows !== undefined) {
    for (let value of array$rows) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeDbRow(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeDbRows(binary: Uint8Array): DbRows {
  return _decodeDbRows(wrapByteBuffer(binary));
}

function _decodeDbRows(bb: ByteBuffer): DbRows {
  let message: DbRows = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated DbRow rows = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.rows || (message.rows = []);
        values.push(_decodeDbRow(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Verification {
  v3?: string;
  v4?: string;
  scene?: number;
}

export function encodeVerification(message: Verification): Uint8Array {
  let bb = popByteBuffer();
  _encodeVerification(message, bb);
  return toUint8Array(bb);
}

function _encodeVerification(message: Verification, bb: ByteBuffer): void {
  // optional string v3 = 1;
  let $v3 = message.v3;
  if ($v3 !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $v3);
  }

  // optional string v4 = 2;
  let $v4 = message.v4;
  if ($v4 !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $v4);
  }

  // optional int32 scene = 3;
  let $scene = message.scene;
  if ($scene !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($scene));
  }
}

export function decodeVerification(binary: Uint8Array): Verification {
  return _decodeVerification(wrapByteBuffer(binary));
}

function _decodeVerification(bb: ByteBuffer): Verification {
  let message: Verification = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string v3 = 1;
      case 1: {
        message.v3 = readString(bb, readVarint32(bb));
        break;
      }

      // optional string v4 = 2;
      case 2: {
        message.v4 = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 scene = 3;
      case 3: {
        message.scene = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MemberMgmt {
  roomid?: string;
  wxids?: string;
}

export function encodeMemberMgmt(message: MemberMgmt): Uint8Array {
  let bb = popByteBuffer();
  _encodeMemberMgmt(message, bb);
  return toUint8Array(bb);
}

function _encodeMemberMgmt(message: MemberMgmt, bb: ByteBuffer): void {
  // optional string roomid = 1;
  let $roomid = message.roomid;
  if ($roomid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomid);
  }

  // optional string wxids = 2;
  let $wxids = message.wxids;
  if ($wxids !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $wxids);
  }
}

export function decodeMemberMgmt(binary: Uint8Array): MemberMgmt {
  return _decodeMemberMgmt(wrapByteBuffer(binary));
}

function _decodeMemberMgmt(bb: ByteBuffer): MemberMgmt {
  let message: MemberMgmt = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string roomid = 1;
      case 1: {
        message.roomid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string wxids = 2;
      case 2: {
        message.wxids = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface UserInfo {
  wxid?: string;
  name?: string;
  mobile?: string;
  home?: string;
}

export function encodeUserInfo(message: UserInfo): Uint8Array {
  let bb = popByteBuffer();
  _encodeUserInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeUserInfo(message: UserInfo, bb: ByteBuffer): void {
  // optional string wxid = 1;
  let $wxid = message.wxid;
  if ($wxid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $wxid);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string mobile = 3;
  let $mobile = message.mobile;
  if ($mobile !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $mobile);
  }

  // optional string home = 4;
  let $home = message.home;
  if ($home !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $home);
  }
}

export function decodeUserInfo(binary: Uint8Array): UserInfo {
  return _decodeUserInfo(wrapByteBuffer(binary));
}

function _decodeUserInfo(bb: ByteBuffer): UserInfo {
  let message: UserInfo = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string wxid = 1;
      case 1: {
        message.wxid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string mobile = 3;
      case 3: {
        message.mobile = readString(bb, readVarint32(bb));
        break;
      }

      // optional string home = 4;
      case 4: {
        message.home = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface DecPath {
  src?: string;
  dst?: string;
}

export function encodeDecPath(message: DecPath): Uint8Array {
  let bb = popByteBuffer();
  _encodeDecPath(message, bb);
  return toUint8Array(bb);
}

function _encodeDecPath(message: DecPath, bb: ByteBuffer): void {
  // optional string src = 1;
  let $src = message.src;
  if ($src !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $src);
  }

  // optional string dst = 2;
  let $dst = message.dst;
  if ($dst !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $dst);
  }
}

export function decodeDecPath(binary: Uint8Array): DecPath {
  return _decodeDecPath(wrapByteBuffer(binary));
}

function _decodeDecPath(bb: ByteBuffer): DecPath {
  let message: DecPath = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string src = 1;
      case 1: {
        message.src = readString(bb, readVarint32(bb));
        break;
      }

      // optional string dst = 2;
      case 2: {
        message.dst = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Transfer {
  wxid?: string;
  tfid?: string;
  taid?: string;
}

export function encodeTransfer(message: Transfer): Uint8Array {
  let bb = popByteBuffer();
  _encodeTransfer(message, bb);
  return toUint8Array(bb);
}

function _encodeTransfer(message: Transfer, bb: ByteBuffer): void {
  // optional string wxid = 1;
  let $wxid = message.wxid;
  if ($wxid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $wxid);
  }

  // optional string tfid = 2;
  let $tfid = message.tfid;
  if ($tfid !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $tfid);
  }

  // optional string taid = 3;
  let $taid = message.taid;
  if ($taid !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $taid);
  }
}

export function decodeTransfer(binary: Uint8Array): Transfer {
  return _decodeTransfer(wrapByteBuffer(binary));
}

function _decodeTransfer(bb: ByteBuffer): Transfer {
  let message: Transfer = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string wxid = 1;
      case 1: {
        message.wxid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string tfid = 2;
      case 2: {
        message.tfid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string taid = 3;
      case 3: {
        message.taid = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AttachMsg {
  id?: Long;
  thumb?: string;
  extra?: string;
}

export function encodeAttachMsg(message: AttachMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeAttachMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeAttachMsg(message: AttachMsg, bb: ByteBuffer): void {
  // optional uint64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string thumb = 2;
  let $thumb = message.thumb;
  if ($thumb !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $thumb);
  }

  // optional string extra = 3;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $extra);
  }
}

export function decodeAttachMsg(binary: Uint8Array): AttachMsg {
  return _decodeAttachMsg(wrapByteBuffer(binary));
}

function _decodeAttachMsg(bb: ByteBuffer): AttachMsg {
  let message: AttachMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string thumb = 2;
      case 2: {
        message.thumb = readString(bb, readVarint32(bb));
        break;
      }

      // optional string extra = 3;
      case 3: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface AudioMsg {
  id?: Long;
  dir?: string;
}

export function encodeAudioMsg(message: AudioMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeAudioMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeAudioMsg(message: AudioMsg, bb: ByteBuffer): void {
  // optional uint64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string dir = 2;
  let $dir = message.dir;
  if ($dir !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $dir);
  }
}

export function decodeAudioMsg(binary: Uint8Array): AudioMsg {
  return _decodeAudioMsg(wrapByteBuffer(binary));
}

function _decodeAudioMsg(bb: ByteBuffer): AudioMsg {
  let message: AudioMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string dir = 2;
      case 2: {
        message.dir = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface RichText {
  name?: string;
  account?: string;
  title?: string;
  digest?: string;
  url?: string;
  thumburl?: string;
  receiver?: string;
}

export function encodeRichText(message: RichText): Uint8Array {
  let bb = popByteBuffer();
  _encodeRichText(message, bb);
  return toUint8Array(bb);
}

function _encodeRichText(message: RichText, bb: ByteBuffer): void {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional string account = 2;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $account);
  }

  // optional string title = 3;
  let $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $title);
  }

  // optional string digest = 4;
  let $digest = message.digest;
  if ($digest !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $digest);
  }

  // optional string url = 5;
  let $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $url);
  }

  // optional string thumburl = 6;
  let $thumburl = message.thumburl;
  if ($thumburl !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $thumburl);
  }

  // optional string receiver = 7;
  let $receiver = message.receiver;
  if ($receiver !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $receiver);
  }
}

export function decodeRichText(binary: Uint8Array): RichText {
  return _decodeRichText(wrapByteBuffer(binary));
}

function _decodeRichText(bb: ByteBuffer): RichText {
  let message: RichText = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string account = 2;
      case 2: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string title = 3;
      case 3: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string digest = 4;
      case 4: {
        message.digest = readString(bb, readVarint32(bb));
        break;
      }

      // optional string url = 5;
      case 5: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string thumburl = 6;
      case 6: {
        message.thumburl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string receiver = 7;
      case 7: {
        message.receiver = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface PatMsg {
  roomid?: string;
  wxid?: string;
}

export function encodePatMsg(message: PatMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodePatMsg(message, bb);
  return toUint8Array(bb);
}

function _encodePatMsg(message: PatMsg, bb: ByteBuffer): void {
  // optional string roomid = 1;
  let $roomid = message.roomid;
  if ($roomid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $roomid);
  }

  // optional string wxid = 2;
  let $wxid = message.wxid;
  if ($wxid !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $wxid);
  }
}

export function decodePatMsg(binary: Uint8Array): PatMsg {
  return _decodePatMsg(wrapByteBuffer(binary));
}

function _decodePatMsg(bb: ByteBuffer): PatMsg {
  let message: PatMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string roomid = 1;
      case 1: {
        message.roomid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string wxid = 2;
      case 2: {
        message.wxid = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface OcrMsg {
  status?: number;
  result?: string;
}

export function encodeOcrMsg(message: OcrMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeOcrMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeOcrMsg(message: OcrMsg, bb: ByteBuffer): void {
  // optional int32 status = 1;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($status));
  }

  // optional string result = 2;
  let $result = message.result;
  if ($result !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $result);
  }
}

export function decodeOcrMsg(binary: Uint8Array): OcrMsg {
  return _decodeOcrMsg(wrapByteBuffer(binary));
}

function _decodeOcrMsg(bb: ByteBuffer): OcrMsg {
  let message: OcrMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 status = 1;
      case 1: {
        message.status = readVarint32(bb);
        break;
      }

      // optional string result = 2;
      case 2: {
        message.result = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ForwardMsg {
  id?: Long;
  receiver?: string;
}

export function encodeForwardMsg(message: ForwardMsg): Uint8Array {
  let bb = popByteBuffer();
  _encodeForwardMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeForwardMsg(message: ForwardMsg, bb: ByteBuffer): void {
  // optional uint64 id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $id);
  }

  // optional string receiver = 2;
  let $receiver = message.receiver;
  if ($receiver !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $receiver);
  }
}

export function decodeForwardMsg(binary: Uint8Array): ForwardMsg {
  return _decodeForwardMsg(wrapByteBuffer(binary));
}

function _decodeForwardMsg(bb: ByteBuffer): ForwardMsg {
  let message: ForwardMsg = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 id = 1;
      case 1: {
        message.id = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string receiver = 2;
      case 2: {
        message.receiver = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
