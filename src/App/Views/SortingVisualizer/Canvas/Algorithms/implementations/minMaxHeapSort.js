import { elements, count } from '../../Canvas';
import { swap, pushNewState, pushLastState } from '../helperFunctions';


let swaps = 0;
let comparisons = 0;

const parent = (idx) => Math.ceil(idx / 2) - 1;

const leftChild = (idx) => idx * 2 + 1;
const rightChild = (idx) => idx * 2 + 2;

const llGrandChild = (idx) => idx * 4 + 3;
const lrGrandChild = (idx) => idx * 4 + 4;
const rlGrandChild = (idx) => idx * 4 + 5;
const rrGrandChild = (idx) => idx * 4 + 6;

const level = (idx) => Math.floor(Math.log2(idx + 1)) % 2 === 0;

const downHeap = (n, idx) => {
  if (level(idx)) {
    downHeapMax(n, idx);
  } else {
    downHeapMin(n, idx);
  }
};

const downHeapMin = (n, idx) => {
  if (level(idx)) {
    downHeapMax(n, idx);
    return;
  }
  let minIdx = n - 1;
  if (leftChild(idx) >= n) return;
  if (rightChild(idx) >= n) {
    minIdx = leftChild(idx);
  } else {
    minIdx = elements[leftChild(idx)].getValue() < elements[rightChild(idx)].getValue() ? leftChild(idx) : rightChild(idx);
    comparisons++;
  }

  if (llGrandChild(idx) < n) {
    if (elements[llGrandChild(idx)].getValue() < elements[minIdx].getValue()) {
      minIdx = llGrandChild(idx);
      comparisons++;
    }
  }
  if (lrGrandChild(idx) < n) {
    if (elements[lrGrandChild(idx)].getValue() < elements[minIdx].getValue()) {
      minIdx = lrGrandChild(idx);
      comparisons++;
    }
  }
  if (rlGrandChild(idx) < n) {
    if (elements[rlGrandChild(idx)].getValue() < elements[minIdx].getValue()) {
      minIdx = rlGrandChild(idx);
      comparisons++;
    }
  }
  if (rrGrandChild(idx) < n) {
    if (elements[rrGrandChild(idx)].getValue() < elements[minIdx].getValue()) {
      minIdx = rrGrandChild(idx);
      comparisons++;
    }
  }

  // if elements[minIdx].getValue() is a grandchild
  if (minIdx >= llGrandChild(idx) && minIdx <= rrGrandChild(idx)) {
    if (elements[minIdx].getValue() < elements[idx].getValue()) {
      pushNewState([idx, minIdx]);
      swap(elements, idx, minIdx);
      pushNewState([idx, minIdx]);
      swaps++;
      comparisons++;

      if (elements[minIdx].getValue() > elements[parent(minIdx)].getValue()) {
        pushNewState([minIdx, parent(minIdx)]);
        swap(elements, minIdx, parent(minIdx));
        pushNewState([minIdx, parent(minIdx)]);
        swaps++;
        comparisons++;
      }
      downHeapMin(n, minIdx);
    }
    // else if elements[minIdx] is a child
  } else if (minIdx === leftChild(idx) || minIdx === rightChild(idx)) {
    if (elements[minIdx].getValue() < elements[idx].getValue()) {
      pushNewState([idx, minIdx]);
      swap(elements, idx, minIdx);
      pushNewState([idx, minIdx]);
      swaps++;
      comparisons++;

      downHeapMax(n, minIdx);
    }
  }
};

const downHeapMax = (n, idx) => {
  if (!level(idx)) {
    downHeapMax(n, idx);
    return;
  }
  let maxIdx = n - 1;
  if (leftChild(idx) >= n) return;
  if (rightChild(idx) >= n) {
    maxIdx = leftChild(idx);
  } else {
    maxIdx = elements[leftChild(idx)].getValue() > elements[rightChild(idx)].getValue() ? leftChild(idx) : rightChild(idx);
    comparisons++;
  }

  if (llGrandChild(idx) < n) {
    if (elements[llGrandChild(idx)].getValue() > elements[maxIdx].getValue()) {
      maxIdx = llGrandChild(idx);
      comparisons++;
    }
  }
  if (lrGrandChild(idx) < n) {
    if (elements[lrGrandChild(idx)].getValue() > elements[maxIdx].getValue()) {
      maxIdx = lrGrandChild(idx);
      comparisons++;
    }
  }
  if (rlGrandChild(idx) < n) {
    if (elements[rlGrandChild(idx)].getValue() > elements[maxIdx].getValue()) {
      maxIdx = rlGrandChild(idx);
      comparisons++;
    }
  }
  if (rrGrandChild(idx) < n) {
    if (elements[rrGrandChild(idx)].getValue() > elements[maxIdx].getValue()) {
      maxIdx = rrGrandChild(idx);
      comparisons++;
    }
  }

  // if elements[maxIdx] is a grandchild
  if (maxIdx >= llGrandChild(idx) && maxIdx <= rrGrandChild(idx)) {
    if (elements[maxIdx].getValue() > elements[idx].getValue()) {
      pushNewState([idx, maxIdx]);
      swap(elements, idx, maxIdx);
      pushNewState([idx, maxIdx]);
      swaps++;
      comparisons++;

      if (elements[maxIdx].getValue() < elements[parent(maxIdx)].getValue()) {
        pushNewState([maxIdx, parent(maxIdx)]);
        swap(elements, maxIdx, parent(maxIdx));
        pushNewState([maxIdx, parent(maxIdx)]);
        swaps++;
        comparisons++;
      }
      downHeapMax(n, maxIdx);
    }
    // else if elements[maxIdx] is a child
  } else if (maxIdx === leftChild(idx) || maxIdx === rightChild(idx)) {
    if (elements[maxIdx].getValue() > elements[idx].getValue()) {
      pushNewState([idx, maxIdx]);
      swap(elements, idx, maxIdx);
      pushNewState([idx, maxIdx]);
      swaps++;
      comparisons++;
      
      downHeapMin(n, maxIdx);
    }
  }
};

export const minMaxHeapSort = () => {
  swaps = 0;
  comparisons = 0;
  for (let i = parent(count - 1); i >= 0; i--) {
    downHeap(count, i);
  }

  for (let i = count - 1; i > 0; i--) {
    pushNewState([0, i]);
    swap(elements, 0, i);
    pushNewState([0, i]);
    swaps++;

    downHeap(i, 0);
  }
  console.log(`MIN-MAX HEAP SORT:`);
  console.log(`   SWAPS: ${swaps}`);
  console.log(`   COMPARISONS: ${comparisons}`);

  pushLastState();
};
