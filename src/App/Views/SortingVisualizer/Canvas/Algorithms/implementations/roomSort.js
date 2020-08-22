import { count } from '../../Canvas';
import { pushLastState } from '../helperFunctions';
import { insertionSortHelper } from './insertionSort';

export const roomSort = () => {
  let roomLength = Math.floor(Math.sqrt(count) + 1);
  let endOfRoom = roomLength;

  for (let i = 0, j = count; j > roomLength; i++, endOfRoom++) {
    if (endOfRoom > j) {
      i = -1;
      endOfRoom = i + roomLength;

      j -= roomLength - 1;
    } else {
      insertionSortHelper(i + 1, endOfRoom);
    }
  }

  insertionSortHelper(1, roomLength);

  pushLastState();
};
