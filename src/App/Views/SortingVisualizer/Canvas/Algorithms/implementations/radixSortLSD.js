import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, mergeAtIndexes, maxElement } from '../helperFunctions';

const countingSort = (exp, b) => {
  let counts = [];
  let output = [];

  for (let i = 0; i < count; i++) {
    output.push(null);
  }

  for (let i = 0; i < b; i++) {
    counts.push(0);
  }

  for (let i = 0; i < count; i++) {
    counts[Math.floor(elements[i].getValue() / exp) % b] += 1;
    pushNewState([i]);
  }

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }

  for (let i = count - 1; i >= 0; i--) {
    let outputIdx = counts[Math.floor(elements[i].getValue() / exp) % b] - 1;
    output[outputIdx] = mergeAtIndexes(outputIdx, i);
    counts[Math.floor(elements[i].getValue() / exp) % b] -= 1;
  }

  if (count > 10) {
    let n = Math.floor(count / 4);
    for (let i = 0; i < n; i++) {
      pushNewState([i, i + n, i + 2 * n, i + 3 * n]);
      pushNewState([i, i + n, i + 2 * n, i + 3 * n]);
      elements[0 * n + i] = output[0 * n + i].copy();
      elements[1 * n + i] = output[1 * n + i].copy();
      elements[2 * n + i] = output[2 * n + i].copy();
      elements[3 * n + i] = output[3 * n + i].copy();
      pushNewState([i, i + n, i + 2 * n, i + 3 * n]);
      pushNewState([i, i + n, i + 2 * n, i + 3 * n]);
    }
  
    for (let i = n * 4; i < count; i++) {
      pushNewState([i]);
      elements[i] = output[i].copy();
      pushNewState([i]);
    }
  } else {
    for (let i = 0; i < count; i++) {
      pushNewState([i]);
      elements[i] = output[i].copy();
      pushNewState([i]);
    }
  }
};

export const radixSortLSD = (b) => {
  let maxE = maxElement();
  for (let e = 1; Math.floor(maxE / e) > 0; e *= b) {
    countingSort(e, b);
  }
  pushLastState();
};