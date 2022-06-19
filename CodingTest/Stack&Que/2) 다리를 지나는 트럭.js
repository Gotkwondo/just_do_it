function solution(bridgeLength, weight, truckWeights) {
    let time = 0, qu=[[0, 0]], totalWeight = 0;

    while(qu.length > 0 || truckWeights.length > 0){
        if(qu[0][1] === time) totalWeight -= qu.shift()[0];
        
        if(totalWeight + truckWeights[0] <= weight){
            totalWeight += truckWeights[0];
            qu.push([truckWeights.shift(), time + bridgeLength]);
        }   else{
            if(qu[0]) time = qu[0][1] - 1;
        }
        time++;
        
    }
    return time;
}