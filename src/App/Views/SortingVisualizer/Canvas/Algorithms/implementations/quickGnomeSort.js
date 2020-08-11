import { arr } from '../../Canvas';
import { partitionLR } from './quickSortLR';
import { gnomeSort } from './gnomeSort';
import { maxHeapSortHelper } from './maxHeapSort';

const quickGnomeHelper = (start = 0, end = arr.length - 1, depth = 0) => {
  if (end - start < 16) {
    return;
  }

  if (depth > 7) {
    maxHeapSortHelper(start, end);
    return;
  }

  const pivotIdx = partitionLR(start, end);

  quickGnomeHelper(start, pivotIdx - 1, depth + 1);
  quickGnomeHelper(pivotIdx + 1, end, depth + 1);
};

export const quickGnomeSort = () => {
  quickGnomeHelper();
  gnomeSort();
};