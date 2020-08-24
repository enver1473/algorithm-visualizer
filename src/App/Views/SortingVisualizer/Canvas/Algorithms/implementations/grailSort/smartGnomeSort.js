import { swap, pushNewState } from '../../helperFunctions';

class SmartGnomeSort {
  // Taken from https://en.wikipedia.org/wiki/Gnome_sort
  smartGnomeSort(array, upperBound) {
    let pos = upperBound;

    while (pos > 0 && array[pos - 1].getValue() > array[pos].getValue()) {
      pushNewState([pos - 1, pos]);
      swap(array, pos - 1, pos);
      pushNewState([pos - 1, pos]);
      pos--;
    }
  }

  customSort(array, low, high) {
    for (let i = low + 1; i < high; i++) {
      this.smartGnomeSort(array, i);
    }
  }

  runSort(array, length) {
    for (let i = 1; i < length; i++) {
      this.smartGnomeSort(array, i);
    }
  }
}

export default SmartGnomeSort;
