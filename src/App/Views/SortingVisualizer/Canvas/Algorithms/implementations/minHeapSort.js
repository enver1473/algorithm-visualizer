import { elements, count } from '../../Canvas';
import { swap, pushNewState, pushLastState } from '../helperFunctions';

const heapify = (n, i) => {
  let min = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && elements[l].getValue() < elements[min].getValue()) {
    min = l;
  }

  if (r < n && elements[r].getValue() < elements[min].getValue()) {
    min = r;
  }

  if (min !== i) {
    pushNewState([i, min]);
    swap(elements, i, min);
    pushNewState([i, min]);

    heapify(n, min);
  }
};

export const minHeapSort = () => {
  for (let i = count / 2 - 1; i >= 0; i--) {
    heapify(count, i);
  }

  for (let i = count - 1; i > 0; i--) {
    pushNewState([0, i]);
    swap(elements, 0, i);
    pushNewState([0, i]);

    heapify(i, 0);
  }

  for (let i = 0; i < count / 2; i++) {
    pushNewState([i, count - i - 1]);
    swap(elements, i, count - i - 1);
    pushNewState([i, count - i - 1]);
  }
  pushLastState();
};
