import { Canvas } from 'canvas';

export type RenderCancas = HTMLCanvasElement | Canvas;

type ElementType = 'image' | 'rect' | 'text';
interface BaseElement {
  type: ElementType;
  left: number;
  top: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  width?: number;
  height?: number;
  url: string;
  rotate?: number;
}

export interface RectElement extends BaseElement {
  type: 'rect';
  width: number;
  height: number;
  color: string;
  rotate?: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  width: number;
  height?: number;
  color: string;
  text: string;
  font: string;
  rotate?: number;
  lineHeight: number;
  // 是否镂空
  stroke?: boolean;
}

export type Element = ImageElement | RectElement | TextElement;

export interface Layout {
  width: number;
  height: number;
  elements: Element[];
}

export interface RenderOptions {
  mimeType: 'image/jpeg' | 'image/png';
  quality?: number;
}
