import { count, elements } from '../../Canvas';
import { pushLastState, swap, pushNewState } from '../helperFunctions';
import { binaryInsertionSortHelper } from './binaryInsertionSort';

export const rotateRoomSortHelper = (start, end) => {
  if (end - start <= 8) {
    binaryInsertionSortHelper(start + 1, end);
    return;
  }

  let roomLength = Math.floor(Math.sqrt(end - start) + 1);
  let endOfRoom = start + roomLength;

  let min = elements[start].copy();
  let minIdx = start;

  // find minimum element in the initial room
  for (let i = start; i < start + roomLength; i++) {
    if (elements[i].getValue() < min.getValue()) {
      min = elements[i].copy();
      minIdx = i;
    }
  }

  for (let i = start, j = end - 1; j > start + roomLength; i++, endOfRoom++) {
    // if the current room has reached it's final destination
    if (endOfRoom > j) {
      // when at the final destination, the room then needs to be sorted
      rotateRoomSortHelper(i, endOfRoom);

      // reset i and endOfRoom to their initial values to sort the next room
      i = start - 1;
      endOfRoom = i + roomLength;

      // since the previous room has been taken care of, 
      // we don't care for it anymore so we decrease the index the next room goes to
      j -= roomLength - 1;

      // find minimum element in the next room
      for (let k = start; k < start + roomLength; k++) {
        if (elements[k].getValue() < min.getValue()) {
          min = elements[k].copy();
          minIdx = k;
        }
      }
    } else {
      pushNewState([i, endOfRoom]);

      // if the first item right of the room is greater than the room's minimum value
      // swap the minimum and the first element of the room
      if (elements[endOfRoom].getValue() > min.getValue()) {
        pushNewState([i, minIdx]);
        swap(elements, i, minIdx);
        pushNewState([i, minIdx]);

        min = elements[endOfRoom].copy();
        minIdx = endOfRoom;
        
        // find new minimum
        for (let k = i + 1; k <= endOfRoom; k++) {
          if (elements[k].getValue() < min.getValue()) {
            min = elements[k].copy();
            minIdx = k;
          }
        }
      } else {
        // else if the next element right of the room is smaller than or equal to the minimum
        // swap it with the first element of the room

        if (i === minIdx) {
          minIdx = endOfRoom;
        }
        swap(elements, i, endOfRoom);
        pushNewState([i, endOfRoom]);
      }
    }
  }

  // sort the final room just to be sure
  binaryInsertionSortHelper(start + 1, start + roomLength);
};

export const rotateRoomSort = () => {
  rotateRoomSortHelper(0, count);
  pushLastState();
};
