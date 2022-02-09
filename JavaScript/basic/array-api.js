// Q1. make a string out of an array
{
    const fruits = ['apple', 'banana', 'orange'];
    const result = fruits.join(', ');   //구분자가 ', ' 로 입력됨
    console.log(result);
}   //join은 배열에 있는 모든 item들을 더해서 구분자를 넣어 string으로 만들어줌(자동적으로 , 가 들어감)

// Q2. make an array out of a string
{
    const fruits = '🍎, 🥝, 🍌, 🍒';
    const result = fruits.split(',', 2);
    console.log(result);
}   //split(separator: string | RegExp, limit?: number): string[];
//split은 string을 벼열 형태로 바꿔주며 seperator로 구분하여 배열 생성. 뒤에 숫자를 통해 배열의 길이 설정 가능

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
    console.clear;
    const array = [1, 2, 3, 4, 5];
    const result = array.reverse();
    console.log(result);
    console.log(array);
}   //reverse는 배열 자체를 뒤집어 주는 역활을 함

// Q4. make new array without the first two elements
{
    const array = [1, 2, 3, 4, 5];
    const result = array.slice(2, 6);   //splice(2,5);
    console.log(result);
    console.log(array);
}   //splice는 배열 자체를 수정하는 것 이고 slice는 배열에서 원하는 범위의 값을 리턴하는 것임

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
    const result = students.find((students) => students.score === 90);
    console.log(result);                //에로우펑션을 사용하여 1줄로 요약 가능(function, return, ; 생략 가능)
}   //find는 배열 내의 정보를 찾는 역활

// Q6. make an array of enrolled students
{                                                      //이 부분에 조건식을 걸어주면된다. 다중조건이면 IF문을 이용해서 하면 됨
    const result = students.filter((students) => students.enrolled);
    console.log(result);
}   //filter은 주어진 배열의 값들을 오름차순으로 접근해 callbackfn을 통해 true를 반환하는 요소를 기준으로 신규 배열을 만들어 반환한다

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
    const result = students.map((students) => students.score);
    console.log(result);
}   //map은 배열 내의 모든 요소들을 콜백함수로 호출하여 가공시킨 값을 리턴

// Q8. check if there is a student with the score lower than 50
{
    const result = students.some((students) => students.score < 50);
    console.log(result);

    const result2 = students.every((students) => students.score < 50);
    console.log(result2);
    console.log(!true);
}   //some은 배열내의 요소들 중 하나 라도 조건이 만족될때 true출력
//every는 배열내의 요소들 중 모두 조건이 만족될때 true출력

// Q9. compute students' average score
{
    const result = students.reduce((prev, curr) => prev + curr.score, 0)
    console.log(result / students.length);
}   //배열안의 모든 요소들의 값을 모아둘때 사용

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
    const result = students
        .map((students) => students.score)
        //.filter((score) => score > 50)
        .join();
    console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
    const result = students
        .map(students => students.score)
        .sort((a, b) => a - b)  //만약 음수가 리턴된다면 첫번째 값보다 뒤에 값이 크다고 정렬이 됨
        .join();
    console.log(result);
}
//배열을 문자열로 = join     문자열을 배열로 = split
//배열의 순서 반전 = reverse     
//배열의 요소를 시작위치에서 카운트 수 만큼 수정하여 추출 = splice     정해진 범위에서 배열의 값을 리턴 = slice
//배열에서 원하는 조건식에 해당하는 값을 찾기 = find
//배열에서 요소들을 오름차순으로 접근해 callback함수를 통해 조건에 해당하는 요소를 return하여 배열로 만듬= filter
//배열에서 요소들을 콜백함수로 호출하여 개발자의 의도대로 가공하여 리턴
//배열내 요소들 중 하나라도 조건에 해당하면 true출력 = some     모두 만족해야 true출력 = every
//배열에 추가 = push