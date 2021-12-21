import type { Canvas, Image } from 'canvas';

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
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

export async function loadImage(url: string): Promise<Image> {
  return isNodeEnv
    ? (await import('canvas')).loadImage(url)
    : (createImage(url) as any);
}

export function isUndef(val: any) {
  return typeof val === 'undefined';
}

export async function createCanvas(): Promise<Canvas> {
  return isNodeEnv
    ? (await import('canvas')).createCanvas(0, 0)
    : (document.createElement('canvas') as any);
}

export function loadFont(url: string) {
  return new Promise<HTMLLinkElement>((resolve, reject) => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.onload = () => {
      resolve(link);
    };
    link.onerror = (err) => {
      reject(err);
    };
    document.head.appendChild(link);
  });
}

export async function loadFontText(ele: {
  fontUrl?: string;
  font: string;
  text: string;
}) {
  const { fontUrl, font, text } = ele;
  if (fontUrl) {
    await loadFont(fontUrl);
  }
  const fontSet = (document as any).fonts;
  // 等待字体就绪
  await fontSet.ready;
  await fontSet.load(font, text);
}
