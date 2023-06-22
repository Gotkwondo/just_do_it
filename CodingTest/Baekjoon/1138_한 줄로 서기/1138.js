const path = __dirname + '/예제.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const num = +input[0];
const rule = input[1].split(' ').map(e => +e);

const sol = (n, array) => {
  let arr = new Array(n);

  for (let i = 0; i < array.length; i++) {
    let left = array[i];
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (left === cnt && !arr[j]) {
        arr[j] = i + 1;
        break;
      }
      else if (!arr[j]) {
        cnt += 1;
      }
    }
  }
  console.log(arr.join(' '));
}
sol(num, rule);

// 예제
// 7
// 6 1 1 1 2 0 0