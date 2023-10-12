const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);

const [y, x, yTerm, xTerm] = input;

let cnt = 0;

for (let i = 0; i < y; i += (yTerm + 1)){
  for (let j = 0; j < x; j += (xTerm + 1)){
    cnt += 1;
  }
}
console.log(cnt)