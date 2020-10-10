import { count, elements } from '../../Canvas';
import { pushLastState, swap, pushNewState } from '../helperFunctions';
import { binaryInsertionSortHelper } from './binaryInsertionSort';

export const rotateRoomShakerSortHelper = (start, end) => {
  if (start > end) {
    let tmp = start;
    start = end;
    end = tmp;
  }
  if (end - start <= 8) {
    binaryInsertionSortHelper(start + 1, end + 1);
    return;
  }

  let roomLength = Math.floor(Math.sqrt(end - start + 1) + 1);
  let endOfRoom = start + roomLength;

  let min = elements[start].copy();
  let minIdx = start;

  let max = elements[start].copy();
  let maxIdx = start;

  // find minimum element in the initial room
  for (let i = start; i < start + roomLength; i++) {
    if (elements[i].getValue() < min.getValue()) {
      min = elements[i].copy();
      minIdx = i;
    }
  }

  let ascendingRun = true;
  let noSwaps = true;

  // initializing the counters and bounds
  let step = 1;
  let direction = 1;
  let i = start;
  let upperBound = end - (step - 1);
  let lowerBound = start + (step - 1);

  while (
    (ascendingRun && upperBound > lowerBound + (roomLength )) ||
    (!ascendingRun && lowerBound < upperBound - (roomLength))
  ) {
    // if the current room has reached it's final destination
    // If the previous room was sorted in ascending fashion, prepare the next one for descending sorting
    if (ascendingRun && endOfRoom > upperBound) {
      if (noSwaps) {
        break;
      }
      // when at the final destination, the room then needs to be sorted
      console.log(i, endOfRoom);
      rotateRoomShakerSortHelper(i - step, endOfRoom - step);
      ascendingRun = !ascendingRun;
      direction = -1;

      // since the previous room has been taken care of,
      // we don't care for it anymore so we decrease the index the next room goes to
      upperBound -= roomLength - step;

      // reset i and endOfRoom to their initial values to sort the next room
      i = upperBound + step;
      endOfRoom = i - roomLength;

      // find minimum element in the next room
      for (let k = upperBound; k > upperBound - roomLength; k--) {
        if (elements[k].getValue() > max.getValue()) {
          max = elements[k].copy();
          maxIdx = k;

        }
      }
      noSwaps = true;
    } else if (!ascendingRun && endOfRoom < lowerBound) {
      if (noSwaps) {
        break;
      }
      console.log(i, endOfRoom);
      rotateRoomShakerSortHelper(i + step, endOfRoom + step);
      ascendingRun = !ascendingRun;
      direction = 1;

      lowerBound += roomLength - step;

      i = lowerBound - step;
      endOfRoom = i + roomLength;

      // find minimum element in the next room
      for (let k = lowerBound; k < lowerBound + roomLength; k++) {
        if (elements[k].getValue() < min.getValue()) {
          min = elements[k].copy();
          minIdx = k;
        }
      }
      noSwaps = true;
    } else {
      if (ascendingRun) { // ascending run
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
      } else { // descending run
        pushNewState([i, endOfRoom]);

        // if the first item right of the room is greater than the room's minimum value
        // swap the minimum and the first element of the room
        if (elements[endOfRoom].getValue() < max.getValue()) {
          if (i !== maxIdx) {
            noSwaps = false;
            pushNewState([i, maxIdx]);
            swap(elements, i, maxIdx);
            pushNewState([i, maxIdx]);
          }
          max = elements[endOfRoom].copy();
          maxIdx = endOfRoom;

          // find new maximum
          for (let k = i - 1; k >= endOfRoom; k--) {
            if (elements[k].getValue() > max.getValue()) {
              max = elements[k].copy();
              maxIdx = k;
            }
          }
        } else if (elements[endOfRoom].getValue() > max.getValue()) {
          // else if the next element right of the room is smaller than or equal to the minimum
          // swap it with the first element of the room

          if (i === maxIdx) {
            maxIdx = endOfRoom;
          }
          noSwaps = false;
          swap(elements, i, endOfRoom);
          pushNewState([i, endOfRoom]);
        } else {
          if (elements[i].getValue() > max.getValue()) {
            noSwaps = false;
            swap(elements, i, maxIdx);
            pushNewState([i, maxIdx]);
          }
          maxIdx = endOfRoom;
        }
      }
    }
    i += step * direction;
    endOfRoom += step * direction;
  }

  // sort the final room just to be sure if any swaps occured
  // rotateRoomShakerSortHelper(start, start + roomLength);
};

export const rotateRoomShakerSort = () => {
  rotateRoomShakerSortHelper(0, count - 1);
  binaryInsertionSortHelper(1, count);
  pushLastState();
};
