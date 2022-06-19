function solution(tickets) {
    let answer = [];
    let que = [];
    let visited = [];

    tickets.sort();

    const dfs = (start, count) => {
        que.push(start);

        if(tickets.length === count){
            answer = que;
            return true;
        }

        for(let i=0; i<tickets.length; i++){
            if(!visited[i] && tickets[i][0] === start){
                visited[i] = true;

                if(dfs(tickets[i][1], count + 1)) return true;
                visited[i] = false;
            }

        }
        que.pop();
        return false;
    }

    dfs("ICN", 0);
    return answer;
}