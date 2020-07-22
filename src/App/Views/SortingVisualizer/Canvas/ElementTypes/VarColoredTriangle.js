import { globalP, backgroundColor, width as windowWidth, height as windowHeight, count} from '../Canvas';

export default class VarColoredTriangle {
  constructor(x1, y1, x2, y2, bx1, by1, bx2, by2, rx, ry, rNumber, trianglePointer) {
    this.ox = windowWidth / 2;
    this.oy = windowHeight / 2;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.bx1 = bx1;
    this.by1 = by1;
    this.bx2 = bx2;
    this.by2 = by2;
    this.rx = rx;
    this.ry = ry;
    this.pointer = trianglePointer;

    let newHue = 360 * (rNumber / count);
    this.hue = newHue;
  };

  copy = () => {
    let newColoredTriangle;
    let newRNumber = this.hue / (360 / count);
    
    newColoredTriangle = new VarColoredTriangle(
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      this.bx1,
      this.by1,
      this.bx2,
      this.by2,
      this.rx,
      this.ry,
      newRNumber,
      this.pointer.copy(),
    );

    return newColoredTriangle;
  }

  show = (colorType) => {
    // set RGB color mode
    globalP.colorMode(globalP.RGB);

    globalP.fill(backgroundColor);
    globalP.triangle(this.ox, this.oy, this.bx1, this.by1, this.bx2, this.by2);

    // reset to HSB color mode
    globalP.colorMode(globalP.HSB);

    if (colorType === 'accent') {
      this.pointer.show();
      globalP.fill(this.hue, 100, 100);
    } else if (colorType === 'original') {
      globalP.fill(this.hue, 100, 100);
    } else {
      this.pointer.hide();
      globalP.fill(this.hue, 100, 100);
    }
    globalP.triangle(this.ox, this.oy, this.x1, this.y1, this.x2, this.y2);
    
    return this;
  };

  setMag = () => {
    this.mag = globalP.map(globalP.dist(this.bx1, this.by1, this.rx, this.ry), 0, (windowHeight * (4 / 9)) * 2, 1, 0);
    this.x1 = this.ox + ((this.bx1 - this.ox) * this.mag);
    this.y1 = this.oy + ((this.by1 - this.oy) * this.mag);
    this.x2 = this.ox + ((this.bx2 - this.ox) * this.mag);
    this.y2 = this.oy + ((this.by2 - this.oy) * this.mag);
  }

  getValue = () => this.hue;
}

