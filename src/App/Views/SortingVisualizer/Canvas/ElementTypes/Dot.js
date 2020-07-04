import { globalP, backgroundColor, height as windowHeight, primaryColor, accentColor } from '../Canvas';

export default class Dot {
  x;
  y;
  width;
  height;
  color;

  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  copy = () => {
    return new Dot(this.x, this.y, this.width, this.height, this.color);
  };

  show = (colorType) => {

    globalP.fill(backgroundColor);
    globalP.rect(this.x, 0, this.width, windowHeight);

    if (colorType === 'accent') {
      globalP.fill(accentColor);
      globalP.rect(this.x, 0, this.width, windowHeight);
      globalP.fill(primaryColor);
      globalP.rect(this.x, this.y, this.width, this.height);
    } else if (colorType === 'original') {
      globalP.fill(primaryColor);
      globalP.rect(this.x, this.y, this.width, this.height);
    } else {
      globalP.fill(this.color);
      globalP.rect(this.x, this.y, this.width, this.height);
    }

    globalP.fill(primaryColor);

    return this;
  };

  getValue = () => windowHeight - this.y;
}
