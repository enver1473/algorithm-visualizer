import { elements, count } from '../../Canvas';
import { pushNewState, pushLastState, swap } from '../helperFunctions';

const pairwiserecursive = (start, end, gap) => {
  if (start === end - gap) {
    return;
  }

  let b = start + gap;

  while (b < end) {
    pushNewState([b, b - gap]);
    if (elements[b - gap].getValue() > elements[b].getValue()) {
      swap(elements, b - gap, b);
    }
    pushNewState([b, b - gap]);
    b += 2 * gap;
  }

  if (Math.floor((end - start) / gap) % 2 === 0) { // if number of elements to be sorted with the current gap is even
    pairwiserecursive(start, end, gap * 2);
    pairwiserecursive(start + gap, end + gap, gap * 2);
  } else {
    pairwiserecursive(start, end + gap, gap * 2);
    pairwiserecursive(start + gap, end, gap * 2);
  }

  let a = 1;

  while (a < Math.floor((end - start) / gap)) {
    a = a * 2 + 1;
  }

  b = start + gap;

  while (b + gap < end) {
    let c = a;
    while (c > 1) {
      c = Math.floor(c / 2);
      if (b + c * gap < end) {
        pushNewState([b, b + c * gap]);
        if (elements[b].getValue() > elements[b + c * gap].getValue()) {
          swap(elements, b, b + c * gap);
        }
        pushNewState([b, b + c * gap]);
      }
    }
    b += 2 * gap;
  }
};

export const recursivePairwiseNetwork = () => {
  pairwiserecursive(0, count, 1);
  pushLastState();
};
