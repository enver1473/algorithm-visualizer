import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';

export const binaryInsertionSortHelper = (lo = 1, hi = count) => {
  let noInsertionsMade = true;
  for (let i = lo; i < hi; i++) {
    let start = lo - 1,
      end = i - 1,
      idx = i;

    let searchNeeded = true;

    pushNewState([i, end]);
    if (elements[i].getValue() >= elements[end].getValue()) {
      continue;
    }
    noInsertionsMade = false;

    pushNewState([i, start]);
    if (elements[i].getValue() < elements[start].getValue()) {
      idx = start;
      searchNeeded = false;
    }

    let num = elements[i].copy();
    let low = start;
    let high = end;

    while (low < high && searchNeeded) {
      let mid = low + parseInt((high - low) / 2);
      pushNewState([low, mid, high]);
      pushNewState([low, mid, high]);
      pushNewState([low, mid, high]);
  
      if (num.getValue() < elements[mid].getValue()) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    idx = low;

    let element = elements[i].copy();
    let k;
    for (k = i - 1; k >= idx; k--) {
      pushNewState([k + 1, k]);
      setValuesAtIndexes(k + 1, k);
      pushNewState([k + 1, k]);
    }
    pushNewState([k + 1, i]);
    setValuesAtIndex(k + 1, element);
    pushNewState([k + 1, i]);
  }
  return noInsertionsMade;
}

export const binaryInsertionSort = () => {
  binaryInsertionSortHelper();
  pushLastState();
};