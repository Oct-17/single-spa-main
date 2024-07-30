import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from "webpack";

/**
 * Koa Webpack Dev Middleware plugin
 * @param {webpack.Compiler} compiler - Webpack compiler instance
 * @param {object} [options] - Options for webpack-dev-middleware
 * @returns {function} - Koa middleware function
 */
function koaWebpackDevMiddleware(compiler, options) {
  const middleware = webpackDevMiddleware(compiler, options);

  return async (ctx, next) => {
    // Wrap the middleware function in a promise
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
  };
}

export default koaWebpackDevMiddleware;
