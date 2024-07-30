import webpackHotMiddleware from "webpack-hot-middleware";

const koaWebpackHotMiddleware = (compiler, options = {}) => {
  const middleware = webpackHotMiddleware(compiler, options);
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      middleware(ctx.req, ctx.res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await next();
  }
}

export default koaWebpackHotMiddleware;
