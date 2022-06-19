function solution(jobs) {
    let answer = 0, time = 0;
    let waitque = []
    jobs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    
    for(let i=0; i<jobs.length; i++){
        const [requestTime, workTime] = jobs[i];
        
        //  첫번째 작업일 때 요청 시간과 작업 시간을 더해 처리 시간을 구하고 
        //  끝 마친 시간에서 요청 시간을 뺀 값을 정답에 더해주고 큐에서 작업을 꺼내 다시 시작한다
        if(i === 0){
            time = (workTime + requestTime);
            answer += (time - requestTime);
        }
        //  두 번째 이상의 작업을 진행
        else{
            //  이전 작업으로 인해 time이 당장의 작업의 requestTime 보다 클 경우 대기큐에 들어간다.
            if(time >= requestTime){
                waitque.push(jobs[i]);
            }
            else{
                //  대기 큐에 대기하고 있는 작업이 있는 경우
                //  끝 마친 시간에서 요청 시간을 뺀 값을 정답에 더해주고 큐에서 작업을 꺼내 다시 시작한다
                if(waitque.length){
                    const [rqt, wrt] = waitque.shift();
                    time += wrt;
                    answer += (time - rqt);
                    i--;
                }
                //  
                else{
                    time = (workTime + requestTime);
                    answer += workTime;
                }
            }
        }
        waitque.sort((a, b) => a[1] - b[1]);
    }
    if(waitque.length){
        for(let i=0; i<waitque.length; i++){
            const [rqTime, wkTime] = waitque[i];
            time += wkTime;
            answer += (time - rqTime);
        }
    }
    return parseInt(answer/jobs.length);
}