function solution(begin, target, words) {
    let answer = 0;
    let que = [];
    let visited = [];
    
    if(!words.includes(target)) return 0;
    
    que.push([begin, answer]);
    
    while(que.length){
        let [v, c] = que.shift();
        
        if(v === target){
            return c;
        }
        words.forEach(word => {
            let notMatch = 0;
            
            if(visited.includes(word))
                return;
            
            for(let i=0; i<word.length; i++){
                if(word[i] !== v[i])
                    notMatch++;
            }
            
            if(notMatch === 1){
                que.push([word, ++c]);
                visited.push(word);
            }
        })
    }
    return answer;
}