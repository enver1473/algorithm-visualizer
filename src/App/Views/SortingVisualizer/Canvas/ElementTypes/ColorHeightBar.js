import { globalP, backgroundColor, height as windowHeight } from '../Canvas';

export default class ColorHeightBar {
  x;
  y;
  width;
  height;
  hue;

  constructor(x, y, width, height, rNumber) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    let newHue = globalP.map(rNumber, 1, windowHeight, 0, 360);
    this.hue = newHue;
  };

  copy = () => {
    let newColoredBar;
    let newRNumber = globalP.map(this.hue, 0, 360, 1, windowHeight);

    newColoredBar = new ColorHeightBar(
      this.x,
      this.y,
      this.width,
      this.height,
      newRNumber,
    );

    return newColoredBar;
  }

  show = (color) => {
    globalP.fill(0, 0, (backgroundColor / 255) * 100);
    globalP.rect(this.x, 0, this.width, windowHeight);

    if (color === 'red') {
      if (this.hue >= 0 && this.hue <= 40) {
        globalP.fill(0, 0, 0);
      } else {
        globalP.fill(0, 100, 0);
      }
    } else {
      globalP.fill(this.hue, 100, 100);
    }
    globalP.rect(this.x, this.y, this.width, this.height);
    
    return this;
  };

  getValue = () => this.hue;
}

