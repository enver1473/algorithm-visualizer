import { states, elements, count, arr, vMethod } from '../Canvas';
import Bar from '../ElementTypes/Bar';
import Dot from '../ElementTypes/Dot';
import ColoredBar from '../ElementTypes/ColoredBar';
import ColorHeightBar from '../ElementTypes/ColorHeightBar';
import ColoredTriangle from '../ElementTypes/ColoredTriangle';

// ======  BUBBLE SORT ======

export const bubbleSort = () => {
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count - i - 1; j++) {
      if (elements[j].getValue() > elements[j + 1].getValue()) {
        pushNewState([j, j + 1]);
        swap(elements, j, j + 1);
        pushNewState([j, j + 1]);
      }
    }
  }
  pushLastState();
};

// ======  BUBBLE SORT ======

// ======  COCTAIL SHAKER SORT ======

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

// ======  COCTAIL SHAKER SORT ======

// ======  QUICK SORT LL POINTERS ======

const partitionLL = (start, end) => {
  if (end - start > 4) {
    let middleIdx = midValue(start, parseInt(start + (end - start) / 2), end);
    if (middleIdx !== end) {
      pushNewState([middleIdx, end]);
      swap(elements, middleIdx, end);
      pushNewState([middleIdx, end]);
    }
  }

  let pivotValue = elements[end].getValue();
  let pivotIdx = start;

  for (let i = start; i < end; i++) {
    if (elements[i].getValue() < pivotValue) {
      pushNewState([i, pivotIdx]);
      swap(elements, i, pivotIdx);
      pushNewState([i, pivotIdx]);
      pivotIdx++;
    } else {
      pushNewState([i, pivotIdx]);
    }
  }

  pushNewState([pivotIdx, end]);
  swap(elements, pivotIdx, end);
  pushNewState([pivotIdx, end]);

  return pivotIdx;
};

const quickSortLLHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLL(start, end);

  quickSortLLHelper(start, pivotIdx - 1);
  quickSortLLHelper(pivotIdx + 1, end);
};

export const quickSortLL = () => {
  quickSortLLHelper();
  pushLastState();
};

// ====== QUICK SORT LL ======

// ====== QUICK SORT LR ======

const partitionLR = (start, end) => {
  if (end - start > 4) {
    let middleIdx = midValue(start, parseInt(start + (end - start) / 2), end);
    if (middleIdx !== end) {
      pushNewState([middleIdx, end]);
      swap(elements, middleIdx, end);
      pushNewState([middleIdx, end]);
    }
  }

  const pivotValue = elements[end].getValue();
  let leftIdx = start;
  let rightIdx = end - 1;
  while (leftIdx <= rightIdx) {
    if (
      elements[leftIdx].getValue() > pivotValue &&
      elements[rightIdx].getValue() < pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      swap(elements, leftIdx, rightIdx);
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else if (
      elements[leftIdx].getValue() <= pivotValue &&
      elements[rightIdx].getValue() < pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
    } else if (
      elements[leftIdx].getValue() > pivotValue &&
      elements[rightIdx].getValue() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      rightIdx--;
    } else if (
      elements[leftIdx].getValue() <= pivotValue &&
      elements[rightIdx].getValue() >= pivotValue
    ) {
      pushNewState([leftIdx, rightIdx]);
      leftIdx++;
      rightIdx--;
    } else {
      pushNewState([leftIdx, rightIdx]);
    }
  }

  pushNewState([leftIdx, end]);
  swap(elements, leftIdx, end);
  pushNewState([leftIdx, end]);
  return leftIdx;
};

const quickSortLRHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const pivotIdx = partitionLR(start, end);

  quickSortLRHelper(start, pivotIdx - 1);
  quickSortLRHelper(pivotIdx + 1, end);
};

export const quickSortLR = () => {
  quickSortLRHelper();
  pushLastState();
};

// ====== QUICK SORT LR ======

// ====== QUICK SORT DUAL PIVOT ======

