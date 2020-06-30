import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';

const mergeSortInPlaceHelper = (start, end) => {
  if (start >= end) return;

  let mid = start + Math.floor((end - start) / 2);
  mergeSortInPlaceHelper(start, mid);
  mergeSortInPlaceHelper(mid + 1, end);

  let start2 = mid + 1;

  if (elements[mid].getValue() <= elements[start2].getValue()) {
    return;
  }

  while (start <= mid && start2 <= end) {
    if (elements[start].getValue() <= elements[start2].getValue()) {
      start++;
    } else {
      let temp = elements[start2].copy();
      let index = start2;

      while (index !== start) {
        pushNewState([index, index - 1]);
        setValuesAtIndexes(index, index - 1);
        pushNewState([index, index - 1]);
        index--;
      }
      pushNewState([start, start2]);
      setValuesAtIndex(start, temp);
      pushNewState([start, start2]);

      start++;
      mid++;
      start2++;
    }
  }
};

export const mergeSortInPlace = (start = 0, end = count - 1) => {
  mergeSortInPlaceHelper(start, end);
  pushLastState();
};