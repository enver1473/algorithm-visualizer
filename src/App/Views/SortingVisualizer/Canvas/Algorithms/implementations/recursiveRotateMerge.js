import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';
import { binaryInsertionSortHelper } from './binaryInsertionSort';

export const binaryInsertion = (oneBeforeStart, end) => {
  return binaryInsertionSortHelper(oneBeforeStart + 1, end);
};

export const rotateBlock = (blockStart, destination, length) => {
  for (let i = destination; i < destination + length; i++, blockStart++) {
    pushNewState([blockStart, i]);
    swap(elements, blockStart, i);
    pushNewState([blockStart, i]);
  }
};

export const rotate = (blockStart, to, blockLen) => {
  let distance = to - (blockStart + blockLen);
  let rotations;
  let leftOverStart;
  let leftOverLen;
  let changed = false;

  if (distance === 0) return;

  if (distance === blockLen) {
    rotateBlock(blockStart, blockStart + blockLen, blockLen);
    changed = true;
    return changed;
  } else if (distance > blockLen) {
    if (blockLen === 0) return;
    let rotations = Math.floor(distance / blockLen);

    for (let i = 0; i < rotations; i++) {
      rotateBlock(blockStart, blockStart + blockLen, blockLen);
      changed = true;
      blockStart += blockLen;
    }

    if (distance % blockLen !== 0) {
      return rotate(blockStart, to, blockLen);
    }
  } else {
    let shiftAmount = distance;
    if (shiftAmount <= 0) return;

    let nextBlockStart = blockStart + blockLen - shiftAmount;
    let nextBlockDestination = blockStart + blockLen;
    leftOverLen = blockLen;
    leftOverStart = blockStart;

    while (true) {
      if (nextBlockStart < blockStart) {
        break;
      }
      rotateBlock(nextBlockStart, nextBlockDestination, shiftAmount);
      changed = true;

      nextBlockStart -= shiftAmount;
      nextBlockDestination -= shiftAmount;
      leftOverLen -= shiftAmount;
    }

    let nextBlock;

    if (leftOverLen !== 0) {
      if (blockLen > 0) {
        rotations = Math.floor(shiftAmount / blockLen);
        nextBlock = blockStart + leftOverLen + shiftAmount;

        for (let i = 0; i < rotations; i++) {
          rotateBlock(leftOverStart, leftOverStart + leftOverLen, shiftAmount);
          leftOverStart += shiftAmount;
          changed = true;
        }

        if (shiftAmount % blockLen !== 0) {
          changed = rotate(leftOverStart, nextBlock, leftOverLen);
        }
      }
    }
  }

  return changed;
};

const initialRotation = (start, middle, end) => {
  let num = elements[start].copy();

  let lo = middle;
  let hi = end;

  while (lo < hi) {
    let mid = lo + parseInt((hi - lo) / 2);
    pushNewState([lo, mid, hi]);

    if (num.getValue() <= elements[mid].getValue()) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  let rotateTo = hi;
  let rotateLength = middle - start;
  if (rotateTo - middle < 4 || rotateTo - middle < parseInt((end - start) / 20)) return middle;

  if (rotateTo === end) {
    rotateTo = num.getValue() > elements[end].getValue() ? hi + 1 : hi;
    pushNewState([start, end]);
  }
  rotate(start, rotateTo, rotateLength);
  return rotateTo;
};

const rotateMerge = (start, middle, end) => {
  if (middle === start) {
    return;
  }

  if (elements[middle - 1].getValue() <= elements[middle].getValue()) {
    pushNewState([middle - 1, middle]);
    return;
  }

  let destIndex;
  if (middle + 1 < count && elements[middle + 1].getValue() < elements[start].getValue()) {
    destIndex = initialRotation(start, middle, end);

    if (destIndex === end + 1) return;
    start += destIndex - middle;
    middle += destIndex - middle;
  }

  let lowerMid = start + parseInt((middle - start) / 2);
  let num = elements[lowerMid].copy();

  let lo = middle;
  let hi = end;

  while (lo < hi) {
    let mid = lo + parseInt((hi - lo) / 2);
    pushNewState([lo, mid, hi]);

    if (num.getValue() <= elements[mid].getValue()) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  let rotateTo = hi;
  let rotateLength = middle - lowerMid;

  if (rotateTo === end) {
    rotateTo = num.getValue() > elements[end].getValue() ? hi + 1 : hi;
    pushNewState([start, end]);
  }
  rotate(lowerMid, rotateTo, rotateLength);

  rotateMerge(hi - rotateLength + 1, hi, end);
  rotateMerge(start, lowerMid, hi - rotateLength);
};

const recursiveRotateMergeHelper = (start, end) => {
  if (start + 1 >= end) return;
  if (end - start < 17) {
    binaryInsertion(start, end + 1);
    return;
  }

  let mid = start + parseInt((end - start) / 2);
  recursiveRotateMergeHelper(start, mid - 1);
  recursiveRotateMergeHelper(mid, end);

  rotateMerge(start, mid, end);
};

export const recursiveRotateMerge = (start = 0, end = count) => {
  recursiveRotateMergeHelper(start, end - 1);
  pushLastState();
};
