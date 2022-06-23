function solution(N, number) {
    const useArr = Array.from(new Array(9), () => new Set());
    if(N === number){
        return 1;
    }
    else{
        useArr.forEach((e, i) => {
            if(i !== 0) e.add(Number(String(N).repeat(i)));
        });
      //  여기서 부터 동적 계획법을 이용하여 연산한다.
      
        for(let i=1; i<useArr.length; i++){
            for(let j=1; j<i; j++){
                for(let item1 of useArr[j]){
                    for(let item2 of useArr[i-j]){
                        useArr[i].add(item1 + item2);
                        useArr[i].add(item1 - item2);
                        useArr[i].add(item1 * item2);
                        useArr[i].add(Math.floor(item1 / item2));
                    }
                }
            }
            if(useArr[i].has(number)){
                return i
            }
        }
        return -1
    }
}