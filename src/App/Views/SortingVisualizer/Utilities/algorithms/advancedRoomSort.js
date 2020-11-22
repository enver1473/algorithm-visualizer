import { count, elements } from '../../Canvas';
import {
  pushLastState,
  swap,
  pushNewState,
  setValuesAtIndex,
  setValuesAtIndexes,
  reverse,
} from '../helperFunctions';
import { binaryInsertionSortHelper } from './binaryInsertionSort';

export const binaryInsertion = (oneBeforeStart, end) => {
  return binaryInsertionSortHelper(oneBeforeStart + 1, end);
};

export const insertOne = (start, end) => {
  let num = elements[end].copy();
  let lo = start;
  let hi = end;

  while (lo < hi) {
    let mid = lo + Math.floor((hi - lo) / 2);
    pushNewState([lo, mid, hi]);

    if (num.getValue() < elements[mid].getValue()) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  let j = end - 1;

  while (j >= lo) {
    pushNewState([j + 1, j]);
    setValuesAtIndexes(j + 1, j);
    pushNewState([j + 1, j]);
    j--;
  }

  pushNewState([lo, end]);
  setValuesAtIndex(lo, num);
  pushNewState([lo, end]);
};

export const rotateBlock = (blockStart, destination, length) => {
  for (let i = destination; i < destination + length; i++, blockStart++) {
    pushNewState([blockStart, i]);
    swap(elements, blockStart, i);
    pushNewState([blockStart, i]);
  }
};

export const rotate = (blockStart, to, blockLen) => {
  griesMillsRotate(blockStart, to, blockLen);
  // reversalRotate(blockStart, blockLen, to - (blockStart + blockLen));
};

export const reversalRotate = (start, leftLen, rightLen) => {
  reverse(elements, start, leftLen);            // reverse left part of subarray
  reverse(elements, start + leftLen, rightLen); // reverse right part of subarray
  reverse(elements, start, leftLen + rightLen); // reverse entire subarray
};

export const griesMillsRotate = (blockStart, to, blockLen) => {
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

export const advancedRoomSortHelper = (start, end) => {
  if (end - start <= 8) {
    binaryInsertion(start, end);
    return;
  }

  let initialRoomLength = Math.floor(Math.sqrt(end - start) + 1);
  let roomStart = start;
  let endOfRoom;

  while (true) {
    let changed = false;

    // let inserted = 0;
    // let rotated = 0;
    // let skipped = 0;

    let roomLength = initialRoomLength;
    endOfRoom = roomStart + roomLength;

    changed = !binaryInsertion(roomStart, endOfRoom);

    let roomMin = elements[roomStart].copy();

    while (endOfRoom < end) {
      // first stage to sort a room, count how many (if any) sorted (but greater or equal to the room max) elements there are ahead of the room
      let foundSorted = 0;
      let i = endOfRoom;
      while (
        i < end &&
        elements[i].getValue() >= elements[i - 1].getValue()
      ) {
        foundSorted++;
        pushNewState([i, i - 1]);
        i++;
        // skipped++;

        if (i === end) {
          end -= foundSorted;
        }
      }

      // if found any sorted items right after room, adjust the room start and end
      if (foundSorted > 0) {
        roomStart += foundSorted;
        endOfRoom += foundSorted;
        continue;
      }
      /*
      // adjust room size if neccessary
      if (roomLength > 1 && endOfRoom < end - 1) {
        let ratio = (inserted + skipped) / rotated;
        if (ratio >= 5) {
          roomLength--;
          endOfRoom = roomStart + roomLength;
        } else if (ratio <= 1) {
          roomLength++;
          endOfRoom = roomStart + roomLength;

          changed = true;
          insertOne(roomStart, endOfRoom);
          inserted++;
          roomStart++;
          roomMin = elements[roomStart].copy();

          inserted = 0;
          rotated = 0;
          continue;
        }
      }*/

      let shiftAmount = 0;

      for (let i = endOfRoom; i < count; i++) {
        pushNewState([i]);
        if (elements[i].getValue() < roomMin.getValue()) {
          shiftAmount++;
        } else break;
      }

      if (shiftAmount === 0) {
        changed = true;
        insertOne(roomStart, endOfRoom);
        // inserted++;
        roomStart++;
        endOfRoom++;
        roomMin = elements[roomStart].copy();
        continue;
      }

      changed = rotate(roomStart, roomStart + roomLength + shiftAmount, roomLength) || changed;

      roomStart += shiftAmount;
      endOfRoom += shiftAmount;
      // rotated += shiftAmount;
    }

    roomStart = start;
    end -= roomLength;
    endOfRoom = start + roomLength;
    if (end < endOfRoom || !changed) break;
  }

  binaryInsertion(start, endOfRoom);
};

export const advancedRoomSort = () => {
  advancedRoomSortHelper(0, count);
  pushLastState();
};
