import { elements, count } from '../../Canvas';
import { swap, pushNewState, pushLastState } from '../helperFunctions';

let swaps = 0;
let comparisons = 0;

const heapify = (n, i) => {
  let max = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && elements[l].getValue() > elements[max].getValue()) {
    max = l;
    comparisons++;
  }

  if (r < n && elements[r].getValue() > elements[max].getValue()) {
    max = r;
    comparisons++;
  }

  if (max !== i) {
    pushNewState([i, max]);
    swap(elements, i, max);
    pushNewState([i, max]);
    swaps++;

    heapify(n, max);
  }
};

export const maxHeapSort = () => {
  swaps = 0;
  comparisons = 0;
  for (let i = count / 2 - 1; i >= 0; i--) {
    heapify(count, i);
  }

  for (let i = count - 1; i > 0; i--) {
    pushNewState([0, i]);
    swap(elements, 0, i);
    pushNewState([0, i]);
    swaps++;

    heapify(i, 0);
  }

  pushLastState();
};