const partitionDual = (start, end) => {
  if (elements[start].getValue() > elements[end].getValue()) {
    pushNewState([start, end]);
    swap(elements, start, end);
    pushNewState([start, end]);
  }

  const leftValue = elements[start].getValue(),
        rightValue = elements[end].getValue();
  let [leftIdx, middleIdx, rightIdx] = [start + 1, start + 1, end - 1];

  while (middleIdx <= rightIdx) {
    if (elements[middleIdx].getValue() < leftValue) {
      pushNewState([leftIdx, middleIdx]);
      swap(elements, leftIdx, middleIdx);
      pushNewState([leftIdx, middleIdx]);
      leftIdx++;
    } else if (elements[middleIdx].getValue() >= rightValue) {
      while (
        elements[rightIdx].getValue() > rightValue &&
        middleIdx < rightIdx
      ) {
        rightIdx--;
      }
      pushNewState([middleIdx, rightIdx]);
      swap(elements, middleIdx, rightIdx);
      pushNewState([middleIdx, rightIdx]);
      rightIdx--;
      if (elements[middleIdx].getValue() < leftValue) {
        pushNewState([leftIdx, middleIdx]);
        swap(elements, leftIdx, middleIdx);
        pushNewState([leftIdx, middleIdx]);
        leftIdx++;
      }
    }
    middleIdx++;
  }
  leftIdx--;
  rightIdx++;
  pushNewState([leftIdx, start]);
  pushNewState([rightIdx, end]);
  swap(elements, leftIdx, start);
  swap(elements, rightIdx, end);
  pushNewState([leftIdx, start]);
  pushNewState([rightIdx, end]);
  return [leftIdx, rightIdx];
};

const quickSortDualPivotHelper = (start = 0, end = arr.length - 1) => {
  if (start >= end) return;

  const [leftIdx, rightIdx] = partitionDual(start, end);

  quickSortDualPivotHelper(start, leftIdx - 1);
  quickSortDualPivotHelper(leftIdx + 1, rightIdx - 1);
  quickSortDualPivotHelper(rightIdx + 1, end);
};

export const quickSortDualPivot = () => {
  quickSortDualPivotHelper();
  pushLastState();
};

// ====== QUICK SORT DUAL PIVOT ======

// ====== SELECTION SORT ======

export const selectionSort = () => {
  for (let i = 0; i < count - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < count; j++) {
      pushNewState([j, minIdx]);
      if (elements[j].getValue() < elements[minIdx].getValue()) {
        minIdx = j;
      }
      pushNewState([j, minIdx]);
    }
    pushNewState([i, minIdx]);
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);
  }
  pushLastState();
};

// ====== SELECTION SORT ======

// ====== DOUBLE SELECTION SORT ======

export const doubleSelectionSort = () => {
  let i = 0,
    j = count - 1;
  while (i < j) {
    let minIdx = i;
    let min = elements[i].getValue();
    let maxIdx = i;
    let max = elements[i].getValue();

    for (let k = i; k <= j; k++) {
      pushNewState([k, minIdx, maxIdx]);
      if (elements[k].getValue() < min) {
        minIdx = k;
        min = elements[k].getValue();
      } else if (elements[k].getValue() > max) {
        maxIdx = k;
        max = elements[k].getValue();
      }
      pushNewState([k, minIdx, maxIdx]);
    }
    pushNewState([i, minIdx]);
    swap(elements, i, minIdx);
    pushNewState([i, minIdx]);

    if (elements[minIdx].getValue() === max) {
      pushNewState([j, minIdx]);
      swap(elements, j, minIdx);
      pushNewState([j, minIdx]);
    } else {
      pushNewState([j, maxIdx]);
      swap(elements, j, maxIdx);
      pushNewState([j, maxIdx]);
    }
    i++;
    j--;
  }
  pushLastState();
};

// ====== DOUBLE SELECTION SORT ======

// ====== GNOME SORT ======

export const gnomeSort = () => {
  let currentIdx = 0;
  while (true) {
    if (currentIdx === count - 1) break;
    if (
      currentIdx < count - 1 &&
      elements[currentIdx].getValue() > elements[currentIdx + 1].getValue()
    ) {
      let continueIdx = currentIdx;
      while (
        currentIdx >= 0 &&
        elements[currentIdx].getValue() > elements[currentIdx + 1].getValue()
      ) {
        pushNewState([currentIdx, currentIdx + 1]);
        swap(elements, currentIdx, currentIdx + 1);
        pushNewState([currentIdx, currentIdx + 1]);
        currentIdx--;
      }
      currentIdx = continueIdx;
    } else {
      currentIdx++;
    }
  }
  pushLastState();
};

