import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const gnomeSort = () => {
  let currentIdx = 0;
  while (true) {
    if (currentIdx === count - 1) break;
    if (
      currentIdx < count - 1 &&
      elements[currentIdx].getValue() > elements[currentIdx + 1].getValue()
    ) {
      let continueIdx = currentIdx;
      while (
        currentIdx >= 0 &&
        elements[currentIdx].getValue() > elements[currentIdx + 1].getValue()
      ) {
        pushNewState([currentIdx, currentIdx + 1]);
        swap(elements, currentIdx, currentIdx + 1);
        pushNewState([currentIdx, currentIdx + 1]);
        currentIdx--;
      }
      currentIdx = continueIdx;
    } else {
      currentIdx++;
    }
  }
  pushLastState();
};