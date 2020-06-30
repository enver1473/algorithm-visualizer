import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, mergeAtIndexes } from '../helperFunctions';

const mergeSortHelper = (start, end) => {
  if (start === end || start + 1 === end) return;

  let mid = start + Math.floor((end - start) / 2);
  mergeSortHelper(start, mid);
  mergeSortHelper(mid, end);

  let i = start;
  let j = mid;
  let list = [];

  while (i < mid && j < end) {
    if (elements[i].getValue() < elements[j].getValue()) {
      list.push(mergeAtIndexes(start + list.length, i));
      i++;
    } else {
      list.push(mergeAtIndexes(start + list.length, j));
      j++;
    }
  }
  while (i < mid) {
    list.push(mergeAtIndexes(start + list.length, i));
    i++;
  }
  while (j < end) {
    list.push(mergeAtIndexes(start + list.length, j));
    j++;
  }

  for (let l = 0; l < mid - start; l++) {
    pushNewState([start + l, mid + l]);
    pushNewState([start + l, mid + l]);
  }

  for (let l = start; l < end; l++) {
    pushNewState([l]);
    elements[l] = list[l - start].copy();
    pushNewState([l]);
  }
};

export const mergeSort = (start = 0, end = count) => {
  mergeSortHelper(start, end);
  pushLastState();
};