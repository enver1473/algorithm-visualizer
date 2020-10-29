import { count, elements } from '../../Canvas';
import {
  pushLastState,
  swap,
  pushNewState,
  setValuesAtIndex,
  setValuesAtIndexes,
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

export const insertOneBackwards = (start, end) => {
  // console.log(start, end);
  let num = elements[end].copy();
  let lo = end;
  let hi = start;

  while (lo < hi) {
    let mid = lo + Math.floor((hi - lo) / 2);
    pushNewState([lo, mid, hi]);

    if (num.getValue() <= elements[mid].getValue()) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  let j = end + 1;

  while (j < hi) {
    pushNewState([j - 1, j]);
    setValuesAtIndexes(j - 1, j);
    pushNewState([j - 1, j]);
    j++;
  }

  pushNewState([hi - 1, end]);
  setValuesAtIndex(hi - 1, num);
  pushNewState([hi - 1, end]);
}

export const rotateBlockBackwards = (blockStart, destination, length) => {
  for (let i = destination; i > destination - length; i--, blockStart--) {
    pushNewState([i, blockStart]);
    swap(elements, i, blockStart);
    pushNewState([i, blockStart]);
  }
};

export const rotateBackwards = (blockStart, to, blockLen) => {
  let distance = blockStart - blockLen - to;
  let rotations;
  let leftOverStart;
  let leftOverLen;
  let changed = false;

  if (distance === 0) return;

  if (distance === blockLen) {
    rotateBlockBackwards(blockStart, blockStart - blockLen, blockLen);
    changed = true;
    return changed;
  } else if (distance > blockLen) {
    if (blockLen === 0) return;
    let rotations = Math.floor(distance / blockLen);

    for (let i = 0; i < rotations; i++) {
      rotateBlockBackwards(blockStart, blockStart - blockLen, blockLen);
      changed = true;
      blockStart -= blockLen;
    }

    if (distance % blockLen !== 0) {
      return rotateBackwards(blockStart, to, blockLen);
    }
  } else {
    let shiftAmount = distance;
    if (shiftAmount <= 0) return;

    let blockEnd = blockStart - blockLen;
    let nextBlockStart = blockEnd + shiftAmount;
    let nextBlockDestination = blockEnd;
    leftOverLen = blockLen;
    leftOverStart = blockStart;

    while (true) {
      if (nextBlockStart > blockStart) {
        break;
      }
      rotateBlockBackwards(nextBlockStart, nextBlockDestination, shiftAmount);
      changed = true;

      nextBlockStart += shiftAmount;
      nextBlockDestination += shiftAmount;
      leftOverLen -= shiftAmount;
    }

    if (leftOverLen !== 0) {
      if (blockLen > 0) {
        rotations = Math.floor(shiftAmount / blockLen);
        let nextBlock = blockStart - leftOverLen - shiftAmount;

        for (let i = 0; i < rotations; i++) {
          rotateBlockBackwards(leftOverStart, leftOverStart - leftOverLen, shiftAmount);
          leftOverStart -= shiftAmount;
          changed = true;
        }

        if (shiftAmount % blockLen !== 0) {
          changed = rotateBackwards(leftOverStart, nextBlock, leftOverLen);
        }
      }
    }
  }

  return changed;
};

export const advancedRoomShakerHelper = (start, end) => {
  if (end - start <= 16) {
    binaryInsertion(start, end + 1);
    return;
  }

  let initialRoomLength = Math.floor(Math.sqrt(end - start) + 1);
  let forwardRoomStart = start;
  let reverseRoomStart = end;
  let roomStart;
  let endOfRoom;
  let forward = true;

  while (true) {
    let changed = false;

    // let inserted = 0;
    // let rotated = 0;
    // let skipped = 0;
    let roomLength = initialRoomLength;

    if (forward) {
      roomStart = forwardRoomStart;
      endOfRoom = roomStart + roomLength;
      changed = !binaryInsertion(roomStart, endOfRoom);
    } else {
      roomStart = reverseRoomStart;
      endOfRoom = roomStart - roomLength;
      changed = !binaryInsertion(endOfRoom + 1, roomStart + 2);
    }

    let roomMin = elements[roomStart].copy();
    let roomMax = elements[roomStart].copy();

    while (forward && endOfRoom <= end) {
      // first stage to sort a room, count how many (if any) sorted (but greater or equal to the room max) elements there are ahead of the room
      let foundSorted = 0;
      let j = endOfRoom;
      while (j <= end && elements[j].getValue() >= elements[j - 1].getValue()) {
        foundSorted++;
        pushNewState([j, j - 1]);
        j++;
        // skipped++;

        if (j === end + 1) {
          end -= foundSorted;
        }
      }

      // if found any sorted items right after room, adjust the room start and end
      if (foundSorted > 0) {
        roomStart += foundSorted;
        endOfRoom += foundSorted;
        continue;
      }

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

    while (!forward && endOfRoom >= start) {
      // first stage to sort a room, count how many (if any) sorted (but greater or equal to the room max) elements there are ahead of the room
      let foundSorted = 0;
      let j = endOfRoom;
      while (j >= start && elements[j].getValue() <= elements[j + 1].getValue()) {
        foundSorted++;
        pushNewState([j, j + 1]);
        j--;
        // skipped++;

        if (j === start - 1) {
          start += foundSorted;
        }
      }

      // if found any sorted items right after room, adjust the room start and end
      if (foundSorted > 0) {
        roomStart -= foundSorted;
        endOfRoom -= foundSorted;
        continue;
      }

      let shiftAmount = 0;

      for (let j = endOfRoom; j >= 0; j--) {
        pushNewState([j]);
        if (elements[j].getValue() > roomMax.getValue()) {
          shiftAmount++;
        } else break;
      }

      if (shiftAmount === 0) {
        changed = true;
        insertOneBackwards(roomStart, endOfRoom);
        // inserted++;
        roomStart--;
        endOfRoom--;
        roomMax = elements[roomStart].copy();
        continue;
      }

      changed = rotateBackwards(roomStart, roomStart - roomLength - shiftAmount, roomLength) || changed;

      roomStart -= shiftAmount;
      endOfRoom -= shiftAmount;
      // rotated += shiftAmount;
    }

    if (forward) {
      end -= roomLength;
      roomStart = end;
      reverseRoomStart = roomStart;
      endOfRoom = end - roomLength;
    } else {
      start += roomLength;
      roomStart = start;
      forwardRoomStart = roomStart;
      endOfRoom = start + roomLength;
    }

    forward = !forward;

    if (end < endOfRoom || start > endOfRoom || !changed) break;
  }

  binaryInsertion(start, end + 1);
};

export const advancedRoomShaker = () => {
  advancedRoomShakerHelper(0, count - 1);
  pushLastState();
};
