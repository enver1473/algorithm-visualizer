import { elements, count } from '../../Canvas';
import { swap, pushNewState, pushLastState } from '../helperFunctions';

const heapify = (start, end, n, i) => {
  let max = i;
  let l = start + 2 * (i - start) + 1;
  let r = start + 2 * (i - start) + 2;

  if (l < n && elements[l].getValue() > elements[max].getValue()) {
    max = l;
  }

  if (r < n && elements[r].getValue() > elements[max].getValue()) {
    max = r;
  }

  if (max !== i) {
    pushNewState([i, max]);
    swap(elements, i, max);
    pushNewState([i, max]);

    heapify(start, end, n, max);
  }
};

export const maxHeapSortHelper = (start = 0, end = count) => {
  for (let i = parseInt(start + (end - start) / 2) - 1; i >= start; i--) {
    heapify(start, end, end, i);
  }

  for (let i = end - 1; i > start; i--) {
    pushNewState([start, i]);
    swap(elements, start, i);
    pushNewState([start, i]);

    heapify(start, end, i, start);
  }
};

export const maxHeapSort = () => {
  maxHeapSortHelper();
  pushLastState();
}