// ====== GNOME SORT ======

// ====== INSERTION SORT ======

export const insertionSort = () => {
  for (let i = 1; i < count; i++) {
    let { y, height } = elements[i];
    let j = i - 1;
    while (j >= 0 && height < elements[j].getValue()) {
      pushNewState([j, j + 1]);
      elements[j + 1].y = elements[j].y;
      elements[j + 1].height = elements[j].height;
      pushNewState([j, j + 1]);
      j--;
    }
    pushNewState([j + 1, i]);
    elements[j + 1].y = y;
    elements[j + 1].height = height;
    pushNewState([j + 1, i]);
  }
  pushLastState();
};

// ====== INSERTION SORT ======

// ====== COMB SORT ======

export const combSort = () => {
  let gap = elements.length;
  let shrinkFactor = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < elements.length; i++) {
      if (elements[i].getValue() > elements[i + gap].getValue()) {
        pushNewState([i, i + gap]);
        swap(elements, i, i + gap);
        sorted = false;
      }
      pushNewState([i, i + gap]);
    }
  }
  pushLastState();
};

// ====== COMB SORT ======
/*
// ====== MERGE SORT ======

const mergeSortHelper = (start, end) => {
  if ((start === end) || (start + 1 === end)) return;
  
	let mid = start + Math.floor((end - start) / 2);
	mergeSort(start, mid);
	mergeSort(mid, end);

	let i = start;
	let j = mid;
  let list = [];
  
	while (i < mid && j < end) {
		if (elements[i].getValue() < elements[j].getValue()) {
      let element = new Bar(
        elements[i].x,
        elements[start + list.length].y,
        elements[i].width,
        elements[start + list.length].height,
        elements[i].color,
      );
      list.push(element);
			i++;
		} else {
      let element = new Bar(
        elements[j].x,
        elements[start + list.length].y,
        elements[j].width,
        elements[start + list.length].height,
        elements[j].color,
      );
      list.push(element);
			j++;
		}
	}
	while (i < mid) {
    let element = new Bar(
      elements[i].x,
      elements[start + list.length].y,
      elements[i].width,
      elements[start + list.length].height,
      elements[i].color,
    );
    list.push(element);
		i++;
	}
	while (j < end) {
    let element = new Bar(
      elements[j].x,
      elements[start + list.length].y,
      elements[j].width,
      elements[start + list.length].height,
      elements[j].color,
    );
    list.push(element);
		j++;
  }



  // TODOOOOOOOOO



  
  for (let l = start; l < end; l++) {
    pushNewState([l]);
    let element = new Bar(
      elements[l-start].x,
      elements[l].y,
      elements[l-start].width,
      elements[l].height,
      elements[l-start].color,
    );
    elements[l] = element;
    pushNewState([l]);
  }
}

export const mergeSort = (start = 0, end = count - 1) => {
  mergeSortHelper(start, end);
  pushLastState();
};

// ====== MERGE SORT ======
*/
// ====== COMB GNOME SORT ======

export const combGnomeSort = () => {
  let gap = elements.length;
  let shrinkFactor = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrinkFactor);

    if (gap <= 16) {
      break;
    }

    for (let i = 0; i + gap < elements.length; i++) {
      if (elements[i].getValue() > elements[i + gap].getValue()) {
        pushNewState([i, i + gap]);
        swap(elements, i, i + gap);
      }
      pushNewState([i, i + gap]);
    }
  }
  gnomeSort();
};

// ====== COMB GNOME SORT ======

// ====== QUICK GNOME SORT ======

const quickGnomeHelper = (start = 0, end = arr.length - 1) => {
  if (end - start < 16) {
    return;
  }

  const pivotIdx = partitionLR(start, end);

  quickGnomeHelper(start, pivotIdx - 1);
  quickGnomeHelper(pivotIdx + 1, end);
};

export const quickGnomeSort = () => {
  quickGnomeHelper();
  gnomeSort();
};

// ====== QUICK GNOME SORT ======

