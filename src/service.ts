import http from "http"
import koffi from "koffi"
import path from "path"

const port = 62345

export const start_service = () => {
    const dll_path = path.join(__dirname, './wcf-sdk/sdk.dll')

    const wcf_sdk = koffi.load(dll_path);
    // @ts-ignore
    const WxInitSDK = wcf_sdk.func("int WxInitSDK(bool, int)", "stdcall");

    // @ts-ignore
    const WxDestroySDK = wcf_sdk.func("void WxDestroySDK()", "stdcall");
    
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!\n');
    })

    server.listen(port, '0.0.0.0', () => {
        const initResult = WxInitSDK(false, 10086);
        if (initResult == 0) {
            console.log(`WCF IS RUN IN PROT:${10086}`);
        } else {
            console.log("wcf=====>faild");
        }
        console.log(`Server is running at http://0.0.0.0:${port}`);

    });

    const stop = () => {
        server.close(() => {
            console.log('Server closed.');
        });
        WxDestroySDK()
        process.exit(0); // 退出进程
    }


    process.on('SIGINT', () => {
        process.exit(0)
    });
    process.on("exit", () => {
        console.log('wcf===>close')
        stop()
    });
}