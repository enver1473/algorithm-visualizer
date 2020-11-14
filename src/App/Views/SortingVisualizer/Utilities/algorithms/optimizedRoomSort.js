import { count } from '../../Canvas';
import {
  pushLastState,
} from '../helperFunctions';
import { binaryInsertionSortHelper } from './binaryInsertionSort';

export const optimizedRoomSort = () => {
  let roomLength = Math.floor(Math.sqrt(count) + 1);
  let endOfRoom = roomLength;
  let noInsertionsMade = true;

  // Sort initial room
  if (count < 16) {
    binaryInsertionSortHelper();
    pushLastState();
    return;
  }
  noInsertionsMade = noInsertionsMade && binaryInsertionSortHelper(1, roomLength + 2);

  for (let i = roomLength, j = count - 2; j > roomLength; i++, endOfRoom++) {
    if (endOfRoom > j) {
      i = roomLength;
      endOfRoom = i;

      j -= roomLength;
      if (noInsertionsMade) {
        break;
      }
      
      noInsertionsMade = binaryInsertionSortHelper(1, roomLength + 2) && noInsertionsMade;
    } else {
      noInsertionsMade = binaryInsertionSortHelper(i - (roomLength - 1), i + 2) && noInsertionsMade;
    }
  }
  if (!noInsertionsMade) { // if insertions were made sort the last bit left
    binaryInsertionSortHelper(1, roomLength);
  }

  pushLastState();
};
