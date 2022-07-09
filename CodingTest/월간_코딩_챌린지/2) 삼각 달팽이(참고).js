function solution(n) {
  const answer = new Array(n).fill().map((_, i) => new Array(i + 1));

  let cnt = 0;
  let x = -1; //  x축
  let y = 0;  //  y축

  while(n>0){
    //  삼각형 왼쪽 빗변 채우기
    for(let i=0; i<n; i++){
      answer[++x][y] = ++cnt;
    }
    //  삼각형 맨 밑줄 채우기
    for(let i=0; i<n-1; i++){
      answer[x][++y] = ++cnt;
    }
    //  삼각형 오른쪽 빗변 채우기
    for(let i=0; i<n-2; i++){
      answer[--x][--y] = ++cnt;
    }
    //  내부가 비어있으면 내부를 채우기 위해 루프 진행 조건 갱신
    n -= 3;
  }
  return answer.flatMap(e => e);
}