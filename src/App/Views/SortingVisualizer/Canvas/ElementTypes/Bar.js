import { globalP, backgroundColor, height as windowHeight, primaryColor, accentColor } from '../Canvas';

export default class Bar {
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
    return new Bar(this.x, this.y, this.width, this.height, this.color);
  };

  show = (colorType) => {
    let color = primaryColor;
    if (colorType === 'accent') {
      color = accentColor;
    }
    globalP.fill(backgroundColor);
    globalP.rect(this.x, 0, this.width, windowHeight);

    globalP.fill(color);
    globalP.rect(this.x, this.y, this.width, this.height);

    globalP.fill(primaryColor);

    return this;
  };

  getValue = () => this.height;
}
