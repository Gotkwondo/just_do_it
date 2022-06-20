function solution(number, k) {
    let arr = [];
    
    for(let i=0; i<number.length; i++){
        while(k > 0 && arr[arr.length - 1] < number[i]){
            arr.pop(number[i]);
            k -= 1;
        }
        arr.push(number[i]);
    }
    return arr.join('').slice(0, number.length - k);
}