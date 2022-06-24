const binarySearch = (arr, targetValue) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === targetValue) {
      return arr[mid];
    }
    else if (arr[mid] > targetValue) {
      right = mid - 1;
    }
    else if (arr[mid] < targetValue) {
      left = mid + 1;
    }
  }
  return -1;
}
