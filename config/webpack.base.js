import path from 'node:path';
import {fileURLToPath} from 'node:url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const packageName = process.env.npm_package_name;

export default {
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageName}`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      client: path.join(__dirname, '../client'),
      antd: path.join(__dirname, '../node_modules/antd'),
      dayjs: path.join(__dirname, '../node_modules/dayjs'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        }
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      },
    ]
  },
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '/',
      manifest: path.resolve(__dirname, '../dist', 'vendor-manifest.json') // 指向你之前创建的清单文件
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/resource/index.html'),
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        console.info(`[${Math.floor(percentage * 100)}%]`, message, ...args);
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
}
