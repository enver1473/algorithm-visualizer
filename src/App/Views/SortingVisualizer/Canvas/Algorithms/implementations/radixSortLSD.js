import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, mergeAtIndexes, maxElement } from '../helperFunctions';

const countingSort = (exp, b) => {
  let counts = [];
  let output = [];

  for (let i = 0; i < count; i++) {
    output.push(null);
    if (i < b) {
      counts.push(0);
    }
  }

  for (let i = 0; i < count; i++) {
    counts[Math.floor(elements[i].getValue() / exp) % b] += 1;
  }

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }

  for (let i = count - 1; i >= 0; i--) {
    let outputIdx = counts[Math.floor(elements[i].getValue() / exp) % b] - 1;
    output[outputIdx] = mergeAtIndexes(outputIdx, i);
    counts[Math.floor(elements[i].getValue() / exp) % b] -= 1;
  }

  for (let i = 0; i < count; i++) {
    pushNewState([i]);
    elements[i] = output[i].copy();
    pushNewState([i]);
  }
};

export const radixSortLSD = (b) => {
  let maxE = maxElement();
  for (let e = 1; Math.floor(maxE / e) > 0; e *= b) {
    countingSort(e, b);
  }
  pushLastState();
};