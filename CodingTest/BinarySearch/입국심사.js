function solution(n, times) {
    times.sort((a, b) => a - b);

    let min = 0;
    let max = n * times[times.length - 1];
    let mid = Math.floor((min + max) / 2);

    while(min <= max){
        const peopleCount = times.reduce((initial, cur) => initial + Math.floor(mid / cur), 0);

        if(peopleCount >= n){
            max = mid - 1;
        }
        else if(peopleCount < n){
            min = mid + 1;
        }
        mid = Math.floor((min + max) / 2);
    }
    return min;
}