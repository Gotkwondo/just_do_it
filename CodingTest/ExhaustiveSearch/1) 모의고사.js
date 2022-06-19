function solution(answers) {
    const pattern = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    ]
    let score = [0, 0, 0];
    
    for(let i=0; i<answers.length; i++){
        if(pattern[0][i%5] === answers[i]) score[0]++;
        if(pattern[1][i%8] === answers[i]) score[1]++;
        if(pattern[2][i%10] === answers[i]) score[2]++;
    }
    
    const max = Math.max(...score);
    
    let answer = [];
    for(let i=0; i<score.length; i++){
        if(score[i] === max){
            answer.push(i+1)
        }
    }
    return answer
}