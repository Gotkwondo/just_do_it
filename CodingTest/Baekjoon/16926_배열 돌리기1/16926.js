const path = __dirname + '/예제.txt'; // /dev/stdin
let input = require('fs').readFileSync(path).toString().trim().split('\n').map(e => e.split(' '));

const [N, M, rotaTime] = input.shift().map(Number);
const board = input.map(e => e.map(Number));

const solution = (N, M, board) => {
  let answer = ''
  let arr = [...board];
  for (let i = 0; i < rotaTime; i++){
    const newArr = spin(N, M, arr);
    arr = [...newArr];
  }
  arr.forEach(e => {
    answer += e.join(' ') + '\n';
  })
  return console.log(answer.trim())
}

/**
 * 배열을 내외부 모두 1번 회전 시켜주는 함수
 * @param N board.length 상하 높이 
 * @param M board[n].length 좌우 너비
 * @param board 2차원 배열
 * @returns 
 */
const spin = (N, M, board) => {
  let min = Math.floor(Math.min(N, M) / 2);
  let newArr = Array(N).fill(null).map(_ => new Array(M).fill(0));

  // 외부의 셀부터 내부 셀까지 반복하는 횟수
  for (let i = 0; i < min; i++){
    // 좌표가 역으로 가는 경우(왼쪽으로, 윗쪽으로)시작이 마지막 인덱스 -1 이며 인덱스 값으로 생각해야하니 총 -2를 하고 시작하며 --연산으로 for문 실행

    // 맨 윗줄은 오른쪽 모서리 부분을 제외하고 오른쪽에서 왼쪽으로 값 할당, 할당 받는 좌표 기준이기에 j는 0까지 동작
    for (let j = (M - 2) - i; j >= i; j--){
      newArr[i][j] = board[i][j + 1];
    }
    
    // 왼쪽줄은 위에서 아래로 흐르며, 맨 위 모서리를 제외한 나머지 블럭에 할당
    for (let j = 1 + i; j < N - i; j++){
      newArr[j][i] = board[j - 1][i];
    }
    
    // 맨 아래줄은 좌에서 우로 이동하며, 맨 왼쪽 모서리를 제외한 블럭에 할당
    for (let j = 1 + i; j < M - i; j++){
      newArr[(N - 1) - i][j] = board[(N - 1) - i][j - 1];
    }
    
    
    for (let j = (N - 2) - i; j >= i; j--){
      newArr[j][(M - 1) - i] = board[j + 1][(M - 1) - i];
    }
  }
  
  return newArr;
}

solution(N, M, board);

// 2 2 3
// 1 1
// 1 1