import { globalP, backgroundColor, height as windowHeight } from '../Canvas';

export default class ColorHeightBar {
  constructor(x, y, width, height, rNumber, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.index = index;
    
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
      this.index,
    );

    return newColoredBar;
  }

  show = (colorType) => {
    globalP.fill(0, 0, (backgroundColor / 255) * 100);
    globalP.rect(this.x, 0, this.width, windowHeight);

    if (colorType === 'accent') {
      if (
        (this.hue >= 45 && this.hue <= 195) ||
        (this.hue >= 285)
      ) {
        globalP.fill(0, 0, 0);
      } else {
        globalP.fill(0, 0, 100);
      }
    } else {
      globalP.fill(this.hue, 100, 100);
    }
    globalP.rect(this.x, this.y, this.width, this.height);
    
    return this;
  };

  getValue = () => this.height;
}

