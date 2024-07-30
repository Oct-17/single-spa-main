'use strict';

const expressMiddleware = require('webpack-dev-middleware').default;

function middleware(doIt, req, res) {
  const {send: originalSend, end: originalEnd} = res;

  return new Promise((resolve) => {
    res.end = function end() {
      originalEnd.apply(this, arguments); //eslint-disable-line
      resolve(0);
    };
    res.send = function send() {
      originalSend.apply(this, arguments); //eslint-disable-line
      resolve(0);
    };
    doIt(req, res, () => {
      resolve(1);
    });
  });
}

module.exports = (compiler, option, cb) => {
  if (cb) {
    compiler.hooks.done.tap('DonePlugin', () => {
      setTimeout(() => {
        cb();
      }, 233);
    });
  }


  const doIt = expressMiddleware(compiler, option);

  async function koaMiddleware(ctx, next) {
    const {req} = ctx;
    const locals = ctx.locals || ctx.state;

    ctx.webpack = doIt;

    const runNext = await middleware(doIt, req, {
      locals,
      end(content) {
        ctx.body = content;
      },
      send(content) {
        ctx.body = content;
      },
      setHeader() {
        ctx.set.apply(ctx, arguments); //eslint-disable-line
      },
      set() {
        ctx.set.apply(ctx, arguments); //eslint-disable-line
      },
      get() {
        ctx.get.apply(ctx, arguments); //eslint-disable-line
      },
    });

    if (runNext) {
      await next();
    }
  }

  Object.keys(doIt).forEach((p) => {
    koaMiddleware[p] = doIt[p];
  });

  return koaMiddleware;
};
