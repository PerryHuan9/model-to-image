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
  imageX?: number;
  imageY?: number;
}

type GradientStop = [number, string];

export interface LinearGradient {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stops: GradientStop[];
}

export interface RadialGradient {
  stops: GradientStop[];
  startRadius: number;
  endRadius: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
export interface Pattern {
  image: string;
  mode: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
}

export type Style = string | LinearGradient | RadialGradient | Pattern;

export interface RectElement extends BaseElement {
  type: 'rect';
  width: number;
  height: number;
  rotate?: number;
  style: Style;
  lineWidth?: number;
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
