import { elements, arr } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

const partitionDual = (start, end) => {
  if (elements[start].getValue() > elements[end].getValue()) {
    pushNewState([start, end]);
    swap(elements, start, end);
    pushNewState([start, end]);
  }

  const leftValue = elements[start].getValue(),
    rightValue = elements[end].getValue();
  let [leftIdx, middleIdx, rightIdx] = [start + 1, start + 1, end - 1];

  while (middleIdx <= rightIdx) {
    if (elements[middleIdx].getValue() < leftValue) {
      pushNewState([leftIdx, middleIdx]);
      swap(elements, leftIdx, middleIdx);
      pushNewState([leftIdx, middleIdx]);
      leftIdx++;
    } else if (elements[middleIdx].getValue() >= rightValue) {
      while (elements[rightIdx].getValue() > rightValue && middleIdx < rightIdx) {
        rightIdx--;
      }
      pushNewState([middleIdx, rightIdx]);
      swap(elements, middleIdx, rightIdx);
      pushNewState([middleIdx, rightIdx]);
      rightIdx--;
      if (elements[middleIdx].getValue() < leftValue) {
        pushNewState([leftIdx, middleIdx]);
        swap(elements, leftIdx, middleIdx);
        pushNewState([leftIdx, middleIdx]);
        leftIdx++;
      }
    }
    middleIdx++;
  }
  leftIdx--;
  rightIdx++;
  pushNewState([leftIdx, start]);
  pushNewState([rightIdx, end]);
  swap(elements, leftIdx, start);
  swap(elements, rightIdx, end);
  pushNewState([leftIdx, start]);
  pushNewState([rightIdx, end]);
  return [leftIdx, rightIdx];
};

const quickSortDualPivotHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const [leftIdx, rightIdx] = partitionDual(start, end);

  quickSortDualPivotHelper(start, leftIdx - 1);
  quickSortDualPivotHelper(leftIdx + 1, rightIdx - 1);
  quickSortDualPivotHelper(rightIdx + 1, end);
};

export const quickSortDualPivot = () => {
  quickSortDualPivotHelper();
  pushLastState();
};