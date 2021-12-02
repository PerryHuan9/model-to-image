import { Canvas, NodeCanvasRenderingContext2D } from 'canvas';
import {
  ImageElement,
  Layout,
  RectElement,
  RenderOptions,
  Element,
} from './type';
import { createImage } from './utils';

const DEFAULT_OPTIONS: RenderOptions = {
  mimeType: 'image/png',
};

export async function render(
  canvas: Canvas,
  model: Layout,
  op?: RenderOptions,
) {
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
  switch (ele.type) {
    case 'image':
      return renderImage(context, ele);
    case 'rect':
      return renderRect(context, ele);
    default:
      return Promise.resolve();
  }
}

async function renderImage(
  context: NodeCanvasRenderingContext2D,
  ele: ImageElement,
) {
  const image = await createImage(ele.url);
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
  context.drawImage(image, ele.left, ele.top, imageWidth, imageHeight);
}

async function renderRect(
  context: NodeCanvasRenderingContext2D,
  rect: RectElement,
) {
  context.fillStyle = rect.color;
  context.fillRect(rect.left, rect.top, rect.width, rect.height);
}
