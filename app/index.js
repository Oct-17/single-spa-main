import Koa from 'koa';
import webpack from 'webpack';
import KoaRouter from 'koa-router';
import {getIPAddresses} from "./utils/tools.js";
import koaWebpackDevMiddleware from './middleware/koa-webpack-dev-middleware.js';
import koaWebpackHotMiddleware from "./middleware/koa-webpack-hot-middleware.js";
import webpackConfig from '../config/webpack.dev.js';

import path from "node:path";

const compiler = webpack(webpackConfig);

const app = new Koa();
const router = new KoaRouter({prefix: '/api'});

compiler.hooks.done.tap('watchdone', () => {
  setTimeout(() => {
    const {ipv4} = getIPAddresses();
    console.log(`局域网地址：http://${ipv4}:9999`);
    console.log(`本机地址：http://127.0.0.1:9999`)
  }, 500);
});


// CORS 中间件
app.use(async (ctx, next) => {
  // 设置允许跨域的域名
  ctx.set('Access-Control-Allow-Origin', '*');
  // // 设置允许的 HTTP 方法
  // ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // // 设置允许的请求头
  // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }

  await next();
});

app.use(
  koaWebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
    },
    writeToDisk: false,
  })
);

// 热更新
app.use(koaWebpackHotMiddleware(compiler, {
  log: false,
  path: '/__webpack_hmr'
}));

app.use(async (ctx, next) => {
  const filePath = path.join(webpackConfig.output.path, 'index.html');
  const compilerOutput = compiler.outputFileSystem;

  console.log('rrr============>>>>')
  if (compilerOutput.existsSync(filePath)) {
    let htmlContent = compilerOutput.readFileSync(filePath, 'utf-8');
    // const customScript = `
    //   <script>
    //     window.customScript = 'hello world';
    //   </script>
    // `;
    // console.log('================>>>', htmlContent);
    // htmlContent = htmlContent.replace('</body>', `${customScript}</body>`);
    console.log('asd::')
    ctx.type = 'text/html';
    ctx.body = htmlContent;
  } else {
    ctx.status = 404;
    ctx.body = 'File not found';
  }
  await next();
});


router.post('/getList', async (ctx, next) => {
  console.log('rrr::post')
  ctx.set('Content-Type', 'application/json');
  ctx.status = 200;
  ctx.body = {
    code: 0,
    data: [],
    msg: 'success'
  };

  await next();
});

// 注册路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9999);
