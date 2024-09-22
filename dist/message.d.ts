import { wcf } from './proto/wcf';
import { ToPlainType } from './utils';
export type RawMessage = ToPlainType<wcf.WxMsg>;
export declare class Message {
    private readonly message;
    constructor(message: wcf.WxMsg);
    get raw(): RawMessage;
    get id(): string;
    get type(): number;
    get isSelf(): boolean;
    isAt(wxid: string): boolean;
    get xml(): string;
    get isGroup(): boolean;
    get roomId(): string;
    get content(): string;
    get sender(): string;
}
