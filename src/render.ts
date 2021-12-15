import {
  NodeCanvasRenderingContext2D,
  Canvas,
  Image,
  registerFont,
} from 'canvas';
import type {
  ImageElement,
  Layout,
  RectElement,
  RenderOptions,
  Element,
  TextElement,
  ImageClip,
  Font,
} from './type';
import {
  loadImage,
  getStyle,
  isUndef,
  createCanvas,
  isNodeEnv,
  loadFontText,
} from './utils';

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

export async function registerFonts(fonts: Font[]) {
  if (!isNodeEnv) return;
  for (const font of fonts) {
    const { family, weight, path, style } = font;
    registerFont(path, {
      family,
      weight,
      style,
    });
  }
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
  await renderHorizontalText(context, ele);
}

/**
 * 绘制多行 横向文字
 * @param context
 * @param ele
 */
export async function renderHorizontalText(
  context: NodeCanvasRenderingContext2D,
  ele: TextElement,
) {
  const { text, left, top, lineHeight, width, font, style, rotate, height } =
    ele;
  const x = left;
  let y = top;

  // 字符分隔为数组
  const arrText = text.split('');
  let line = '';
  if (rotate) {
    context.rotate(rotate);
  }
  if (!isNodeEnv) {
    await loadFontText(ele);
  }
  context.font = font;
  context[ele.stroke ? 'strokeStyle' : 'fillStyle'] = await getStyle(
    context,
    style,
  );
  const draw = (t: string) =>
    ele.stroke ? context.strokeText(t, x, y) : context.fillText(t, x, y);
  for (let n = 0; n < arrText.length; n++) {
    const testLine = line + arrText[n];
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (height && height < y - top) {
      break;
    }
    if (testWidth > width && n > 0) {
      draw(line);
      line = arrText[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (!height || height > y - top) {
    draw(line);
  }
}
