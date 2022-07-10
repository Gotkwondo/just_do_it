function solution(left, right) {
    let answer = 0;
    for(let i=left; i<=right; i++){
        let count = 0;
        for(let j=1; j<=i; j++){
            if(i % j === 0){
                count += 1;
            }
        }
        if(count % 2 === 0){
            answer += i;
        }
        else{
            answer -= i;
        }
    }
    return answer;
}

//  다른 분이 작성한 코드
// function solution(left, right) {
//     var answer = 0;
//     for (let i = left; i <= right; i++) {
//         if (Number.isInteger(Math.sqrt(i))) {
//             answer -= i;
//         } else {
//             answer += i;
//         }
//     }
//     return answer;
// }