import { arr } from '../../Canvas';
import { partitionLR } from './quickSortLR';
import { gnomeSort } from './gnomeSort';

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