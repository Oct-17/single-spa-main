// webpack.dll.config.js
import path from 'path';
import webpack from 'webpack';
import {__dirname} from "./webpack.base.js";

export default {
  // mode: 'development',
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'antd'] // 你可以在这里添加任何你希望外部化的库
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_[hash]' // 这个名称必须和 DllReferencePlugin 配置中的 name 匹配
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 这个名称必须和 output.library 配置中的名称匹配
      path: path.resolve(__dirname, '../dist', '[name]-manifest.json') // 输出 DLL 文件的清单文件
    })
  ]
};
