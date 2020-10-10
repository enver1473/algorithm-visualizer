import { count, elements } from '../../Canvas';
import { pushLastState, swap, pushNewState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';
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

export const advancedRoomSortHelper = (start, end) => {
  if (end - start <= 8) {
    binaryInsertion(start, end);
    return;
  }

  let roomLength = Math.floor(Math.sqrt(end - start) + 1);
  let roomStart = start;
  let endOfRoom;

  while (true) {
    let changed = false;

    endOfRoom = roomStart + roomLength;
  
    // find minimum element in the initial room
    changed = !binaryInsertion(roomStart, endOfRoom);
  
    let roomMin = elements[roomStart].copy();

    while (endOfRoom < end) {
      let shiftAmount = 0;
  
      for (let i = endOfRoom; i < endOfRoom + roomLength && i < count; i++) {
        pushNewState([i]);
        if (elements[i].getValue() < roomMin.getValue()) {
          shiftAmount++;
        } else break;
      }
  
      if (shiftAmount === 0) {
        changed = true;
        insertOne(roomStart, endOfRoom);
        roomStart++;
        endOfRoom++;
        roomMin = elements[roomStart].copy();
        continue;
      }
  
      let nextBlockStart = endOfRoom - shiftAmount;
      let nextBlockDestination = endOfRoom;
      let leftOverLen = roomLength;
      let leftOverStart = roomStart;
  
      while (true) {
        if (nextBlockStart < roomStart) {
          break;
        }
        changed = true;
        rotateBlock(nextBlockStart, nextBlockDestination, shiftAmount);
        nextBlockStart -= shiftAmount;
        nextBlockDestination -= shiftAmount;
        leftOverLen -= shiftAmount;
      }
  
      // let odd = 0;
      // if (shiftAmount % 2 === 1) odd = 1;
  
      for (let i = leftOverLen - 1; i >= 0; i--) {
        changed = true;
        rotateBlock(leftOverStart + i, leftOverStart + i + 1, shiftAmount);
      }
  
      roomStart += shiftAmount;
      endOfRoom += shiftAmount;
    }
    
    roomStart = start;
    end -= roomLength;
    endOfRoom = start + roomLength;
    if (end < endOfRoom && !changed) break;
  }

  binaryInsertion(start, endOfRoom);

  /*
  for (let i = start, j = end - 1; j > start + roomLength; i++, endOfRoom++) {
    // if the current room has reached it's final destination
    if (endOfRoom > j) {
      if (noSwaps) {
        break;
      }
      // when at the final destination, the room then needs to be sorted
      optimizedRotateRoomSortHelper(i, endOfRoom);

      // reset i and endOfRoom to their initial values to sort the next room
      i = start - 1;
      endOfRoom = i + roomLength;

      // since the previous room has been taken care of,
      // we don't care for it anymore so we decrease the index the next room goes to
      j -= roomLength - 1;
    } else {
      pushNewState([i, endOfRoom]);

      // if the first item right of the room is greater than the room's minimum value
      // swap the minimum and the first element of the room
      if (elements[endOfRoom].getValue() > min.getValue()) {
        if (i !== minIdx) {
          noSwaps = false;
          pushNewState([i, minIdx]);
          swap(elements, i, minIdx);
          pushNewState([i, minIdx]);
        }
        min = elements[endOfRoom].copy();
        minIdx = endOfRoom;

        // find new minimum
        for (let k = i + 1; k <= endOfRoom; k++) {
          if (elements[k].getValue() < min.getValue()) {
            min = elements[k].copy();
            minIdx = k;
          }
        }
      } else if (elements[endOfRoom].getValue() < min.getValue()) {
        // else if the next element right of the room is smaller than or equal to the minimum
        // swap it with the first element of the room

        if (i === minIdx) {
          minIdx = endOfRoom;
        }
        noSwaps = false;
        swap(elements, i, endOfRoom);
        pushNewState([i, endOfRoom]);
      } else {
        if (elements[i].getValue() > min.getValue()) {
          noSwaps = false;
          swap(elements, i, minIdx);
          pushNewState([i, minIdx]);
        }
        minIdx = endOfRoom;
      }
    }
  }
*/
  // sort the final room just to be sure if any swaps occured
  // optimizedRotateRoomSortHelper(start, start + roomLength);
  // binaryInsertionSortHelper(start + 1, start + roomLength);
};

export const advancedRoomSort = () => {
  advancedRoomSortHelper(0, count);
  pushLastState();
};
