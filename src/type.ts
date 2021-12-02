import { Canvas } from 'canvas';

export type RenderCancas = HTMLCanvasElement | Canvas;

// export interface Background {
//   image?: string;
//   color?: string;
// }

// interface BorderLine {
//   color: string;
//   width: number;
// }

// export interface Border {
//   left?: BorderLine;
//   right?: BorderLine;
//   top?: BorderLine;
//   bottom?: BorderLine;
// }

interface BaseElement {
  left: number;
  top: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  width?: number;
  height?: number;
  url: string;
}

export interface RectElement extends BaseElement {
  type: 'rect';
  width: number;
  height: number;
  color: string;
}

export type Element = ImageElement | RectElement;

export interface Layout {
  width: number;
  height: number;
  elements: Element[];
}

export interface RenderOptions {
  mimeType: 'image/jpeg' | 'image/png';
  quality?: number;
}
