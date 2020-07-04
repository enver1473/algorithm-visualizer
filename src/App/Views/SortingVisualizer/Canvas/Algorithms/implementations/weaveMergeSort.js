import { insertionSortHelper } from './insertionSort';
import { elements, count } from '../../Canvas';
import {
  pushNewState,
  pushLastState,
  swap,
} from '../helperFunctions';

export const weaveMergeSort = (start = 0, end = count - 1) => {
  weaveMergeSortHelper(start, end);
  pushLastState();
};

const weaveMergeSortHelper = (start, end) => {
  if (end - start === 0) {
    return;
  }

  if (end - start === 1) {
    if (elements[start].getValue() < elements[end].getValue()) {
      pushNewState([start, end]);
      swap(elements, start, end);
      pushNewState([start, end]);
    }
    return;
  }

  let mid = Math.floor((start + end) / 2);

  weaveMergeSortHelper(start, mid);
  weaveMergeSortHelper(mid + 1, end);

  let i = 1;
  let target = mid - start;

  while (i <= target) {
    let pos = mid + i;
    let to = start + i * 2 - 1;

    for (let i = pos; i > to; i--) {
      pushNewState([i, i - 1]);
      swap(elements, i, i - 1);
      pushNewState([i, i - 1]);
    }
    i++;
  }

  insertionSortHelper(start + 1, end + 1);
};
