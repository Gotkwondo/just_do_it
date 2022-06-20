function solution(name) {
    let count = 0;
    let AlphArr = Array.from({length: 26}, (v, i) => String.fromCharCode(i + 65));
    
    for(let i=0; i<name.length; i++){
        let diff = AlphArr.indexOf(name[i])
        
        count += diff > 13 ? 26 - diff : diff;
    }
    
    let move = name.length - 1;
    for(let i=1; i<name.length; i++){
        if(name[i] === 'A'){
            //  var은 함수 단위 스코프를 갖기에 for문과 상관없이 함수 내의 어느 곳에서 참조 가능
            for(var j=i+1; j<name.length; j++){
                if(name[j] !== 'A'){
                    break;
                }
            }
            const left = i - 1;
            const right = name.length - j;
            move = Math.min(move, left > right ? left + right*2 : left*2 + right);
            
            i=j;
        }
    }
    console.log(move);
    console.log(count);
    return count + move;
}