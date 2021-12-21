import type { NodeCanvasRenderingContext2D } from 'canvas';
import { imageFactory } from './image-factory';
import type { Style, RadialGradient, LinearGradient, Pattern } from './type';
import { isUndef } from './utils';

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
    const img = await imageFactory.loadImage(image);
    canvasStyle = context.createPattern(img, mode);
  }
  return canvasStyle;
}
