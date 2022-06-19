function solution(n, computers) {
    let answer = 0;
    let visited = [];   //  방문 여부를 기록
    
    const dfs = (index) => {
        visited[index] = 1;
        
        for(let j=0; j<computers[index].length; j++){
            if(!visited[j] && computers[index][j] === 1){
                dfs(j);
            }
        }
    }
    for(let i=0; i<computers.length; i++){
        if(!visited[i]){
            dfs(i);
            answer++;
        }
    }
    return answer;
}