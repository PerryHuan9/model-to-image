# model-to-image
model-to-image is a image generater for both browser and node.


## Installation
```
$ yarn add model-to-image
```
or
```
$ npm install model-to-image
```

## Quick Start

```ts
import { modelToImage, Layout } from 'model-to-image';

const model:Layout = {
  width: 500,
  height: 800,
  elements: [
    {
      type: 'rect',
      left: 0,
      top: 0,
      width: 500,
      height: 800,
      style: 'rgb(62, 36, 19)'
    },
     {
      type: 'image',
      width: 300,
      left: 0,
      top: 0,
      url: 'https://st0.dancf.com/gaoding-material/0/images/354641/20200108-213854-NjUJI.jpg'
    },
     {
      type: 'image',
      width: 200,
      left: 300,
      top: 0,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/023e91cb-1235-4a45-b782-eba93e4250aa14867.jpg'
    },
    {
      type: 'image',
      left: 300,
      top: 140,
      width: 200,
      url: 'https://gd-filems.dancf.com/mcm79j/mcm79j/8119022d-79eb-421e-9c8e-0e5e1418dee314866.png'
    },
    {
      type: 'image',
      left: 300,
      top: 300,
      width: 200,
      url: 'https://st0.dancf.com/gaoding-material/0/images/353985/20200108-213027-qjucQ.jpg'
    },
     {
      type: 'text',
      text: `登高\n杜甫\n风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。\n`,
      left: 250,
      top: 550,
      width: 500,
      textAlign: 'center',
      style: 'white',
      font: '20px Arial',
      lineHeight: 30,
    }
  ]
}

modelToImage(model).then((url) => {
  console.log(url);
})

```
Generate Image:

<img src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/72fc2f47-57d8-4e12-b64b-918059403d4e2867389.png" />

## Use in node

```ts
import Koa from 'koa';
import KoaRouter from 'koa-router';
import KoaBody from 'koa-body';
import { modelToImage, nodeRegisterFonts } from '../../src';

// register font
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

```
## Documentation

### `modelToImage`


```ts
function render(model: Layout, op?: RenderOptions): Promise<string>;

```

### `RenderOptions`
```ts
export interface RenderOptions {
  mimeType: 'image/jpeg' | 'image/png';
  quality?: number;
  useCache?: boolean;
}
```

* mimeType is the generate image type.
* quality is the generate image quality.
* if useCache set to true, every time you call `modelToImage` will use cache image, default is true. 



### `Layout`

Descrite the view you want to generate by the `Layout` model.

```ts
export type Element = ImageElement | RectElement | TextElement;
export interface Layout {
  width: number;
  height: number;
  elements: Element[];
}
```


## Examples

### LinearGradient
```ts
modelToImage({
  width: 200,
  height: 200,
  elements: [
    {
      type: 'rect',
      top: 0,
      left: 0,
      width: 500,
      height: 500,
      style: {
        startX: 0,
        startY: 0,
        endX: 500,
        endY: 500,
        stops: [
          [0, 'red'],
          [0.5, 'blue'],
          [1, 'green'],
        ],
      },
    },
  ],
})
```
<img src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/dcb735c3-148e-48ce-8d3a-93fc418809f612772.png">

### RadialGradient

```ts
modelToImage({
  width: 200,
  height: 200,
  elements: [
    {
      type: 'rect',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      style: {
        startX: 100,
        startY: 100,
        endX: 100,
        endY: 100,
        startRadius: 200,
        endRadius: 50,
        stops: [
          [0, 'red'],
          [0.5, 'blue'],
          [1, 'green'],
        ],
      },
    },
  ],
})
```

<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/b4096da6-611c-4f18-addf-aeeb7e95579f18981.png">

### Image repeat

```ts
modelToImage({
  "width": 400,
  "height": 400,
  "elements": [
    {
      "type": "rect",
      "top": 0,
      "left": 0,
      "width": 400,
      "height": 400,
      "style": {
        "image": "https://gd-filems.dancf.com/mcm79j/mcm79j/75617/926696bc-8b64-49e0-b6d5-6935fb73b80b18349186.png",
        "mode": "repeat"
      }
    }
  ]
})
```
<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/fc8572fa-8b54-40f9-bf91-7ed5549b000e24059.png" style="background: white">



### Add border

```ts
modelToImage({
  "width": 400,
  "height": 250,
  "elements": [
    {
      "type": "image",
      "top": 0,
      "left": 0,
      "width": 400,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png"
    },
    {
      "type": "rect",
      "top": 0,
      "left": 0,
      "lineWidth": 40,
      "width": 400,
      "height": 250,
      "style": {
        "startX": 0,
        "startY": 0,
        "endX": 500,
        "endY": 500,
        "stops": [
          [
            0,
            "red"
          ],
          [
            0.5,
            "blue"
          ],
          [
            1,
            "green"
          ]
        ]
      }
    }
  ]
})
```
<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/b5ff6329-49cc-4786-af8d-cf678ad2e2cb26127.png">

