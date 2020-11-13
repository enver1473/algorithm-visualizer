export const speedMarks = {
  1: '1',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  60: '60',
};

export const incrementMarks = {
  1: '1',
  2: '2',
  3: '4',
  4: '8',
  5: '16',
  6: '32',
  7: '64',
  8: '128',
  9: '256',
};

export const visualizationOptions = [
  {
    value: 'barPlot',
    label: 'Standard Bar Plot',
  },
  {
    value: 'hrPyramid',
    label: 'Horizontal Pyramid',
  },
  {
    value: 'scatterPlot',
    label: 'Scatter Plot',
  },
  {
    value: 'rainbow',
    label: 'Rainbow',
  },
  {
    value: 'rainbowBarPlot',
    label: 'Rainbow Bar Plot',
  },
  {
    value: 'rainbowCircle',
    label: 'Rainbow Circle',
  } /*
  {
    value: 'disparityCircle',
    label: 'Disparity Circle',
  },*/,
];

export const algoCascaderOptions = [
  {
    value: 'countingSorts',
    label: 'Counting Sorts',
    children: [
      {
        value: 'radixSortLSDb10',
        label: 'Radix Sort LSD (base 10)',
      },
      {
        value: 'radixSortLSDb8',
        label: 'Radix Sort LSD (base 8)',
      },
      {
        value: 'radixSortLSDb4',
        label: 'Radix Sort LSD (base 4)',
      },
      {
        value: 'radixSortLSDb2',
        label: 'Radix Sort LSD (base 2)',
      }/*
      {
        value: 'radixSortMSD',              // not working properly
        label: 'Radix Sort MSD (base 4)',
      } 
      {
        value: 'proxmapSort',
        label: 'Proxmap Sort',
      },*/,
    ],
  },
  {
    value: 'exchangeSorts',
    label: 'Exchange Sorts',
    children: [
      {
        value: 'bubbleSort',
        label: 'Bubble Sort',
      },
      {
        value: 'coctailShakerSort',
        label: 'Coctail Shaker Sort',
      },
      {
        value: 'gnomeSort',
        label: 'Gnome Sort',
      },
      {
        value: 'combSort',
        label: 'Comb Sort',
      },
    ],
  },
  {
    value: 'selectionSorts',
    label: 'Selection Sorts',
    children: [
      {
        value: 'selectionSort',
        label: 'Selection Sort',
      },
      {
        value: 'doubleSelectionSort',
        label: 'Double Selection Sort',
      },
      {
        value: 'maxHeapSort',
        label: 'Max Heap Sort',
      },
      {
        value: 'minHeapSort',
        label: 'Min Heap Sort',
      },
      {
        value: 'minMaxHeapSort',
        label: 'Min-Max Heap Sort',
      },
      {
        value: 'unbalancedTreeSort',
        label: 'Tree Sort',
      },
    ],
  },
  {
    value: 'hybridSorts',
    label: 'Hybrid Sorts',
    children: [
      {
        value: 'combGnomeSort',
        label: 'Comb Gnome Sort',
      },
      {
        value: 'quickGnomeSort',
        label: 'Quick Gnome Sort',
      },
      {
        value: 'weaveMergeSort',
        label: 'Weave Merge Sort',
      },
      {
        value: 'rotateRoomSort',
        label: 'Rotate Room Sort',
      },
      {
        value: 'optimizedRotateRoomSort',
        label: 'Optimized Rotate Room Sort',
      },
      {
        value: 'grailSort',
        label: 'Grail Sort',
      },/*
      {
        value: 'rewrittenGrailSort',
        label: 'Rewritten Grail Sort',
      },*/
      {
        value: 'rotateRoomShakerSort',
        label: 'Rotate Room Shaker Sort',
      },
      {
        value: 'advancedRoomSort',
        label: 'Advanced Room Sort',
      },
      {
        value: 'advancedRoomShaker',
        label: 'Advanced Room Shaker Sort',
      },/*
      {
        value: 'bufferedRoomSort',
        label: 'Buffered Room Sort',
      },*/
    ],
  },
  {
    value: 'distributionSorts',
    label: 'Distribution Sorts',
    children: [
      {
        value: 'quickSortLL',
        label: 'Quick Sort LL Pointers',
      },
      {
        value: 'quickSortLR',
        label: 'Quick Sort LR Pointers',
      },
      {
        value: 'quickSortDualPivot',
        label: 'Quick Sort Dual Pivot',
      },
    ],
  },
  {
    value: 'mergeSorts',
    label: 'Merge Sorts',
    children: [
      {
        value: 'mergeSort',
        label: 'Merge Sort',
      },
      {
        value: 'bottomUpMergeSort',
        label: 'Bottom-up Merge Sort',
      },
      {
        value: 'mergeSortInPlace',
        label: 'Merge Sort (in-place)',
      },
      {
        value: 'recursiveRotateMerge',
        label: 'Recursive Rotate Merge Sort',
      },
    ],
  },
  {
    value: 'insertionSorts',
    label: 'Insertion Sorts',
    children: [
      {
        value: 'insertionSort',
        label: 'Insertion Sort',
      },
      {
        value: 'binaryInsertionSort',
        label: 'Binary Insertion Sort',
      },
      {
        value: 'shellSort',
        label: 'Shell Sort',
      },
      {
        value: 'roomSort',
        label: 'Room Sort',
      },
      {
        value: 'optimizedRoomSort',
        label: 'Optimized Room Sort',
      },
    ],
  },
  {
    value: 'concurrentSorts',
    label: 'Concurrent Sorts',
    children: [
      {
        value: 'iterativePairwiseNetwork',
        label: 'Iterative Pairwise Network',
      },
      {
        value: 'recursivePairwiseNetwork',
        label: 'Recursive Pairwise Network',
      },
    ],
  },
  {
    value: 'impracticalSorts',
    label: 'Impractical Sorts',
    children: [
      {
        value: 'stoogeSort',
        label: 'Stooge Sort',
      },
    ],
  },
];

export const inputArrayOptions = [
  {
    value: 'default',
    label: 'Random (uniform distribution)',
  },
  {
    value: 'randomGaussian',
    label: 'Random (gaussian distribution)',
  },
  {
    value: 'alreadySorted',
    label: 'Already Sorted',
  },
  {
    value: 'almostSorted',
    label: 'Almost sorted',
  },
  {
    value: 'reversed',
    label: 'Reversed input',
  },
  {
    value: 'threeUnique',
    label: '3 unique values',
  },
  {
    value: 'doubleSlope',
    label: 'Double-slope',
  },
  {
    value: 'sinDistribution',
    label: 'Sin Distribution',
  },
  {
    value: 'sawTooth',
    label: 'Saw Tooth',
  },
];
