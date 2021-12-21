import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-body';
import { modelToImage, nodeRegisterFonts } from '../../src';

// 注册字体
nodeRegisterFonts([
  {
    path: './fonts/acgn.woff',
    family: 'FZZJ-ZBQPBJW',
  },
  {
    path: './fonts/niuniu.ttf',
    family: 'niu-niu',
  },
]);

const app = new Koa();

const router = new KoaRouter();

router.post('/generate', async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  const { body } = ctx.request;
  const model = JSON.parse(body.content);
  const url = await modelToImage(model);
  ctx.body = url;
});

app.use(KoaBody({ multipart: true }));
app.use(router.routes()).use(router.allowedMethods());
app.listen(9000, () => {
  console.log('http://localhost:9000');
});
