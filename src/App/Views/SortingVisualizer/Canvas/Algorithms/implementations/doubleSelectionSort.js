import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const doubleSelectionSort = () => {
  let i = 0,
    j = count - 1;
  while (i < j) {
    let minIdx = i;
    let min = elements[i].getValue();
    let maxIdx = i;
    let max = elements[i].getValue();

    for (let k = i; k <= j; k++) {
      pushNewState([i, j, k]);
      if (elements[k].getValue() < min) {
        minIdx = k;
        min = elements[k].getValue();
      } else if (elements[k].getValue() > max) {
        maxIdx = k;
        max = elements[k].getValue();
      }
      pushNewState([i, j, k]);
    }
    pushNewState([i, minIdx]);
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);

    if (elements[minIdx].getValue() === max) {
      pushNewState([j, minIdx]);
      swap(elements, j, minIdx);
      pushNewState([j, minIdx]);
    } else {
      pushNewState([j, maxIdx]);
      swap(elements, j, maxIdx);
      pushNewState([j, maxIdx]);
    }
    i++;
    j--;
  }
  pushLastState();
};