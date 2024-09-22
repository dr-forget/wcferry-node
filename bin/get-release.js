const fs = require("fs");
const path = require("path");
const axios = require("axios");
const AdmZip = require("adm-zip");

const folder = path.join(__dirname, "../wcf-sdk"); // 默认文件夹路径

// 检查文件夹是否存在，不存在则创建
const checkFolder = async (folderPath) => {
  try {
    await fs.promises.access(folderPath, fs.constants.F_OK);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.promises.mkdir(folderPath, { recursive: true });
    } else {
      throw err;
    }
  }
};

// 下载最新版本文件
const downloadLatest = async () => {
  const apiUrl =
    "https://api.github.com/repos/lich0821/WeChatFerry/releases/latest";

  try {
    const response = await axios.get(apiUrl, {
      responseType: "json",
    });

    if (
      !response ||
      !response.data ||
      !response.data.assets ||
      response.data.assets.length === 0
    ) {
      throw new Error("Failed to retrieve valid data from GitHub API.");
    }

    const repourl = response.data.assets[0].browser_download_url;
    const turl = `https://ghproxy.org/${repourl}`;
    console.log(`Get latest release download link: ${turl}`);

    const filename = path.basename(turl);
    const output = path.join(folder, filename);

    // 如果文件已经存在，则不再下载
    if (
      await fs.promises
        .access(output, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
    ) {
      console.log("File already exists.");
    } else {
      const writer = fs.createWriteStream(output);
      const download = await axios({
        method: "get",
        url: turl,
        responseType: "stream",
      });

      // 显示下载进度
      let downloadProgress = 0;
      const totalLength = parseInt(download.headers["content-length"], 10);

      download.data.on("data", (chunk) => {
        downloadProgress += chunk.length;
        console.log(
          `Downloading... ${Math.round(
            (downloadProgress / totalLength) * 100
          )}%`
        );
      });

      download.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
    }

    console.log(`Downloaded to ${output}`);
    return output;
  } catch (error) {
    console.error("Error downloading latest release:", error.message);
    throw error;
  }
};

// 解压缩文件
const unzip = async (zipFile, dest = folder) => {
  try {
    const zip = new AdmZip(zipFile);
    await new Promise((resolve, reject) => {
      zip.extractAllToAsync(dest, true, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log(`Extracted ${zipFile} to ${dest}`);
  } catch (error) {
    console.error("Error extracting zip file:", error.message);
    throw error;
  }
};

// 主流程
const main = async () => {
  try {
    await checkFolder(folder);
    const outputFile = await downloadLatest();
    await unzip(outputFile);
    await fs.promises.unlink(outputFile); // 删除下载的压缩文件
    console.log("Cleanup complete.");
  } catch (error) {
    console.error("Main process error:", error.message);
    process.exitCode = 1;
  }
};

main();
