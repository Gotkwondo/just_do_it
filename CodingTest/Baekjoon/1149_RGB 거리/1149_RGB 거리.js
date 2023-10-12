const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(Number));

const n = input.shift();
const houses = input;

for (let i = 1; i < n; i++){
  houses[i][0] += Math.min(houses[i - 1][1], houses[i - 1][2]);
  houses[i][1] +=  Math.min(houses[i - 1][0], houses[i - 1][2]);
  houses[i][2] +=  Math.min(houses[i - 1][0], houses[i - 1][1]);
}

console.log(Math.min(...houses[n - 1]));