const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e);

let lineUp = input.slice(1).map(e => e.split(' ').map(e => e.split('-'))).flat();
let sortedLineUp = lineUp.map(e => e).sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]);

// FILO방식
let wait = [];

while (true) {
  if (lineUp.length === 0) {
    if (wait.length) {
      if (wait[wait.length - 1] !== sortedLineUp[0]) {
        break;
      }
      else {
        wait.pop();
        sortedLineUp.shift();
      };
    }
    else break;
  }
  if (lineUp[0] === sortedLineUp[0]) {
    lineUp.shift();
    sortedLineUp.shift();
  }
  else {
    if (wait[wait.length - 1] === sortedLineUp[0]) {
      wait.pop();
      sortedLineUp.shift();
    }
    else {
      wait.push(lineUp.shift());
    }
  }
}

console.log(wait.length > 0 ? 'BAD' : 'GOOD');