import { globalP, width as windowWidth, height as windowHeight, count} from '../Canvas';

export default class ColoredTriangle {
  ox;
  oy;
  x1;
  y1;
  x2;
  y2;
  pointer;
  hue;

  constructor(x1, y1, x2, y2, rNumber, trianglePointer) {
    this.ox = windowWidth / 2;
    this.oy = windowHeight / 2;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.pointer = trianglePointer;

    let newHue = rNumber * (360 / count);
    this.hue = newHue;
  };

  copy = () => {
    let newColoredTriangle;

    let newRNumber = this.hue / (360 / count);
    newColoredTriangle = new ColoredTriangle(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      newRNumber,
      this.pointer.copy(),
    );

    return newColoredTriangle;
  }

  show = (arg) => {
    if (arg === 'red') {
      this.pointer.show();
      globalP.fill(this.hue, 100, 100);
    } else if (arg === 'lastShow') {
      globalP.fill(this.hue, 100, 100);
    } else {
      this.pointer.hide();
      globalP.fill(this.hue, 100, 100);
    }
    globalP.triangle(this.ox, this.oy, this.x1, this.y1, this.x2, this.y2);
    
    return this;
  };

  getValue = () => this.hue;
}

