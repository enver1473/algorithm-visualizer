import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const iterativePairwiseNetwork = () => {
  let a = 1;
  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;

  while (a < count) {
    b = a;
    c = 0;
    while (b < count) {
      pushNewState([b, b - a]);
      if (elements[b - a].getValue() > elements[b].getValue()) {
        swap(elements, b - a, b);
      }
      pushNewState([b, b - a]);
      c = (c + 1) % a;
      b++;
      if (c === 0) {
        b += a;
      }
    }
    a *= 2;
  }
  a = Math.floor(a / 4);
  e = 1;

  while (a > 0) {
    d = e;
    while (d > 0) {
      b = (d + 1) * a;
      c = 0;
      while (b < count) {
        pushNewState([b, b - d * a]);
        if (elements[b - d * a].getValue() > elements[b].getValue()) {
          swap(elements, b - d * a, b);
        }
        pushNewState([b, b - d * a]);
        c = (c + 1) % a;
        b++;
        if (c === 0) {
          b += a;
        }
      }
      d = Math.floor(d / 2);
    }
    a = Math.floor(a / 2);
    e = e * 2 + 1;
  }

  pushLastState();
};
