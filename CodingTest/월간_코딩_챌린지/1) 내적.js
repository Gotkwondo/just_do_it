function solution(a, b) {
    let arr = [];

    for(let i=0; i<a.length; i++){
        arr.push(a[i] * b[i]);
    }

    return arr.reduce((i, x) => i + x, 0);
}

// reduce()만 이용한 방법
function solution(a, b) {
    return a.reduce((i, x, index) => i + (a[index] * b[index]), 0);
}