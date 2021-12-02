import { render } from '../../src';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import { createCanvas } from 'canvas';

const app = new Koa();

const router = new KoaRouter();

router.post('/generage', () => {

})


app.use(router.routes()).use(router.allowedMethods())
app.listen(9000);
