import { count, elements } from '../../Canvas';
import { pushLastState, pushNewState } from '../helperFunctions';
import { rotate } from './advancedRoomSort';

const lazyMerge = (start, middle, end) => {
  let left = middle - 1;
  let right = end - 1;
  let blockLen;

  while (left >= start && right >= start) {
    blockLen = 0;

    while (left >= start && right >= start && elements[left].getValue() > elements[right].getValue()) {
      pushNewState([left, right]);
      blockLen++;
      left--;
    }

    rotate(left + 1, right + 1, blockLen);
    right -= Math.max(1, blockLen);
  }
};

// NISTA NE RADI KAKO TREBA --- MONKAMEGA

export const lazyMergeSortHelper = (start, end) => {
  if (start === end || start + 1 === end) return;

  let middle = Math.floor(start + (end - start) / 2);

  lazyMergeSortHelper(start, middle);
  lazyMergeSortHelper(middle, end);
  lazyMerge(start, middle, end);
};

export const lazyMergeSort = () => {
  lazyMergeSortHelper(0, count);
  pushLastState();
};
