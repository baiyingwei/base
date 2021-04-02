const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const WebSocket = require('ws');
let whitList = ['http://localhost:8080'] //设置白名单

app.use(async (ctx, next) => {
  const origin = ctx.headers.origin;
  if (whitList.includes(origin)) {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 6);
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200;
    } else {
      await next();
    }
  }
});

// router.put('/index', async (ctx, next) => {
//   // ctx.type = 'text/html';
//   ctx.body = "fnCall('put')";
// });

// router.get('/index', async (ctx, next) => {
//   // ctx.type = 'text/html';
//   ctx.body = "fnCall('get')";
// });


// let wss = new WebSocket.Server({ port: 3000 });
// wss.on('connection', function (ws) {
//   ws.on('message', function (data) {
//     console.log(data);
//     ws.send('我不爱你')
//     setTimeout(() => {
//       ws.send('我不爱你+1')
//     }, 3000)
//   });
// })

app.use(router.routes(), router.allowedMethods());
app.listen(3000);