### Add repeat border
```js
modelToImage({
  "width": 400,
  "height": 250,
  "elements": [
    {
      "type": "image",
      "top": 0,
      "left": 0,
      "width": 400,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/75617/563b3841-1e32-4417-a2f1-45be815614ed9309403.png"
    },
    {
      "type": "rect",
      "top": 0,
      "left": 0,
      "lineWidth": 100,
      "width": 400,
      "height": 250,
      "style": "green"
    },
    {
      "type": "rect",
      "top": 0,
      "left": 0,
      "lineWidth": 100,
      "width": 400,
      "height": 250,
      "style": {
        "image": "https://gd-filems.dancf.com/mcm79j/mcm79j/75617/926696bc-8b64-49e0-b6d5-6935fb73b80b18349186.png",
        "mode": "repeat"
      }
    }
  ]
})
```

<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/fddc8774-919f-420e-8568-d476f2a112a729298.png" />


### Clip image
```js
modelToImage({
  "width": 375,
  "height": 210,
  "elements": [
    {
      "type": "image",
      "width": 375,
      "left": 0,
      "top": 0,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg",
      "clip": {
        "startX": 85,
        "startY": 150,
        "width": 375,
        "height": 210
      }
    }
  ]
})
```
<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg" />

<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/fdc2922f-95c0-4f9d-979a-bc2afd46e71732554.png" />


### Merge Image

```ts
modelToImage({
  "width": 800,
  "height": 500,
  "elements": [
    {
      "type": "image",
      "width": 500,
      "left": 0,
      "top": 0,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/d159ab7c-44e1-46ca-9c25-b45572404d5c14876.jpg"
    },
    {
      "type": "image",
      "width": 300,
      "left": 500,
      "top": 0,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/023e91cb-1235-4a45-b782-eba93e4250aa14867.jpg"
    },
    {
      "type": "image",
      "left": 500,
      "top": 180,
      "width": 300,
      "url": "https://gd-filems.dancf.com/mcm79j/mcm79j/8119022d-79eb-421e-9c8e-0e5e1418dee314866.png"
    }
  ]
})
```
<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/76f679b6-ef47-4445-9d52-3344b57a150031975.png">

###  Gradient  text

```js
modelToImage({
  "width": 500,
  "height": 600,
  "elements": [
    {
      "type": "rect",
      "left": 0,
      "top": 0,
      "width": 500,
      "height": 600,
      "style": "#888"
    },
    {
      "type": "text",
      "text": "春江潮水连海平，海上明月共潮生。滟滟随波千万里，何处春江无月明！江流宛转绕芳甸，月照花林皆似霰。空里流霜不觉飞，汀上白沙看不见。江天一色无纤尘，皎皎空中孤月轮。江畔何人初见月？江月何年初照人？人生代代无穷已，江月年年望相似。不知江月待何人，但见长江送流水。白云一片去悠悠，青枫浦上不胜愁。谁家今夜扁舟子？何处相思明月楼？可怜楼上月徘徊，应照离人妆镜台。玉户帘中卷不去，捣衣砧上拂还来。此时相望不相闻，愿逐月华流照君。鸿雁长飞光不度，鱼龙潜跃水成文。昨夜闲潭梦落花，可怜春半不还家。江水流春去欲尽，江潭落月复西斜。斜月沉沉藏海雾，碣石潇湘无限路。不知乘月几人归，落月摇情满江树",
      "width": 400,
      "left": 50,
      "top": 50,
      "style": {
        "startX": 0,
        "startY": 0,
        "endX": 500,
        "endY": 600,
        "stops": [
          [
            0,
            "red"
          ],
          [
            0.5,
            "blue"
          ],
          [
            1,
            "green"
          ]
        ]
      },
      "lineHeight": 30,
      "font": "25px Arial"
    }
  ]
})
```

<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/9525cbc1-9be4-4204-a867-440f0090d62835211.png">


### Use Font

```js
modelToImage({
  "width": 500,
  "height": 300,
  "elements": [
    {
      "type": "rect",
      "left": 0,
      "top": 0,
      "width": 500,
      "height": 300,
      "style": "black"
    },
    {
      "type": "text",
      "text": "可叹停机德，堪怜咏絮才",
      "left": 50,
      "top": 100,
      "width": 400,
      "rotate": 0.3490658503988659,
      "style": "white",
      "font": "30px FZZJ-ZBQPBJW",
      "lineHeight": 30,
      "fontUrl": "font url"
    }
  ]
})
```

<image src="https://gd-filems.dancf.com/mcm79j/mcm79j/75617/b49fab1d-3684-4014-a983-b48385b7caf738195.png">
