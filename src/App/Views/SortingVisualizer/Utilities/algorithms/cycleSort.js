import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const cycleSort = () => {
  let itemsDone = 0;
  while (itemsDone < count) {
    let destIdx = itemsDone;
    for (let j = itemsDone + 1; j < count; j++) {
      if (j !== itemsDone && elements[j].getValue() < elements[itemsDone].getValue()) {
        destIdx++;
      }
      pushNewState([j]);
    }

    pushNewState([itemsDone, destIdx]);
    swap(elements, itemsDone, destIdx);
    pushNewState([itemsDone, destIdx]);

    if (destIdx === itemsDone) {
      itemsDone++;
    }
    console.log(destIdx, itemsDone);
  }

  pushLastState();
};
