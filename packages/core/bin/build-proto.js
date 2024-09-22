const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');
const [version] = process.argv.splice(2);
const PROTO_DIR = path.join(__dirname, '../proto');

const win32 = process.platform === 'win32' ? '.CMD' : '';
const PROTO_GENERATED = path.join(__dirname, '../src/proto');
const PROTO_LINKS = [
  `https://mirror.ghproxy.com/https://raw.githubusercontent.com/lich0821/WeChatFerry/${version || 'master'}/WeChatFerry/rpc/proto/wcf.proto`,
  `https://mirror.ghproxy.com/https://raw.githubusercontent.com/lich0821/WeChatFerry/${version || 'master'}/clients/python/roomdata.proto`,
];

// Function to ensure directory exists
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return path.resolve(dirPath);
}

// Function to download and save proto files
async function getPbs() {
  console.log('Downloading latest pb files');
  ensureDirExists(PROTO_DIR);

  for (const url of PROTO_LINKS) {
    try {
      const response = await downloadFile(url);
      const filename = path.basename(url);
      const filePath = path.join(PROTO_DIR, filename);

      const content = processProtoContent(response);
      // Save the downloaded file
      fs.writeFileSync(filePath, content);

      console.log(`Downloaded ${filename} successfully`);
    } catch (err) {
      console.error(`Error downloading ${url}:`, err);
    }
  }
}

function processProtoContent(protoContent) {
  // 正则表达式匹配 map 结构
  const mapPattern = /map<(\w+),\s*(\w+)>\s+(\w+)\s*=\s*(\d+);/g;

  // 替换为 repeated 结构，并生成新的消息类型
  const modifiedContent = protoContent.replace(mapPattern, (match, keyType, valueType, fieldName, fieldNumber) => {
    const newMessageName = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`; // 将 fieldName 首字母大写

    // 生成新的消息类型定义
    const newMessage = `message ${newMessageName} {\n    ${keyType} code = 1;\n    ${valueType} label = 2;\n}\n`;

    // 在替换位置插入新消息类型
    return `${newMessage}repeated ${newMessageName} ${fieldName} = ${fieldNumber};`;
  });

  return modifiedContent;
}

// Function to download a file from URL
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          rejectUnauthorized: false,
        },
        (response) => {
          let data = '';

          // A chunk of data has been received.
          response.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received.
          response.on('end', () => {
            resolve(data);
          });
        },
      )
      .on('error', (err) => {
        reject(err);
      });
  });
}

// Function to compile proto files (similar to previous example)
function invokeProtoGen() {
  console.log('Compiling pb into ts files');

  const grpcToolsPath = path.join(__dirname, `../node_modules/.bin/grpc_tools_node_protoc`);

  const grpcToolsPathPlugins = path.join(__dirname, `../node_modules/.bin/grpc_tools_node_protoc_plugin${win32}`);

  const protoGenTsPath = path.join(__dirname, `../node_modules/.bin/protoc-gen-ts${win32}`);

  const arguments = [
    `--plugin=protoc-gen-grpc=${grpcToolsPathPlugins}`,
    `--plugin=protoc-gen-ts=${protoGenTsPath}`,
    `--ts_out=${PROTO_GENERATED}`,
    `--grpc_out=grpc_js:${PROTO_GENERATED}`,
    `--proto_path=${PROTO_DIR}`,
    `${PROTO_DIR}/*.proto`,
  ];

  try {
    execSync(`${grpcToolsPath} ${arguments.join(' ')}`, { stdio: 'inherit' });
    setLintIgnore();
    console.log('Proto files compiled successfully');
  } catch (err) {
    console.error('Error compiling proto files:', err);
  }
}

// Function to prepend eslint-disable and @ts-nocheck to generated files
function setLintIgnore() {
  console.log('Prepending eslint-disable and @ts-nocheck');

  // Get all TypeScript files in PROTO_GENERATED directory recursively
  const files = getAllFiles(PROTO_GENERATED, '.ts');

  files.forEach((file) => {
    try {
      // Read current contents
      let contents = fs.readFileSync(file, 'utf8');

      // Prepend /* eslint-disable */ and //@ts-nocheck
      contents = `/* eslint-disable */\n//@ts-nocheck\n${contents}`;

      // Write back to the file
      fs.writeFileSync(file, contents, 'utf8');
    } catch (err) {
      console.error(`Error processing file ${file}:`, err);
    }
  });
}
// Function to get all files with specified extension recursively
function getAllFiles(dirPath, ext) {
  let files = [];

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(filePath, ext));
    } else if (path.extname(filePath) === ext) {
      files.push(filePath);
    }
  });

  return files;
}

// Main function to orchestrate the process
async function main() {
  try {
    await getPbs();
    invokeProtoGen();
    console.log('Done');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the main function
main();
