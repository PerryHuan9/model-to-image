import { Image, loadImage } from 'canvas';

export class ImageFactoty {
  imageMap: Map<string, Promise<Image>>;

  constructor() {
    this.imageMap = new Map();
  }

  loadImage(url: string) {
    let promise = this.imageMap.get(url);
    if (!promise) {
      promise = loadImage(url);
      this.imageMap.set(url, promise);
    }
    return promise;
  }

  loadImages(urls: string[]) {
    for (const url of urls) {
      this.loadImage(url);
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let imageFactory: ImageFactoty;

export const globalImageFactory = new ImageFactoty();

export function setImageFactory(factory: ImageFactoty) {
  imageFactory = factory;
}
