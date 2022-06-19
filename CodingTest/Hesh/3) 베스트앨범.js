function solution(genres, plays) {
    let answer =[];
    
    let pcg = {};
    for(let i=0; i<genres.length; i++){
        pcg[genres[i]] = pcg[genres[i]] ? pcg[genres[i]] + plays[i] : plays[i];
    }
    
    let keyValueArr = Object.entries(pcg).sort((a,b) => b[1]-a[1]);
    
    let allInfo = genres.map((g, i) => ({
        genres: g,
        index: i,
        playCnt: plays[i],
    }));
    
    keyValueArr.forEach(k =>{
        let current =[];
        
        for(let i=0; i<allInfo.length; i++){
            if(k[0] === allInfo[i].genres){
                current.push(allInfo[i]);
            }
        }
        current.sort((a, b) => b.playCnt - a.playCnt);
        current.forEach((c, i) =>{
            if(i<2)
                answer.push(c.index);
        })
    })
    return answer;
}