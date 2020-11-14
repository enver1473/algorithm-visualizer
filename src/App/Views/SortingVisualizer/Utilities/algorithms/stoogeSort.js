import { elements, count } from '../../Canvas';
import { swap, pushNewState, pushLastState } from '../helperFunctions';

export const stoogeSortHelper = (start, end) => {
  if (start >= end) return;

  if (elements[start].getValue() > elements[end].getValue()) {
    pushNewState([start, end]);
    swap(elements, start, end);
    pushNewState([start, end]);
  }
  if (end - start + 1 > 2) {
    const third = Math.floor((end - start + 1) / 3);
  
    stoogeSortHelper(start, end - third);
    stoogeSortHelper(start + third, end);
    stoogeSortHelper(start, end - third);
  }
};

export const stoogeSort = () => {
  stoogeSortHelper(0, count - 1);
  pushLastState();
};