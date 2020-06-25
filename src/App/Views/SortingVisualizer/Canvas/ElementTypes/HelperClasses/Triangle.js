import { globalP, backgroundColor } from '../../Canvas';

export default class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, overlay) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.overlay = overlay;
  };

  show = () => {
    globalP.fill(0, 0, 100);
    globalP.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  hide = () => {
    globalP.fill(0, 0, globalP.map(backgroundColor, 0, 255, 0, 100));
    globalP.triangle(this.overlay.x1, this.overlay.y1, this.overlay.x2, this.overlay.y2, this.overlay.x3, this.overlay.y3);
  }

  copy = () => {
    return new Triangle(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      this.x3,
      this.y3,
      this.overlay,
    );
  }
}

