const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let subscribers = [];

router.get('/subscribe', async (ctx, next) => {
  const promise = new Promise((resolve) => {
    subscribers.push(resolve);
  });

  let msg;
  try {
    msg = await promise;
  } catch (err) {
    throw err;
  }

  ctx.body = msg;
  return next();
});

router.post('/publish', async (ctx, next) => {
  const msg = ctx.request.body.message;

  if (!msg) {
    ctx.throw(400);
  }

  subscribers.forEach(function(resolve) {
    resolve(String(msg));
  });

  subscribers = [];
  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
