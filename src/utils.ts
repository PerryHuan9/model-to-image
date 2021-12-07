import type { NodeCanvasRenderingContext2D } from 'canvas';
import type { Style, RadialGradient, LinearGradient, Pattern } from './type';

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = 'anonymous';
    img.decoding = 'sync';
    img.src = url;
  });
}

export function download(url: string, name: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const isNodeEnv = typeof window === 'undefined';

export async function loadImage(url: string) {
  return isNodeEnv ? (await import('canvas')).loadImage(url) : createImage(url);
}

export async function getStyle(
  context: NodeCanvasRenderingContext2D,
  style: Style,
) {
  let canvasStyle: string | CanvasGradient | CanvasPattern = style as string;
  if (!isUndef((style as RadialGradient).startRadius)) {
    const { startRadius, endRadius, startX, startY, endX, endY, stops } =
      style as RadialGradient;
    canvasStyle = context.createRadialGradient(
      startX,
      startY,
      startRadius,
      endX,
      endY,
      endRadius,
    );
    for (const [radio, color] of stops) {
      canvasStyle.addColorStop(radio, color);
    }
  } else if (!isUndef((style as LinearGradient).startX)) {
    const { startX, startY, endX, endY, stops } = style as LinearGradient;
    canvasStyle = context.createLinearGradient(startX, startY, endX, endY);
    for (const [radio, color] of stops) {
      canvasStyle.addColorStop(radio, color);
    }
  } else if (!isUndef((style as Pattern).mode)) {
    const { image, mode } = style as Pattern;
    const img = await loadImage(image);
    canvasStyle = context.createPattern(img, mode);
  }
  return canvasStyle;
}

export function isUndef(val: any) {
  return typeof val === 'undefined';
}
