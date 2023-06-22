const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(Number));

const [N] = input.shift();
const list = input.slice();

// 스택으로 사용. 맨 뒤 작업의 시간이 0이되면 방출
let doingList = [];
let score = 0;

for (let i = 0; i < N; i++){
  if (list[i].length === 3) {
    doingList.push(list[i]);
  }
  
  if (doingList.length) {
    doingList[doingList.length - 1][2] -= 1;
    if (doingList[doingList.length - 1][2] === 0) {
      score += doingList.pop()[1];
    }
  }
}

console.log(score);

// 5
// 1 10 3
// 0
// 1 100 2
// 1 20 1
// 0