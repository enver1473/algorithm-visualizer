import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState } from '../helperFunctions';

export const proxmapSort = () => {
  let start = 0;
  let end = count;
  let A2 = new Array(end);
  let MapKey = new Array(end);
  let hitCount = new Array(end);

  for (let i = start; i < end; i++) {
    hitCount[i] = 0;
  }

  let minIdx = start;
  let maxIdx = start;
  let min = elements[start].getValue();
  let max = elements[start].getValue();

  for (let i = start + 1; i < end; i++) {
    if (elements[i] < min) {
      min = elements[i].getValue();
      minIdx = i;
    } else {
      if (elements[i].getValue() > max) {
        max = elements[i].getValue();
        maxIdx = i;
      }
    }
    pushNewState([maxIdx, minIdx, i]);
  }

  // Optimization 1.Save the MapKey[i].
  for (let i = start; i < end; i++) {
    MapKey[i] = Math.floor(((elements[i].getValue() - min) / (max - min)) * (end - 1));
    hitCount[MapKey[i]]++;
    pushNewState([i]);
  }

  // Optimization 2.ProxMaps store in the hitCount.
  hitCount[end - 1] = end - hitCount[end - 1];
  for (let i = end - 1; i > start; i--) {
    hitCount[i - 1] = hitCount[i] - hitCount[i - 1];
  }

  // insert A[i]=elements[i] to A2 correct position
  let insertIndex = 0;
  let insertStart = 0;

  for (let i = start; i < end; i++) {
    insertIndex = hitCount[MapKey[i]];
    insertStart = insertIndex;
    while (A2[insertIndex] != null) {
      insertIndex++;
    }
    while (insertStart < insertIndex && elements[i].getValue() < A2[insertIndex - 1].getValue()) {
      pushNewState([insertIndex, insertIndex - 1]);
      A2[insertIndex] = A2[insertIndex - 1].copy();
      pushNewState([insertIndex, insertIndex - 1]);
      insertIndex--;
    }
    pushNewState([insertIndex, i]);
    A2[insertIndex] = elements[i].copy();
    pushNewState([insertIndex, i]);
  }

  for (let i = start; i < end; i++) {
    pushNewState([i]);
    elements[i] = A2[i].copy();
    pushNewState([i]);
  }
  
  pushLastState();
};
