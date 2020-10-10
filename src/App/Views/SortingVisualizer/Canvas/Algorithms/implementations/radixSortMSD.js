import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, mergeAtIndexes, maxElement } from '../helperFunctions';

const countingSort = (exp, b, start = 0, end = count) => {
  if (exp === 0) return;

  let counts = [];
  let output = [];

  for (let i = 0; i < end - start; i++) {
    output.push(null);
  }

  for (let i = 0; i < b; i++) {
    counts.push(0);
  }

  for (let i = start; i < end; i++) {
    counts[Math.floor(elements[i].getValue() / exp) % b] += 1;
  }

  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }

  const starts = [0, ...counts];

  for (let i = end - 1; i >= start; i--) {
    let outputIdx = counts[Math.floor(elements[i].getValue() / exp) % b] - 1;
    output[outputIdx] = mergeAtIndexes(start + outputIdx, i);
    counts[Math.floor(elements[i].getValue() / exp) % b] -= 1;
  }

  //

  for (let i = 0; i < end - start; i++) {
    pushNewState([start + i]);
    elements[start + i] = output[i].copy();
    pushNewState([start + i]);
    pushNewState([start + i]);
    pushNewState([start + i]);
  }

  //

  for (let i = 1; i < starts.length; i++) {
    if (starts[i] - starts[i - 1] <= 1) continue;
    countingSort(Math.floor(exp / b), b, start + starts[i - 1], start + starts[i]);
  }
};

export const radixSortMSD = (b = 4) => {
  let maxE = maxElement();
  let e = 1;
  for (; Math.floor(maxE / e) > 1; e *= b);
  countingSort(e, b);
  pushLastState();
};
