import { elements, arr } from '../../Canvas';
import { pushNewState, pushLastState, swap, midValue } from '../helperFunctions';

const partitionLL = (start, end) => {
  if (end - start > 4) {
    let middleIdx = midValue(start, parseInt(start + (end - start) / 2), end);
    if (middleIdx !== end) {
      pushNewState([middleIdx, end]);
      swap(elements, middleIdx, end);
      pushNewState([middleIdx, end]);
    }
  }

  let pivotValue = elements[end].getValue();
  let pivotIdx = start;

  for (let i = start; i < end; i++) {
    if (elements[i].getValue() < pivotValue) {
      pushNewState([i, pivotIdx]);
      swap(elements, i, pivotIdx);
      pushNewState([i, pivotIdx]);
      pivotIdx++;
    } else {
      pushNewState([i, pivotIdx]);
    }
  }

  pushNewState([pivotIdx, end]);
  swap(elements, pivotIdx, end);
  pushNewState([pivotIdx, end]);

  return pivotIdx;
};

const quickSortLLHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLL(start, end);

  quickSortLLHelper(start, pivotIdx - 1);
  quickSortLLHelper(pivotIdx + 1, end);
};

export const quickSortLL = () => {
  quickSortLLHelper();
  pushLastState();
};