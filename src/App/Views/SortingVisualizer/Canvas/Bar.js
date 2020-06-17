import { globalP } from './Canvas';

export default class Bar {
  x;
  y;
  width = 5;
  height = 100;
  color;

  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  show = () => {
    globalP.fill(this.color);
    globalP.rect(this.x, this.y, this.width, this.height);
    globalP.fill(255);
    
    return this;
  };

  getHeight = () => this.height;

  getWidth = () => this.width;
}

