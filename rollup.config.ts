import fs from 'fs';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import globFast from 'fast-glob';
import { cleandir } from 'rollup-plugin-cleandir';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const commpireTs = globFast.sync(['src/**/*.ts'], { dot: true });

const prod_project_path = fileURLToPath(import.meta.url);
const config_root = join(dirname(prod_project_path), 'package.json');
const pkg = JSON.parse(fs.readFileSync(config_root, 'utf-8'));
const external = Object.keys(pkg.dependencies || {});

export default [
  {
    input: commpireTs, // 输入文件路径
    output: {
      dir: 'dist', // 输出文件路径
      format: 'cjs', // 输出模块格式为 commonjs 规范
      preserveModules: true, // 保留模块路径信息
      entryFileNames: '[name].js', // 输出文件名格式
      chunkFileNames: '[name]-[hash].js',
      sourcemap: false,
    },
    plugins: [
      cleandir('dist'), // 清空输出目录
      resolve(),
      commonjs(),
      typescript({
        module: 'esnext',
        sourceMap: false,
        tsconfig: './tsconfig.json',
      }),
      copy({
        targets: [
          {
            src: 'src/wcf-sdk/**/*',
            dest: 'dist/wcf-sdk',
          },
        ],
      }),
      process.env.NODE_ENV == 'production' ? terser() : null,
    ],
    external: [...external, 'url', 'path', 'fs'], // 如果有需要排除的外部依赖项，可以在这里添加
  },
];
