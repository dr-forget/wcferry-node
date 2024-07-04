import { wcf } from "../proto/wcf";
import { ToPlainType } from "./utils";

export type RawMessage = ToPlainType<wcf.WxMsg>;

export class Message {
  constructor(private readonly message: wcf.WxMsg) {}

  get raw(): RawMessage {
    return this.message.toObject() as RawMessage;
  }

  get id() {
    return this.message.id;
  }

  get type() {
    return this.message.type;
  }

  get isSelf() {
    return this.message.is_self;
  }

  isAt(wxid: string) {
    if (!this.isGroup) {
      return false;
    }
    if (
      !new RegExp(`<atuserlist\\>.*(${wxid}).*</atuserlist>`).test(this.xml)
    ) {
      return false;
    }
    if (/@(?:所有人|all|All)/.test(this.message.content)) {
      return false;
    }

    return true;
  }

  get xml() {
    return this.message.xml;
  }

  get isGroup() {
    return this.message.is_group;
  }

  get roomId() {
    return this.message.roomid;
  }

  get content() {
    return this.message.content;
  }

  get sender() {
    return this.message.sender;
  }
}
