function solution(absolutes, signs) {
  return absolutes.reduce((i, a, index) => {
    if (signs[index]) {
      return i + a;
    }
    return i - a;
  }, 0);
}

//  다른 사람의 코드
function solution(absolutes, signs) {
  return absolutes.reduce((i, a, index) => {
    return i += signs[index] ? a : a * (-1);
  }, 0);
}
