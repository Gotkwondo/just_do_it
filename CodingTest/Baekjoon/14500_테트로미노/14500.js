// 빡구현을 깨닫게 해준 문제
const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' ').map(Number));

const [height, width] = input[0];
const board = input.splice(1);

// 모든 브럭의 기준은 최좌상단이며 블럭의 모양은 주어지는 i와 j를 기준으로 i+3, j+3까지의 범위를 갖는다.

//ㅇㅇㅇㅇ 인 블럭
const case1 = (i, j) => {
  if (j + 3 < width) {
    return board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i][j + 3];
  }
  return 0;
}

//ㅇ 인 모양
//ㅇ
//ㅇ
//ㅇ
const case2 = (i, j) => {
  if (i + 3 < height) {
    return board[i][j] + board[i + 1][j] + board[i + 2][j] + board[i + 3][j];
  }
  return 0;
}

//ㅇㅇ
//ㅇㅇ 인 모양
const case3 = (i, j) => {
  if (i + 1 < height && j + 1 < width) {
    return board[i][j] + board[i][j + 1] + board[i + 1][j] + board[i + 1][j + 1];
  }
  return 0;
}

//ㅇ
//ㅇ
//ㅇㅇ 인 모양
const case4 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i][j] + board[i + 1][j] + board[i + 2][j] + board[i + 2][j + 1];
  }
  return 0;
}

//ㅇㅇㅇ
//ㅇ    인 모양
const case5 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i + 1][j];
  }
  return 0;
}

//ㅇㅇ
//  ㅇ
//  ㅇ 인 모양
const case6 = (i, j) => {
  if (i+2 < height && j+1 < width) {
    return board[i][j] + board[i][j + 1] + board[i + 1][j + 1] + board[i + 2][j + 1];
  }
  return 0;
}

//    ㅇ
//ㅇㅇㅇ 인 모양
const case7 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i+1][j] + board[i + 1][j+1] + board[i + 1][j + 2] + board[i][j + 2];
  }
  return 0;
}

//ㅇㅇ
//ㅇ
//ㅇ  인 모양
const case8 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i][j] + board[i][j + 1] + board[i + 1][j] + board[i + 2][j];
  }
  return 0;
}

//ㅇㅇㅇ
//    ㅇ 인 모양
const case9 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i + 1][j + 2];
  }
  return 0;
}

//  ㅇ
//  ㅇ
//ㅇㅇ 인 모양
const case10 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i + 2][j] + board[i + 2][j + 1] + board[i + 1][j + 1] + board[i][j + 1];
  }
  return 0;
}

//ㅇ
//ㅇㅇㅇ 인 모양
const case11 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j] + board[i + 1][j] + board[i + 1][j + 1] + board[i + 1][j + 2];
  }
  return 0;
}

//ㅇ
//ㅇㅇ
//  ㅇ 인 모양
const case12 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i][j] + board[i + 1][j] + board[i + 1][j + 1] + board[i + 2][j + 1];
  }
  return 0;
}

//  ㅇㅇ
//ㅇㅇ   인 모양
const case13 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i+1][j] + board[i+1][j + 1] + board[i][j + 1] + board[i][j + 2];
  }
  return 0;
}

//  ㅇ
//ㅇㅇ
//ㅇ   인 모양
const case14 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i + 1][j] + board[i + 2][j] + board[i + 1][j + 1] + board[i][j + 1];
  }
  return 0;
}

//ㅇㅇ
//  ㅇㅇ 인 모양
const case15 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j] + board[i][j + 1] + board[i + 1][j + 1] + board[i + 1][j + 2];
  }
  return 0;
}

//  ㅇ
//ㅇㅇㅇ 인 모양
const case16 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j + 1] + board[i + 1][j] + board[i + 1][j + 1] + board[i + 1][j + 2];
  }
  return 0;
}

//ㅇ
//ㅇㅇ
//ㅇ  인 모양
const case17 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i][j] + board[i + 1][j] + board[i + 2][j] + board[i + 1][j + 1];
  }
  return 0;
}

//ㅇㅇㅇ
//  ㅇ  인 모양
const case18 = (i, j) => {
  if (i + 1 < height && j + 2 < width) {
    return board[i][j] + board[i][j + 1] + board[i][j + 2] + board[i + 1][j + 1];
  }
  return 0;
}

//  ㅇ
//ㅇㅇ
//  ㅇ 인 모양
const case19 = (i, j) => {
  if (i + 2 < height && j + 1 < width) {
    return board[i + 1][j] + board[i][j + 1] + board[i + 1][j + 1] + board[i + 2][j + 1];
  }
  return 0;
}

let max = 0
for (let i = 0; i < height; i++){
  for (let j = 0; j < width; j++){
    max = Math.max(
      max,
      case1(i, j),
      case2(i, j),
      case3(i, j),
      case4(i, j),
      case5(i, j),
      case6(i, j),
      case7(i, j),
      case8(i, j),
      case9(i, j),
      case10(i, j),
      case11(i, j),
      case12(i, j),
      case13(i, j),
      case14(i, j),
      case15(i, j),
      case16(i, j),
      case17(i, j),
      case18(i, j),
      case19(i, j),
    )
  }
}

console.log(max)

// 4 10
// 1 2 1 2 1 2 1 2 1 2
// 2 1 2 1 2 1 2 1 2 1
// 1 2 1 2 1 2 1 2 1 2
// 2 1 2 1 2 1 2 1 2 1