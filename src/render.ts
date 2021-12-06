import type { NodeCanvasRenderingContext2D, Canvas } from 'canvas';
import type {
  ImageElement,
  Layout,
  RectElement,
  RenderOptions,
  Element,
  TextElement,
} from './type';
import { loadImage, getStyle, isNodeEnv } from './utils';

const DEFAULT_OPTIONS: RenderOptions = {
  mimeType: 'image/png',
};

export async function render(model: Layout, op?: RenderOptions) {
  const canvas: Canvas = isNodeEnv
    ? (await import('canvas')).createCanvas(0, 0)
    : (document.createElement('canvas') as any);
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
  const image = await loadImage(ele.url);
  let imageWidth = ele.width;
  let imageHeight = ele.height;
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

async function renderRect(
  context: NodeCanvasRenderingContext2D,
  rect: RectElement,
) {
  if (rect.rotate) {
    context.rotate(rect.rotate);
  }

  if (rect.style) {
    context.fillStyle = await getStyle(context, rect.style);
  }

  context.fillRect(rect.left, rect.top, rect.width, rect.height);
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
