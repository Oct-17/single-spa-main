import baseConfig, {__dirname} from './webpack.base.js';
import {merge} from 'webpack-merge';
import path from "node:path";
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const config = {
  mode: 'development',
  devtool: 'inline-source-map',  // 方便调试
  // 微应用需要指定path不然取不到正确的域名
  entry: [
    // todo 热更新会让主应用挂掉
    // `webpack-hot-middleware/client?path=http://localhost:9999/__webpack_hmr`,
    path.join(__dirname, '../client/index.js')
  ],
  output: {
    path: path.resolve('../dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({log: false}),
    new ReactRefreshWebpackPlugin(),
    // new MyPlugin({message: 'my-plugin-message'}),
  ],
};

// noinspection JSCheckFunctionSignatures
export default merge(baseConfig, config);
