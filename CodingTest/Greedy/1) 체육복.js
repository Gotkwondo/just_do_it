function solution(n, lost, reserve) {
    let answer = 0;
    let arr = [];
    
    for(let i=0; i<n; i++){
        arr[i] = 1
    }
    for(let i=0; i<lost.length; i++){
        arr[lost[i]-1] = 0;
    }
    for(let i=0; i<reserve.length; i++){
        arr[reserve[i]-1] += 1;
    }
    
    for(let i=0; i<arr.length; i++){
        if(arr[i-1] === 2 && arr[i] === 0){
            arr[i-1] = 1;
            arr[i] = 1;
        }
        if(arr[i+1] === 2 && arr[i] === 0){
            arr[i+1] = 1;
            arr[i] = 1;
        }
    }
    
    for(let i=0; i<arr.length; i++){
        if(arr[i] > 0){
            answer++;
        }
    }
    
    console.log(arr);
    console.log(answer)
    
    
    return answer;
}