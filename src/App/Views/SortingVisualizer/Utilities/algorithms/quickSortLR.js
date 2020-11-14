import { elements, arr } from '../../Canvas';
import { pushNewState, pushLastState, swap, midValue } from '../helperFunctions';

export const partitionLR = (start, end) => {
  if (end - start > 4) {
    let middleIdx = midValue(start, parseInt(start + (end - start) / 2), end);
    if (middleIdx !== end) {
      pushNewState([middleIdx, end]);
      swap(elements, middleIdx, end);
      pushNewState([middleIdx, end]);
    }
  }

  const pivotValue = elements[end].getValue();
  let leftIdx = start;
  let rightIdx = end - 1;
  while (leftIdx <= rightIdx) {
    if (elements[leftIdx].getValue() > pivotValue && elements[rightIdx].getValue() < pivotValue) {
      pushNewState([leftIdx, rightIdx]);
      swap(elements, leftIdx, rightIdx);
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else if (
      elements[leftIdx].getValue() <= pivotValue &&
      elements[rightIdx].getValue() < pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
    } else if (
      elements[leftIdx].getValue() > pivotValue &&
      elements[rightIdx].getValue() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      rightIdx--;
    } else if (
      elements[leftIdx].getValue() <= pivotValue &&
      elements[rightIdx].getValue() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else {
      pushNewState([leftIdx, rightIdx]);
    }
  }

  pushNewState([leftIdx, end]);
  swap(elements, leftIdx, end);
  pushNewState([leftIdx, end]);
  return leftIdx;
};

const quickSortLRHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLR(start, end);

  quickSortLRHelper(start, pivotIdx - 1);
  quickSortLRHelper(pivotIdx + 1, end);
};

export const quickSortLR = () => {
  quickSortLRHelper();
  pushLastState();
};