import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';

export const binaryInsertionSortHelper = (lo = 1, hi = count) => {
  let noInsertionsMade = true;
  for (let i = lo; i < hi; i++) {
    const calcMid = (start, end) => Math.floor(start + (end - start) / 2);
    let start = lo - 1,
      end = i - 1,
      mid = calcMid(start, end),
      idx = i;

    let searchNeeded = true;

    if (elements[i].getValue() >= elements[end].getValue()) {
      continue;
    }
    noInsertionsMade = false;

    if (elements[i].getValue() < elements[start].getValue()) {
      idx = start;
      searchNeeded = false;
    }

    while (start <= end && searchNeeded) {
      if (elements[i].getValue() < elements[mid].getValue()) {
        pushNewState([mid]);
        pushNewState([mid]);
        pushNewState([mid]);
        if (end - start === 1) {
          if (
            elements[start].getValue() < elements[i].getValue() &&
            elements[i].getValue() < elements[end].getValue()
          ) {
            idx = end;
            break;
          }
        }
        end = mid;
        mid = calcMid(start, end);
      } else if (elements[i].getValue() > elements[mid].getValue()) {
        pushNewState([mid]);
        pushNewState([mid]);
        pushNewState([mid]);
        if (end - start === 1) {
          if (
            elements[start].getValue() < elements[i].getValue() &&
            elements[i].getValue() < elements[end].getValue()
          ) {
            idx = end;
            break;
          }
        }
        start = mid;
        mid = calcMid(start, end);
      } else {
        pushNewState([mid]);
        pushNewState([mid]);
        pushNewState([mid]);
        idx = mid;
        break;
      }
    }

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