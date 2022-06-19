function solution(numbers, target) {
    let answer = 0;
    
    const dfs = (count, sum) => {
        if(count < numbers.length){
            dfs(count + 1, sum + numbers[count]);
            dfs(count + 1, sum - numbers[count]);
        }
        else{
            if(sum === target){
                answer++;
            }
            return;
        }
        
    }
    dfs(0, 0);
    return answer;
}