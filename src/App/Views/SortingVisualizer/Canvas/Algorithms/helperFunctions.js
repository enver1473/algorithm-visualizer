import { states, elements, count, vMethod } from '../Canvas';
import Bar from '../ElementTypes/Bar';
import Dot from '../ElementTypes/Dot';
import ColoredBar from '../ElementTypes/ColoredBar';
import ColorHeightBar from '../ElementTypes/ColorHeightBar';
import ColoredTriangle from '../ElementTypes/ColoredTriangle';

export const setValuesAtIndexes = (i, j) => {
  if (elements[i] instanceof ColoredBar) {
    elements[i].hue = elements[j].hue;
  } else if (elements[i] instanceof ColorHeightBar) {
    elements[i].height = elements[j].height;
    elements[i].hue = elements[j].hue;
    elements[i].y = elements[j].y;
  } else if (elements[i] instanceof ColoredTriangle) {
    elements[i].hue = elements[j].hue;
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

export const pushLastState = () => {
  // Push last state with no accent colors
  const newState = [];
  for (let k = 0; k < count; k++) {
    let color = '#f8efba';

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'scatterPlot') {
      element = new Dot(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'rainbow') {
      element = elements[k].copy();
    } else if (vMethod === 'rainbowBarPlot') {
      element = elements[k].copy();
    } else if (vMethod === 'rainbowCircle') {
      element = elements[k].copy();
    }
    newState.push(element);
  }
  states.push(newState);
};

export const pushNewState = (accentIdxs = []) => {
  const newState = [];

  for (let i = 0; i < accentIdxs.length; i++) {
    let color = '#ff0000';
    let k = accentIdxs[i];

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'scatterPlot') {
      element = new Dot(elements[k].x, elements[k].y, elements[k].width, elements[k].height, color);
    } else if (vMethod === 'rainbow') {
      element = elements[k].copy();
    } else if (vMethod === 'rainbowBarPlot') {
      element = elements[k].copy();
    } else if (vMethod === 'rainbowCircle') {
      element = elements[k].copy();
    }
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
  } else {
    const { height, y } = arr[i];

    arr[i].height = arr[j].height;
    arr[i].y = arr[j].y;

    arr[j].height = height;
    arr[j].y = y;
  }
};

export const midValue = (i1, i2, i3) => {
  let v1 = elements[i1].getValue();
  let v2 = elements[i2].getValue();
  let v3 = elements[i3].getValue();

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