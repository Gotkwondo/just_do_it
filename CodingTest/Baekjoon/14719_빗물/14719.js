const path = __dirname + '/예제.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const rain = input[1].split(" ").map((val) => +val);
let water = 0;

for (let i = 0; i < rain.length; i++) {
  const maxLen = Math.max(...rain.slice(0, i + 1));
  const minLen = Math.max(...rain.slice(i));
  const minBlock = Math.min(maxLen, minLen);
  water += minBlock - rain[i];
}
console.log(water);

// 4 8
// 3 1 2 3 4 1 1 2