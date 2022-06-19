function solution(numbers) {
    var answer = numbers.map(n => n.toString()).sort((a,b)=>(b+a)-(a+b)).join('');
    console.log(answer);
    return answer.replace(/^0+/,"0");
}