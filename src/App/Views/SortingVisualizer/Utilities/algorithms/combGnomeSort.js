import { elements, count } from '../../Canvas';
import { pushNewState, swap } from '../helperFunctions';
import { gnomeSort } from './gnomeSort';

export const combGnomeSort = () => {
  let gap = elements.length;
  let shrinkFactor = 1.3;
  let sorted = false;
  let boundary = Math.floor(count / 90) + 1;

  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap <= boundary) {
      break;
    }

    for (let i = 0; i + gap < elements.length; i++) {
      if (elements[i].getValue() > elements[i + gap].getValue()) {
        pushNewState([i, i + gap]);
        swap(elements, i, i + gap);
      }
      pushNewState([i, i + gap]);
    }
  }
  gnomeSort();
};