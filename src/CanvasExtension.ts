export {};

declare global {
  interface CanvasRenderingContext2D {
    transformedPoint(x: number, y: number): DOMPoint;
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): number;
  }
}