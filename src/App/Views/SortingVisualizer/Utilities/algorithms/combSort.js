import { elements } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const combSort = () => {
  let gap = elements.length;
  let shrinkFactor = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < elements.length; i++) {
      if (elements[i].getValue() > elements[i + gap].getValue()) {
        pushNewState([i, i + gap]);
        swap(elements, i, i + gap);
        sorted = false;
      }
      pushNewState([i, i + gap]);
    }
  }
  pushLastState();
};
