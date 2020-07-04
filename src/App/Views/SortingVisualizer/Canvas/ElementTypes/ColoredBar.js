import { globalP, backgroundColor, height as windowHeight } from '../Canvas';

export default class ColoredBar {
  x;
  y;
  width;
  height;
  hue;

  constructor(x, width, rNumber) {
    this.x = x;
    this.y = 0;
    this.width = width;
    this.height = windowHeight;

    let newHue = globalP.map(rNumber, 1, windowHeight, 0, 360);
    this.hue = newHue;
  };

  copy = () => {
    let newColoredBar;
    let newRNumber = globalP.map(this.hue, 0, 360, 1, windowHeight);

    newColoredBar = new ColoredBar(
      this.x,
      this.width,
      newRNumber,
    );

    return newColoredBar;
  }

  show = (colorType) => {
    globalP.fill(0, 0, globalP.map(backgroundColor, 0, 255, 0, 100));
    globalP.rect(this.x, 0, this.width, windowHeight);

    if (colorType === 'accent') {
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

  getValue = () => Math.floor(this.hue);
}

