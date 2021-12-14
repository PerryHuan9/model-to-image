import { NodeCanvasRenderingContext2D, Canvas, Image } from 'canvas';
import type {
  ImageElement,
  Layout,
  RectElement,
  RenderOptions,
  Element,
  TextElement,
  ImageClip,
} from './type';
import { loadImage, getStyle, isUndef, createCanvas } from './utils';

const DEFAULT_OPTIONS: RenderOptions = {
  mimeType: 'image/png',
};

export async function render(model: Layout, op?: RenderOptions) {
  const canvas = await createCanvas();
  const options = { ...DEFAULT_OPTIONS, ...op };
  const context = canvas.getContext('2d');
  canvas.width = model.width;
  canvas.height = model.height;
  if (!context) return '';
  const rootPromise = new Promise((resolve, reject) => {
    let promise = Promise.resolve();
    for (const ele of model.elements) {
      promise = promise.then(() => renderElement(context, ele));
    }
    promise
      .then(() => resolve(undefined))
      .catch((err) => {
        reject(err);
      });
  });
  await rootPromise;
  if (options.mimeType === 'image/png') {
    return canvas.toDataURL('image/png');
  }
  return canvas.toDataURL('image/jpeg', options.quality);
}

async function renderElement(
  context: NodeCanvasRenderingContext2D,
  ele: Element,
) {
  context.save();
  switch (ele.type) {
    case 'image':
      await renderImage(context, ele);
      break;
    case 'rect':
      await renderRect(context, ele);
      break;
    case 'text':
      await renderText(context, ele);
      break;
    default:
  }
  context.restore();
}

async function renderImage(
  context: NodeCanvasRenderingContext2D,
  ele: ImageElement,
) {
  let image: Image | Canvas = await loadImage(ele.url);
  let imageWidth = ele.width;
  let imageHeight = ele.height;
  if (ele.clip) {
    image = await clipImage(image, ele.clip);
    console.log('image:', ele.clip, image.width, image.height);
  }
  if (!imageWidth) {
    imageWidth = ele.height
      ? (ele.height / image.height) * image.width
      : image.width;
  }

  if (!imageHeight) {
    imageHeight = ele.width
      ? (ele.width / image.width) * image.height
      : image.height;
  }
  if (ele.rotate) {
    context.rotate(ele.rotate);
  }

  context.drawImage(image, ele.left, ele.top, imageWidth, imageHeight);
}

async function clipImage(image: Image, clip: ImageClip) {
  const canvas = await createCanvas();
  const { startX, startY } = clip;
  let { width, height } = clip;
  // 裁剪时
  width = Math.min(image.width - startX, width);
  height = Math.min(image.height - startY, height);
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, startX, startY, width, height, 0, 0, width, height);
  return canvas;
}

async function renderRect(
  context: NodeCanvasRenderingContext2D,
  rect: RectElement,
) {
  if (rect.rotate) {
    context.rotate(rect.rotate);
  }
  const isStroke = !isUndef(rect.lineWidth);

  if (isStroke) {
    context.lineWidth = rect.lineWidth!;
  }

  if (rect.style) {
    context[isStroke ? 'strokeStyle' : 'fillStyle'] = await getStyle(
      context,
      rect.style,
    );
  }

  context[isStroke ? 'strokeRect' : 'fillRect'](
    rect.left,
    rect.top,
    rect.width,
    rect.height,
  );
}

async function renderText(
  context: NodeCanvasRenderingContext2D,
  ele: TextElement,
) {
  renderHorizontalText(context, ele);
}

/**
 * 绘制多行 横向文字
 * @param context
 * @param ele
 */
function renderHorizontalText(
  context: NodeCanvasRenderingContext2D,
  ele: TextElement,
) {
  const { text, left, top, lineHeight, width, font, color, rotate, height } =
    ele;
  const x = left;
  let y = top;

  // 字符分隔为数组
  const arrText = text.split('');
  let line = '';
  if (rotate) {
    context.rotate(rotate);
  }
  const draw = (t: string, x1: number, y1: number) =>
    ele.stroke ? context.strokeText(t, x1, y1) : context.fillText(t, x1, y1);
  context.font = font;
  context[ele.stroke ? 'strokeStyle' : 'fillStyle'] = color;
  for (let n = 0; n < arrText.length; n++) {
    const testLine = line + arrText[n];
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (height && height < y - top) {
      break;
    }
    if (testWidth > width && n > 0) {
      draw(line, x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (height && height > y - top) {
    draw(line, x, y);
  }
}
