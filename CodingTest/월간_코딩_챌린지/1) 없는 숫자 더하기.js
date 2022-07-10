const solution = numbers => {
    //  numbers 배열안의 수들의 최대 합은 45이다. 1~9 (최대 길이 9)
    //  이를 바탕으로 없는 수들의 합은 45 - (배열안의 수들의 합) 이다.
    return 45 - numbers.reduce((i, a) => i + a, 0);
}