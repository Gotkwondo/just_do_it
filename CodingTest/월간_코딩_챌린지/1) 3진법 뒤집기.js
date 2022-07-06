function solution(n) {
  let arr = [...n.toString(3)]
  const tNum = arr.reverse().join('');
  return parseInt(tNum, 3);
}