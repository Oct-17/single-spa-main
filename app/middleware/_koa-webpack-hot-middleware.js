import webpackHotMiddleware from 'webpack-hot-middleware';

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

export default function (compiler, option) {
  const action = webpackHotMiddleware(compiler, option);
  return async function (ctx, next) {
    const nextStep = await middleware(action, ctx.req, ctx.res);
    if (nextStep && next) {
      await next();
    }
  };
};
