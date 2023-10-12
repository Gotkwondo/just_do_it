const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(Number).sort((a, b) => b - a));

const arr = input.slice(0, input.length - 1);
let answer = '';

arr.forEach(e => {
  if (e[0] >= e[1] + e[2]) {
    answer += 'Invalid\n';
  }
  else if ((e[0] === e[1] && e[0] !== e[2]) || (e[1] === e[2] && e[0] !== e[1])) {
    answer += 'Isosceles\n';
  }
  else if (e[0] === e[1] && e[1] === e[2] && e[2] === e[1]) {
    answer += 'Equilateral\n';
  }
  else if (e[0] !== e[1] && e[1] !== e[2] && e[2] !== e[1]) {
    answer += 'Scalene\n';
  }
  
})

console.log(answer);