const pushLastState = () => {
  // Push last state with no accent colors
  const newState = [];
  for (let k = 0; k < count; k++) {
    let color = '#f8efba';

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
    } else if (vMethod === 'scatterPlot') {
      element = new Dot(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
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

const pushNewState = (accentIdxs = []) => {
  const newState = [];

  for (let i = 0; i < accentIdxs.length; i++) {
    let color = '#ff0000';
    let k = accentIdxs[i];

    let element;

    if (vMethod === 'barPlot') {
      element = new Bar(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
    } else if (vMethod === 'hrPyramid') {
      element = new Bar(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
    } else if (vMethod === 'scatterPlot') {
      element = new Dot(
        elements[k].x,
        elements[k].y,
        elements[k].width,
        elements[k].height,
        color
      );
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

// Custom swap function to swap Bar and Dot elements
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

const midValue = (i1, i2, i3) => {
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

/*

//=================== RADIX SORT ===================//


function getMax() { 
    let mx = vektor[0];
    for (let i = 1; i < vektor.length; i++) {
        if (vektor[i] > mx) {
            mx = vektor[i]; 
        }
    }
    return mx;
}
function countSort(n, exp) { 
    var output = [];
    var count = [];
    for (let j = 0; j < n; j++) {
    	output.push(1);
    	if (j < 10) {
    		count.push(0);
    	}
    } 
    for (let i = 0; i < n; i++) {
        count[(Math.floor(vektor[i]/exp))%10] += 1;
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]; 
    }
    for (let i = n - 1; i >= 0; i--) {
        output[count[(Math.floor(vektor[i]/exp))%10] - 1] = vektor[i];
        count[(Math.floor(vektor[i]/exp))%10] -= 1;
    }
    for (let i = 0; i < n; i++) {
        vektor[i] = output[i];
        setTimeout(function() {
	        document.getElementsByClassName('n' + i)[0].style.height = ((output[i] / brojBrojeva) * 600).toString() + "px";
	        document.getElementsByClassName('n' + i)[0].style.marginTop = (600 - (output[i] / brojBrojeva) * 600).toString() + "px";
	    }, k * fr);
	    k++;
    }
}
function radixsort(n) {
    var m = getMax();
    for (let exp = 1; Math.floor(m/exp) > 0; exp *= 10) {
        countSort(n, exp);
    }
}
function main() { 
    radixsort(vektor.length);
}


function manji(a, b) {
	return vektor[a] < vektor[b];
}

function mergeSort(start, end, x) {
	if ((start == end) || (start + 1 == end)) return;
	let mid = start + Math.floor((end - start) / 2);
	mergeSort(start, mid, x+1);
	setTimeout(function() {
		var el3 = document.getElementsByClassName('n' + mid)[0];
		el3.style.backgroundColor = "red";
	}, k*fr / 4);
	mergeSort(mid, end, x+1);

	i = start;
	j = mid;
	let lista = [];
	let el3, el4;
	while (i < mid && j < end) {
		if (manji(i, j)) {
			lista.push(vektor[i]);
			i++;
		} else {
			lista.push(vektor[j]);
			j++;
		}
	}
	while (i < mid) {
		lista.push(vektor[i]);
		i++;
	}
	while (j < end) {
		lista.push(vektor[j]);
		j++;
	}
	setTimeout(function() {
		var el3 = document.getElementsByClassName('n' + mid)[0];
		el3.style.backgroundColor = "rgb(200,200,200)";
	}, k*fr / 4);
	if (x % 2 == 0) {
		for (let l = start; l < end; l++) {
			vektor[l] = lista[l-start];
			setTimeout(function() {
				var el1 = document.getElementsByClassName('n' + l)[0];
				el1.style.height = ((lista[l-start] / brojBrojeva) * 600).toString() + "px";
				el1.style.marginTop = (600 - (lista[l-start] / brojBrojeva) * 600).toString() + "px";
			}, k * fr / 4);
			k++;
		}
	} else {
		for (let l = end - 1; l >= start; l--) {
			vektor[l] = lista[l-start];
			setTimeout(function() {
				var el1 = document.getElementsByClassName('n' + l)[0];
				el1.style.height = ((lista[l-start] / brojBrojeva) * 600).toString() + "px";
				el1.style.marginTop = (600 - (lista[l-start] / brojBrojeva) * 600).toString() + "px";
			}, k * fr / 4);
			k++;
		}
	}
	
}

*/