import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

export const coctailShakerSort = () => {
  let forward = 0,
    backward = 0;
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      for (let j = backward; j < count - forward - 1; j++) {
        if (elements[j].getValue() > elements[j + 1].getValue()) {
          pushNewState([j, j + 1]);
          swap(elements, j, j + 1);
          pushNewState([j, j + 1]);
        }
      }
      forward++;
    } else {
      for (let j = count - forward - 1; j >= backward + 1; j--) {
        if (elements[j].getValue() < elements[j - 1].getValue()) {
          pushNewState([j, j - 1]);
          swap(elements, j, j - 1);
          pushNewState([j, j - 1]);
        }
      }
      backward++;
    }
  }

  pushLastState();
};