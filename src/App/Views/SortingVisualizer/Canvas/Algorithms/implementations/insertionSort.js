import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';

export const insertionSort = () => {
  for (let i = 1; i < count; i++) {
    let element = elements[i].copy();
    let j = i - 1;
    while (j >= 0 && element.getValue() < elements[j].getValue()) {
      pushNewState([j + 1, j]);
      setValuesAtIndexes(j + 1, j);
      pushNewState([j + 1, j]);
      j--;
    }
    pushNewState([j + 1, i]);
    setValuesAtIndex(j + 1, element);
    pushNewState([j + 1, i]);
  }
  pushLastState();
};