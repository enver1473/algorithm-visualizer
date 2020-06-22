import { states, elements, count, arr, vMethod } from '../Canvas';
import Bar from '../Bar';

// ======  BUBBLE SORT ======

export const bubbleSort = () => {
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count - i - 1; j++) {
      if (elements[j].getHeight() > elements[j + 1].getHeight()) {
        swap(elements, j, j + 1);
        pushNewState([j, j + 1]);
      }
    }
  }
  pushLastState();
};

// ======  BUBBLE SORT ======

// ======  COCTAIL SHAKER SORT ======

export const coctailShakerSort = () => {
  let forward = 0,
    backward = 0;
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      for (let j = backward; j < count - forward - 1; j++) {
        if (elements[j].getHeight() > elements[j + 1].getHeight()) {
          swap(elements, j, j + 1);
          pushNewState([j, j + 1]);
        }
      }
      forward++;
    } else {
      for (let j = count - forward - 1; j >= backward + 1; j--) {
        if (elements[j].getHeight() < elements[j - 1].getHeight()) {
          swap(elements, j, j - 1);
          pushNewState([j, j - 1]);
        }
      }
      backward++;
    }
  }

  pushLastState();
};

// ======  COCTAIL SHAKER SORT ======

// ======  QUICK SORT LL POINTERS ======

const partitionLL = (start, end) => {
  const pivotValue = elements[end].getHeight();
  let pivotIdx = start;

  for (let i = start; i < end; i++) {
    if (elements[i].getHeight() < pivotValue) {
      swap(elements, i, pivotIdx);
      pushNewState([i, pivotIdx]);
      pivotIdx++;
    } else {
      pushNewState([i, pivotIdx]);
    }
  }
  swap(elements, pivotIdx, end);
  pushNewState([pivotIdx, end]);
  return pivotIdx;
};

const quickSortLLHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLL(start, end);

  quickSortLLHelper(start, pivotIdx - 1);
  pushNewState([pivotIdx]);
  quickSortLLHelper(pivotIdx + 1, end);
};

export const quickSortLL = () => {
  quickSortLLHelper();
  pushLastState();
};

// ====== QUICK SORT LL ======

// ====== QUICK SORT LR ======

const partitionLR = (start, end) => {
  const pivotValue = elements[end].getHeight();
  let leftIdx = start;
  let rightIdx = end - 1;
  while (leftIdx <= rightIdx) {
    if (
      elements[leftIdx].getHeight() > pivotValue &&
      elements[rightIdx].getHeight() < pivotValue
    ) {
      swap(elements, leftIdx, rightIdx);
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else if (
      elements[leftIdx].getHeight() <= pivotValue &&
      elements[rightIdx].getHeight() < pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
    } else if (
      elements[leftIdx].getHeight() > pivotValue &&
      elements[rightIdx].getHeight() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      rightIdx--;
    } else if (
      elements[leftIdx].getHeight() <= pivotValue &&
      elements[rightIdx].getHeight() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else {
      pushNewState([leftIdx, rightIdx]);
    }
  }

  swap(elements, leftIdx, end);
  pushNewState([leftIdx, end]);
  return leftIdx;
};

const quickSortLRHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLR(start, end);

  quickSortLRHelper(start, pivotIdx - 1);
  pushNewState([pivotIdx]);
  quickSortLRHelper(pivotIdx + 1, end);
};

export const quickSortLR = () => {
  quickSortLRHelper();
  pushLastState();
};

// ====== QUICK SORT LR ======

// ====== QUICK SORT DUAL PIVOT ======

const partitionDual = (start, end) => {
  if (elements[start].getHeight() > elements[end].getHeight()) {
    swap(elements, start, end);
  }
  pushNewState([start, end]);
  const leftValue = elements[start].getHeight(),
    rightValue = elements[end].getHeight();
  let [leftIdx, middleIdx, rightIdx] = [start + 1, start + 1, end - 1];

  while (middleIdx <= rightIdx) {
    if (elements[middleIdx].getHeight() < leftValue) {
      swap(elements, leftIdx, middleIdx);
      pushNewState([leftIdx, middleIdx]);
      leftIdx++;
    } else if (elements[middleIdx].getHeight() >= rightValue) {
      while (elements[rightIdx].getHeight() > rightValue && middleIdx < rightIdx) {
        rightIdx--;
      }
      swap(elements, middleIdx, rightIdx);
      pushNewState([middleIdx, rightIdx]);
      rightIdx--;
      if (elements[middleIdx].getHeight() < leftValue) {
        swap(elements, leftIdx, middleIdx);
        pushNewState([leftIdx, middleIdx]);
        leftIdx++;
      }
    }
    middleIdx++;
  }
  leftIdx--;
  rightIdx++;
  swap(elements, leftIdx, start);
  swap(elements, rightIdx, end);
  pushNewState([leftIdx, start]);
  pushNewState([rightIdx, end]);
  return [leftIdx, rightIdx];
};

const quickSortDualPivotHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const [leftIdx, rightIdx] = partitionDual(start, end);

  quickSortDualPivotHelper(start, leftIdx - 1);
  pushNewState([leftIdx]);
  quickSortDualPivotHelper(leftIdx + 1, rightIdx - 1);
  pushNewState([rightIdx]);
  quickSortDualPivotHelper(rightIdx + 1, end);
};

