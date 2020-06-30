import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, setValuesAtIndex, setValuesAtIndexes } from '../helperFunctions';

export const shellSort = () => {
  let shrinkFactor = 2;
  for (let gap = Math.floor(count / shrinkFactor); gap > 0; gap = Math.floor(gap / shrinkFactor)) {
    for (let i = gap; i < count; i++) {
      let current = elements[i].copy();
      let j;
      for (j = i; j >= gap && elements[j - gap].getValue() > current.getValue(); j -= gap) {
        pushNewState([j, j - gap]);
        setValuesAtIndexes(j, j - gap);
        pushNewState([j, j - gap]);
      }
      pushNewState([j, i]);
      setValuesAtIndex(j, current);
      pushNewState([j, i]);
    }
  }
  pushLastState();
};