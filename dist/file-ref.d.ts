import type { OutgoingHttpHeaders } from 'http';
export interface FileSavableInterface {
    save(dir?: string): Promise<{
        path: string;
        discard: () => Promise<void>;
    }>;
}
export declare class FileRef implements FileSavableInterface {
    private readonly location;
    private readonly options;
    /**
     * @param location location of the resource. can be
     * - a local path
     * - a link starts with `http(s)://`
     * - a buffer
     *
     * Note: base64 string can be convert to buffer by: `Buffer.from('content', 'base64')`
     * Note: if input is a Buffer, it would be nice to have a name with correct extension in the options,
     * or a common name `<uuid>.dat` will be used
     */
    constructor(location: string | Buffer, options?: {
        name?: string;
        headers?: OutgoingHttpHeaders;
    });
    private isUrl;
    /**
     * save the file into dir with name and extension inferred
     * @param dir the saving directory, defaults to `os.tmpdir()`
     * @param cpLocal when the source is local file, if we copy it to dir or directly return the source path
     * @returns
     */
    save(dir?: string, cpLocal?: boolean): Promise<{
        path: string;
        discard: () => Promise<void>;
    }>;
    wrapWithDiscard(p: string): {
        path: string;
        discard: () => Promise<void>;
    };
    private getName;
    private getSavingPath;
    private saveFromBase64;
    private saveFromUrl;
    private saveFromFile;
}