export const quickSortDualPivot = () => {
  quickSortDualPivotHelper();
  pushLastState();
};

// ====== QUICK SORT DUAL PIVOT ======

// ====== SELECTION SORT ======

export const selectionSort = () => {
  for (let i = 0; i < count - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < count; j++) {
      if (elements[j].getHeight() < elements[minIdx].getHeight()) {
        minIdx = j;
      }
    }
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);
  }
  pushLastState();
};

// ====== SELECTION SORT ======

// ====== DOUBLE SELECTION SORT ======

export const doubleSelectionSort = () => {
  let i = 0,
    j = count - 1;
  while (i < j) {
    let minIdx = i;
    let min = elements[i].getHeight();
    let maxIdx = i;
    let max = elements[i].getHeight();

    for (let k = i; k <= j; k++) {
      if (elements[k].getHeight() < min) {
        minIdx = k;
        min = elements[k].getHeight();
      } else if (elements[k].getHeight() > max) {
        maxIdx = k;
        max = elements[k].getHeight();
      }
    }
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);

    if (elements[minIdx].getHeight() === max) {
      swap(elements, j, minIdx);
      pushNewState([j, minIdx]);
    } else {
      swap(elements, j, maxIdx);
      pushNewState([j, maxIdx]);
    }
    i++;
    j--;
  }
  pushLastState();
};

// ====== DOUBLE SELECTION SORT ======

// ====== GNOME SORT ======

export const gnomeSort = () => {
  let currentIdx = 0;
  while (true) {
    if (currentIdx === count - 1) break;
    if (
      currentIdx < count - 1 &&
      elements[currentIdx].getHeight() > elements[currentIdx + 1].getHeight()
    ) {
      let continueIdx = currentIdx;
      while (
        currentIdx >= 0 &&
        elements[currentIdx].getHeight() > elements[currentIdx + 1].getHeight()
      ) {
        swap(elements, currentIdx, currentIdx + 1);
        pushNewState([currentIdx, currentIdx + 1]);
        currentIdx--;
      }
      currentIdx = continueIdx;
    } else {
      currentIdx++;
    }
  }
  pushLastState();
};

// ====== GNOME SORT ======

// ====== INSERTION SORT ======

export const insertionSort = () => {
  for (let i = 1; i < count; i++) {
    let { y, height } = elements[i];
    let j = i - 1;
    while (j >= 0 && height < elements[j].getHeight()) {
      elements[j + 1].y = elements[j].y;
      elements[j + 1].height = elements[j].height;
      pushNewState([j, j + 1]);
      j--;
    }
    elements[j + 1].y = y;
    elements[j + 1].height = height;
    pushNewState([j + 1, i]);
  }
  pushLastState();
};

// ====== INSERTION SORT ======

// ====== COMB SORT ======

export const combSort = () => {
  let gap = elements.length;
  let shrinkFactor = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < elements.length; i++) {
      if (elements[i].getHeight() > elements[i + gap].getHeight()) {
        swap(elements, i, i + gap);
        sorted = false;
      }
      pushNewState([i, i + gap]);
    }
  }
  pushLastState();
};

// ====== COMB SORT ======

const pushLastState = () => {
  // Push last state with no accent colors
  const newState = [];
  for (let k = 0; k < count; k++) {
    let color = '#ffffff';

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    }
    newState.push(element);
  }
  states.push(newState);
};

const pushNewState = (accentIdxs = []) => {
  const newState = [];

  for (let i = 0; i < accentIdxs.length; i++) {
    // let color = '#ffffff';
    let color = '#ff0000';
    let k = accentIdxs[i];

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    }
    newState.push(element);
  }

  states.push(newState);
};

// Custom swap function to swap heights and y coordinates of two elements
export const swap = (arr, i, j) => {
  const { height, y } = arr[i];

  arr[i].height = arr[j].height;
  arr[i].y = arr[j].y;

  arr[j].height = height;
  arr[j].y = y;
};
