import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, mergeAtIndexes } from '../helperFunctions';

export const bottomUpMergeSort = () => {
  // Iterate log(n) times through the block merging process until the final block size is in the interval [n / 2, n - 1]
  for (let b = 1; b < count; b <<= 1) {
    // this loop is purely for drawing to the canvas
    for (let k = 0; k < Math.ceil(count / b); k += 2) {
      let start = b * k; // First block starting index
      let mid = b * (k + 1); // Middle index between blocks
      let end = b * (k + 2); // Second block ending index

      let i = start;
      let j = mid;
      if (start >= count) {
        return;
      }

      while (i < count && i < mid && j < count && j < end) {
        if (elements[i].getValue() < elements[j].getValue()) {
          pushNewState([i, j]);
          pushNewState([i, j]);
          i++;
        } else {
          pushNewState([i, j]);
          pushNewState([i, j]);
          j++;
        }
      }

      while (i < count && i < mid) {
        pushNewState([i]);
        i++;
      }
      while (j < count && j < mid) {
        pushNewState([j]);
        j++;
      }
    }

    // Go through (count / b) blocks, skipping one block each iteration (because two are merged each iteration)
    for (let k = 0; k < Math.ceil(count / b); k += 2) {
      let newElements = [];

      let start = b * k; // First block starting index
      let mid = b * (k + 1); // Middle index between blocks
      let end = b * (k + 2); // Second block ending index

      let i = start;
      let j = mid;
      if (start >= count) {
        return;
      }

      while (i < count && i < mid && j < count && j < end) {
        if (elements[i].getValue() < elements[j].getValue()) {
          newElements.push(mergeAtIndexes(start + newElements.length, i));
          i++;
        } else {
          newElements.push(mergeAtIndexes(start + newElements.length, j));
          j++;
        }
      }

      while (i < count && i < mid) {
        newElements.push(mergeAtIndexes(start + newElements.length, i));
        i++;
      }
      while (j < count && j < mid) {
        newElements.push(mergeAtIndexes(start + newElements.length, j));
        j++;
      }

      for (let l = start; l < end; l++) {
        if (l >= count) break;
        if (l - start >= newElements.length) break;

        pushNewState([l]);
        elements[l] = newElements[l - start].copy();
        pushNewState([l]);
      }
    }
  }
  pushLastState();
};