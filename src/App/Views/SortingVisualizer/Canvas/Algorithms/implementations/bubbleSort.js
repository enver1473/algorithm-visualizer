import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const bubbleSort = () => {
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count - i - 1; j++) {
      if (elements[j].getValue() > elements[j + 1].getValue()) {
        pushNewState([j, j + 1]);
        swap(elements, j, j + 1);
        pushNewState([j, j + 1]);
      }
    }
  }
  pushLastState();
};