import { globalP, backgroundColor, height as windowHeight} from '../Canvas';

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
  };

  show = (newColor) => {
    const color = newColor ? newColor : this.color;
    globalP.fill(backgroundColor);
    globalP.rect(this.x, 0, this.width, windowHeight);

    globalP.fill(color);
    globalP.rect(this.x, this.y, this.width, this.height);

    globalP.fill(255);
    
    return this;
  };

  getValue = () => windowHeight - this.y;
}