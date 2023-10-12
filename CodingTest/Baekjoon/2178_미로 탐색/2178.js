const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(e => e));

const [N, M] = input.shift();
const goal = [N - 1, M - 1];
let board = input.map(e => [...e.toString().split('')].map(Number));

const game = (N, M, board) => {
  let newBoard = board.map(e => e)
  let rotX = [0, 0, -1, 1];
  let rotY = [-1, 1, 0, 0];
  let que = [[0, 0, 1]];

  while (que.length) {
    let [curX, curY, move] = que.shift();
    if (curY === goal[0] && curX === goal[1]) {
      console.log(move);
      break;
    }
    
    for (let i = 0; i < 4; i++) {
      let nextX = curX + rotX[i];
      let nextY = curY + rotY[i];
      
      if (nextX >= 0 && nextX < M && nextY >= 0 && nextY < N && newBoard[nextY][nextX] === 1) {
        que.push([nextX, nextY, move + 1]);
        newBoard[nextY][nextX] = 0;
      }
    }
  }
}

game(N, M, board);