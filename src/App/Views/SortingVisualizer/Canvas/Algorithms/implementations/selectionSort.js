import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const selectionSort = () => {
  for (let i = 0; i < count - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < count; j++) {
      pushNewState([i, j]);
      if (elements[j].getValue() < elements[minIdx].getValue()) {
        minIdx = j;
      }
      pushNewState([i, j]);
    }
    pushNewState([i, minIdx]);
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);
  }
  pushLastState();
};