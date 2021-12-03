import { loadImage as nodeLoadImage } from 'canvas';

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

export function download(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'one.jpeg';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const isNodeEnv = typeof window === 'undefined';

export const loadImage = isNodeEnv ? nodeLoadImage : createImage;
