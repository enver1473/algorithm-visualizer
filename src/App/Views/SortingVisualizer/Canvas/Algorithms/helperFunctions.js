import { states, elements, count } from '../Canvas';
import ColoredBar from '../ElementTypes/ColoredBar';
import ColorHeightBar from '../ElementTypes/ColorHeightBar';
import ColoredTriangle from '../ElementTypes/ColoredTriangle';
import VarColoredTriangle from '../ElementTypes/VarColoredTriangle';

export const setValuesAtIndexes = (i, j) => {
  if (elements[i] instanceof ColoredBar) {
    elements[i].hue = elements[j].hue;
  } else if (elements[i] instanceof ColorHeightBar) {
    elements[i].height = elements[j].height;
    elements[i].hue = elements[j].hue;
    elements[i].y = elements[j].y;
  } else if (elements[i] instanceof ColoredTriangle) {
    elements[i].hue = elements[j].hue;
  } else if (elements[i] instanceof VarColoredTriangle) {
    elements[i].hue = elements[j].hue;
    elements[i].x1 = elements[j].x1;
    elements[i].x2 = elements[j].x2;
    elements[i].y1 = elements[j].y1;
    elements[i].y2 = elements[j].y2;
    elements[i].bx1 = elements[j].bx1;
    elements[i].bx2 = elements[j].bx2;
    elements[i].by1 = elements[j].by1;
    elements[i].by2 = elements[j].by2;
    elements[i].setMag();
  } else {
    elements[i].y = elements[j].y;
    elements[i].height = elements[j].height;
  }
};

export const setValuesAtIndex = (i, element) => {
  if (elements[i] instanceof ColoredBar) {
    elements[i].hue = element.hue;
  } else if (elements[i] instanceof ColorHeightBar) {
    elements[i].height = element.height;
    elements[i].hue = element.hue;
    elements[i].y = element.y;
  } else if (elements[i] instanceof ColoredTriangle) {
    elements[i].hue = element.hue;
  } else if (elements[i] instanceof VarColoredTriangle) {
    elements[i].hue = element.hue;
    elements[i].x1 = element.x1;
    elements[i].x2 = element.x2;
    elements[i].y1 = element.y1;
    elements[i].y2 = element.y2;
    elements[i].bx1 = element.bx1;
    elements[i].bx2 = element.bx2;
    elements[i].by1 = element.by1;
    elements[i].by2 = element.by2;
    elements[i].setMag();
  } else {
    elements[i].y = element.y;
    elements[i].height = element.height;
  }
};

export const mergeAtIndexes = (i, j) => {
  if (elements[i] instanceof ColoredBar) {
    const element = elements[i].copy();
    element.hue = elements[j].hue;
    return element;
  } else if (elements[i] instanceof ColorHeightBar) {
    const element = elements[i].copy();
    element.height = elements[j].height;
    element.hue = elements[j].hue;
    element.y = elements[j].y;
    return element;
  } else if (elements[i] instanceof ColoredTriangle) {
    const element = elements[i].copy();
    element.hue = elements[j].hue;
    return element;
  } else if (elements[i] instanceof VarColoredTriangle) {
    const element = elements[i].copy();

    element.hue = elements[j].hue;
    element.x1 = elements[j].x1;
    element.x2 = elements[j].x2;
    element.y1 = elements[j].y1;
    element.y2 = elements[j].y2;
    element.bx1 = elements[j].bx1;
    element.bx2 = elements[j].bx2;
    element.by1 = elements[j].by1;
    element.by2 = elements[j].by2;
    element.setMag();
    return element;
  } else {
    const element = elements[i].copy();
    element.height = elements[j].height;
    element.y = elements[j].y;
    return element;
  }
};

export const maxElement = () => {
  let maxE = elements[0].getValue();

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].getValue() > maxE) {
      maxE = elements[i].getValue();
    }
  }

  return maxE;
};

export const pushNewState = (accentIdxs = []) => {
  const newState = [];

  for (let i = 0; i < accentIdxs.length; i++) {
    let element;

    element = elements[accentIdxs[i]].copy();

    newState.push(element);
  }

  states.push(newState);
};

export const pushLastState = () => {
  // Push last state with no accent colors
  const newState = [];
  for (let k = 0; k < count; k++) {
    let element;

    element = elements[k].copy();

    newState.push(element);
  }
  states.push(newState);
};

// Custom swap function
export const swap = (arr, i, j) => {
  if (arr[i] instanceof ColoredBar) {
    const { hue } = arr[i];

    arr[i].hue = arr[j].hue;

    arr[j].hue = hue;
  } else if (arr[i] instanceof ColorHeightBar) {
    const { height, hue, y } = arr[i];

    arr[i].height = arr[j].height;
    arr[i].hue = arr[j].hue;
    arr[i].y = arr[j].y;

    arr[j].height = height;
    arr[j].hue = hue;
    arr[j].y = y;
  } else if (arr[i] instanceof ColoredTriangle) {
    const { hue } = arr[i];

    arr[i].hue = arr[j].hue;

    arr[j].hue = hue;
  } else if (arr[i] instanceof VarColoredTriangle) {
    const { hue, x1, x2, y1, y2, bx1, by1, bx2, by2 } = arr[i];

    arr[i].hue = arr[j].hue;
    arr[i].x1 = arr[j].x1;
    arr[i].x2 = arr[j].x2;
    arr[i].y1 = arr[j].y1;
    arr[i].y2 = arr[j].y2;
    arr[i].bx1 = arr[j].bx1;
    arr[i].bx2 = arr[j].bx2;
    arr[i].by1 = arr[j].by1;
    arr[i].by2 = arr[j].by2;

    arr[j].hue = hue;
    arr[j].x1 = x1;
    arr[j].x2 = x2;
    arr[j].y1 = y1;
    arr[j].y2 = y2;
    arr[j].bx1 = bx1;
    arr[j].bx2 = bx2;
    arr[j].by1 = by1;
    arr[j].by2 = by2;
  } else {
    const { height, y } = arr[i];

    arr[i].height = arr[j].height;
    arr[i].y = arr[j].y;

    arr[j].height = height;
    arr[j].y = y;
  }
};

export const midValue = (i1, i2, i3) => {
  // i1 => index1, i2 => index2, i3 => index3
  let v1 = elements[i1].getValue(); // v1 => value1
  let v2 = elements[i2].getValue(); // v2 => value2
  let v3 = elements[i3].getValue(); // v3 => value3

  if (v1 > v2) {
    if (v1 > v3) {
      if (v2 > v3) {
        return i2;
      } else {
        return i3;
      }
    } else {
      return i1;
    }
  } else {
    if (v2 > v3) {
      if (v1 > v3) {
        return i1;
      } else {
        return i3;
      }
    } else {
      return i2;
    }
  }
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
