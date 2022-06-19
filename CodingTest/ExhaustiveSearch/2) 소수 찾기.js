function solution(numbers) {
    const arr = numbers.split('');
    let answer = new Set();
    
    const isPrime = (number) => {
        if(number <= 1) return false;
        if(number === 2) return true;
        for(let i=2; i<=Math.sqrt(number); i++){
            if(number % i === 0) return false;
        }
        return true;
    }
    
    const getLogic = (numArr, fixedNum) => {
        if(numArr.length){
            for(let i=0; i<numArr.length; i++){
                let temp = [...numArr];
                temp.splice(i, 1);
                if(isPrime(parseInt(fixedNum + numArr[i]))){
                    answer.add(parseInt(fixedNum + numArr[i]));
                }
                getLogic(temp, fixedNum + numArr[i]);
            }
        }
    }
    getLogic(arr, '');
    return answer.size;
}