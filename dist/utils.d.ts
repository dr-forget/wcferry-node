export declare function sleep(ms?: number): Promise<void>;
export declare function ensureDirSync(dir: string): void;
export declare function createTmpDir(name?: string): string;
export declare function uint8Array2str(arr: Uint8Array): string;
export type ToPlainType<T extends {
    toObject: () => unknown;
}> = Required<ReturnType<T["toObject"]>>;
