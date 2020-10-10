const RUN = 32;

const insertionSort = (arr, left, right) => {
  for (let i = left + 1; i <= right; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
};

// merge function merges the sorted runs
const merge = (arr, l, m, r) => {
  // original array is broken in two parts
  // left and right array
  let len1 = m - l + 1,
    len2 = r - m;
  let left = new Array(len1);
  let right = new Array(len2);
  for (let x = 0; x < len1; x++) {
    left[x] = arr[l + x];
  }
  for (let x = 0; x < len2; x++) {
    right[x] = arr[m + 1 + x];
  }

  let i = 0;
  let j = 0;
  let k = l;

  // after comparing, we merge those two array
  // in larger sub array
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // copy remaining elements of left, if any
  while (i < len1) {
    arr[k] = left[i];
    k++;
    i++;
  }

  // copy remaining element of right, if any
  while (j < len2) {
    arr[k] = right[j];
    k++;
    j++;
  }
};

// iterative Timsort function to sort the
// array[0...n-1] (similar to merge sort)
const timSort = (arr, n) => {
  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    insertionSort(arr, i, Math.min(i + 31, n - 1));
  }

  // start merging from size RUN (or 32). It will merge
  // to form size 64, then 128, 256 and so on ....
  for (let size = RUN; size < n; size = 2 * size) {
    // pick starting point of left sub array. We
    // are going to merge arr[left..left+size-1]
    // and arr[left+size, left+2*size-1]
    // After every merge, we increase left by 2*size
    for (let left = 0; left < n; left += 2 * size) {
      // find ending point of left sub array
      // mid+1 is starting point of right sub array
      let mid = left + size - 1;
      let right = Math.min(left + 2 * size - 1, n - 1);

      // merge sub array arr[left.....mid] &
      // arr[mid+1....right]
      merge(arr, left, mid, right);
    }
  }
};
