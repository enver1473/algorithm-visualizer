import { globalP, backgroundColor, height as windowHeight } from '../Canvas';

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

  show = (newColor) => {
    let color = this.color;
    if (newColor !== 'red' && newColor !== 'lastShow') {
      color = newColor ? newColor : this.color;
    }

    globalP.fill(backgroundColor);
    globalP.rect(this.x, 0, this.width, windowHeight);

    if (color === '#ff0000') {
      globalP.fill(color);
      globalP.rect(this.x, 0, this.width, windowHeight);
      globalP.fill('#F8EFBA');
      globalP.rect(this.x, this.y, this.width, this.height);
    } else {
      globalP.fill(color);
      globalP.rect(this.x, this.y, this.width, this.height);
    }

    globalP.fill('#F8EFBA');

    return this;
  };

  getValue = () => windowHeight - this.y;
}
