// 4 7
// 6 13
// 4 8
// 3 6
// 5 12

const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(Number));

const [n, maxWeight] = input.shift();
const things = input;

let arr = Array.from({ length: n + 1 }, () => Array(maxWeight + 1).fill(0));

for (let i = 1; i <= n; i++){
  const [W, V] = things[i-1];
  for (let j = 1; j <= maxWeight; j++){
    if (j - W >= 0) {
      // arr[i - 1][j - W] + V 에서 arr[i - 1][j - W]은 표현할 무게(j)에서 지금 넣을 무게 W를 뺀 무게에서의 값을 구하는 것이다.
      arr[i][j] = Math.max(arr[i - 1][j - W] + V, arr[i - 1][j]);
    }
    else {
      arr[i][j] = arr[i - 1][j];
    }
  }
}

console.log(arr)