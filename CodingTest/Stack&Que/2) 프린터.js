function solution(priorities, location) {
    let answer = 0;
    let prioArr = priorities.map((p, i) => {return [i, p]})
    let arr = [];
    
    if(prioArr.length){
        while(prioArr.length > 0){
            let firstNum = prioArr.shift()
            
            if(prioArr.find(n => n[1] > firstNum[1])){
                prioArr.push(firstNum);
            }
            else{
                arr.push(firstNum);
            }
        }
    }
    
    arr.forEach((l, i) => {
        if(l[0] === location){
            return answer = i+1;
        }
    })
    console.log(arr);
    return answer;
    
}