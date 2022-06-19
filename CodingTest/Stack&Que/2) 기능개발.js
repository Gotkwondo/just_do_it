function solution(progresses, speeds) {
    let answer = [0];
    const days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    let max = days[0];
    let count = 0
    
    for(let i = 0; i<days.length; i++){
        if(days[i] <= max){
            answer[count] += 1;
        }
        else{
            max = days[i];
            answer[++count] = 1;
        }
    }
    return answer;
}