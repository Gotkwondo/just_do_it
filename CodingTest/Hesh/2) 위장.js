function solution(clothes) {
    return Object.values(
        clothes.reduce((obj, type) => {
            obj[type[1]] = obj[type[1]] ? obj[type[1]] + 1 : 1;
            return obj;
        }, {})
    ).reduce((a,b) => a*(b+1), 1) - 1;
}