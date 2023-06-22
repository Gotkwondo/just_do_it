const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const [height, width, n] = input.shift().split(' ').map(e => +e.trim());
const algo = input.pop().split(' ').map(e => +e);
const array = input.map(e => e.split(' ').map(e => +e.trim()));

// 상하 반전
const first = (arr) => {
  return arr.reverse();
}

const second = (arr) => {
  return arr.map(e => e.reverse());
}

const rotate90 = (arr) => {
  const h = arr.length;
  const w = arr[0].length;
  let answer = Array.from(Array(w), () => new Array(h));
  // 90도 회전하며 기존의 w와 h의 길이가 서로 바뀜
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      answer[i][j] = arr[h - j - 1][i];
    }
  }
  return answer;
};

const rotate90Quad = (arr) => {
  const h = arr.length / 2;
  const w = arr[0].length / 2;
  const upper = arr.slice(0, h);
  const lower = arr.slice(h);
  
  const area1 = upper.map(e => e.slice(0, w)),
    area2 = upper.map(e => e.slice(w)),
    area4 = lower.map(e => e.slice(0, w)),
    area3 = lower.map(e => e.slice(w));
  
  return [
    ...area4.map((e, i) => [...e, ...area1[i]]),
    ...area3.map((e, i) => [...e, ...area2[i]])
  ];
};

const test11 = algo.reduce((acc, e) => {
  if (e === 1) {
    return first(acc);
  }
  else if (e === 2) {
    return second(acc);
  }
  else if (e === 3) {
    return rotate90(acc);
  }
  else if (e === 4) {
    return rotate90(rotate90(rotate90(acc)));
  }
  else if (e === 5) {
    return rotate90Quad(acc);
  }
  else if (e === 6) {
    return rotate90Quad(rotate90Quad(rotate90Quad(acc)));
  }
}, array);

console.log(test11.flat().reduce((acc, e) => acc += e + '\n', ''));

// 6 8 6
// 3 2 6 3 1 2 9 7
// 9 7 8 2 1 4 5 3
// 5 9 2 1 9 6 1 8
// 2 1 3 8 6 3 9 2
// 1 3 2 8 7 9 2 1
// 4 5 1 9 8 2 1 3
// 1 2 3 4 5 6