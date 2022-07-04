function solution(sizes) {
    let rotatedArr = Array.from([...sizes], e => e.sort((a, b) => b - a));
    
    let height = rotatedArr.map(e => e[0]);
    let width = rotatedArr.map(e => e[1]);
    
    let answer = Math.max(...height) * Math.max(...width);
    // let answer = Math.max(...rotatedArr.map(e=>e[0])) * Math.max(...rotatedArr.map(e=>e[1]));
    return answer;
}