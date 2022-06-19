function solution(operations) {
    let answer = [];
    let operationsQue = [];
    let valuesQue = [];
    
    for(let i=0; i<operations.length; i++){
        const op = operations[i].slice(0, 1);
        const value = parseInt(operations[i].slice(2));
        operationsQue.push([op, value]);
    }
    
    for(let i=0; i<operationsQue.length; i++){
        if(!valuesQue.length){
            if(operationsQue[i][0] === 'I'){
                valuesQue.push(operationsQue[i][1])
            }
        }
        else{
            if(operationsQue[i][0] === 'D'){
                if(operationsQue[i][1] < 0){
                    //  최솟값 삭제 로직
                    valuesQue.splice(-1, 1);
                }
                else{
                    //  최대값 삭제 로직
                    valuesQue.shift();
                }
            }
            if(operationsQue[i][0] === 'I'){
                valuesQue.push(operationsQue[i][1])
            }
        }
        valuesQue.sort((a, b) => b - a);
    }
    console.log(operationsQue)
    
    if(!valuesQue.length){
        answer.push(0, 0);
    }
    else{
        const max = Math.max(...valuesQue);
        const min = Math.min(...valuesQue);
        answer.push(max, min);
    }
    
    return answer;
}