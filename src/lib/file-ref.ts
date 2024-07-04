import os from 'os';
import { randomUUID } from 'crypto';
import { cp, rm, writeFile } from 'fs/promises';
import mime from 'mime';
import path from 'path';
import { URL } from 'url';
import { ensureDirSync } from './utils';
import { createWriteStream, existsSync } from 'fs';
import assert from 'assert';
import type { OutgoingHttpHeaders } from 'http';

const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
};

export interface FileSavableInterface {
    save(dir?: string): Promise<{ path: string; discard: () => Promise<void> }>;
}

export class FileRef implements FileSavableInterface {
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
    constructor(
        private readonly location: string | Buffer,
        private readonly options: {
            name?: string;
            headers?: OutgoingHttpHeaders;
        } = {}
    ) {}

    private isUrl(loc: string) {
        return /^https?:\/\//.test(loc);
    }

    /**
     * save the file into dir with name and extension inferred
     * @param dir the saving directory, defaults to `os.tmpdir()`
     * @param cpLocal when the source is local file, if we copy it to dir or directly return the source path
     * @returns
     */
    async save(
        dir = os.tmpdir(),
        cpLocal = false
    ): Promise<{ path: string; discard: () => Promise<void> }> {
        ensureDirSync(dir);
        if (Buffer.isBuffer(this.location)) {
            return this.wrapWithDiscard(
                await this.saveFromBase64(dir, this.location)
            );
        }
        if (this.isUrl(this.location)) {
            const p = await this.saveFromUrl(dir, new URL(this.location));
            return this.wrapWithDiscard(p);
        }

        if (cpLocal) {
            return this.wrapWithDiscard(await this.saveFromFile(dir));
        }
        // if file existed in local, we direct use it
        return {
            path: this.location,
            discard: () => Promise.resolve(),
        };
    }

    wrapWithDiscard(p: string) {
        return {
            path: p,
            discard: () => rm(p, { force: true }),
        };
    }

    private getName(opt?: { mimeType?: string; inferredName?: string }) {
        const basename = this.options.name ?? opt?.inferredName ?? randomUUID();
        let ext = path.extname(basename);
        if (ext) {
            return basename;
        }
        ext = 'dat';
        if (opt?.mimeType) {
            ext = mime.getExtension(opt.mimeType) ?? ext;
        }
        return `${basename}.${ext}`;
    }

    private getSavingPath(dir: string, name: string): string {
        const extname = path.extname(name);
        const basename = path.basename(name, extname);
        for (let i = 0; ; i++) {
            const suffix = i === 0 ? '' : `-${i}`;
            const p = path.join(dir, `${basename}${suffix}${extname}`);
            if (!existsSync(p)) {
                return p;
            }
        }
    }

    private async saveFromBase64(dir: string, buffer: Buffer): Promise<string> {
        const binary = buffer.toString('binary');
        const name = this.getName();
        const fullpath = this.getSavingPath(dir, name);
        await writeFile(fullpath, binary, 'binary');
        return fullpath;
    }

    private async saveFromUrl(dir: string, url: URL): Promise<string> {
        const basename = path.basename(url.pathname);
        let fullpath: string | undefined;
        const http =
            url.protocol === 'https:'
                ? await import('https')
                : await import('http');
        return await new Promise<string>((resolve, reject) => {
            http.get(url, { headers }, (response) => {
                const probeName =
                    response.headers['content-disposition']?.match(
                        /attachment; filename="?(.+[^"])"?$/i
                    )?.[1] ?? basename;

                const mimeType = response.headers['content-type'];
                const name = this.getName({
                    mimeType,
                    inferredName: probeName,
                });
                fullpath = this.getSavingPath(dir, name);
                const file = createWriteStream(fullpath);
                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    resolve(fullpath!);
                });
            }).on('error', (error) => {
                if (fullpath) {
                    rm(fullpath, { force: true }).finally(() => {
                        reject(error.message);
                    });
                } else {
                    reject(error.message);
                }
            });
        });
    }

    private async saveFromFile(dir: string): Promise<string> {
        assert(typeof this.location === 'string', 'impossible');
        if (!existsSync(this.location)) {
            return Promise.reject(
                new Error(`Source file ${this.location} doesn't exist`)
            );
        }
        const name = this.getName({
            inferredName: path.basename(this.location),
        });
        const saved = this.getSavingPath(dir, name);

        await cp(this.location, saved, { force: true });
        return saved;
    }
}
