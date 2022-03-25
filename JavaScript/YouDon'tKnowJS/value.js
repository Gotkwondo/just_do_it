//1️⃣배열
//JS의 배열은 문자열, 숫자, 객체, 다른 배열(다차원 배열)을 담을 수 있는 그릇이다.
//배열에 값을 나중에 추가할 수 있고, 배열 인덱스는 숫자이지만 배열은 객체이므로 키/값을 추가할 수 있다. 하지만 객체 추가시 length프로퍼티는 증가 안함
const a = [1, "2", [3]];
console.log(a);         //  [1, '2', [3]]
a[3] = 4;
console.log(a.length);  //  4
a["key"] = "value";
console.log(a);         //  [1, '2', [3], 4, key: 'value']
console.log(a.length);  //  4

//또한 중간에 비어있는 배열 즉, 구멍난 배열을 조심하자
let b = [];
b[0] = 1;
b[2] = 3;
console.log(b);         //  [1, empty, 3]  이때는 a[1]에 undefined 하는 것과는 다르다.
console.log(b.length);  //  3

//


//1️⃣.1️⃣유사배열
//유사배열 값(숫자 인덱스가 가르키는 값들의 집함)을 진짜 배열로 바꿀 때 배열 유틸리티 함수를 이용하는 것이 일반적
//배열 유틸리티 함수 : indexOf(), concat(), forEach() 등

function foo1() {
  let arry = Array.prototype.slice.call(arguments);
  arry.push("bam");
  console.log(arry);
}
foo1("bar", "baz");
//하지만 ES6 이후 기본 내장 함수인 Array.from()을 사용한다.
function foo2() {
  let arry = Array.from(arguments);
  console.log(arry);
}
foo2("dar", "daz");

//1️⃣.2️⃣문자열
let le1 = "foo";
let le2 = ["f", "o", "o"];
//문자열은 length프로퍼티, indexOf()메서드, concat() 메서드를 갖아서 배열과 겉모습만 비슷하지만 완전히 다르다.
//문자열은 불변값(Immutable)이고 배열은 가변값(Mutable)이다.
le1[1] = "0";
le2[1] = "0";
console.log(le1); //  foo
console.log(le2); //  ['f', '0', 'o']
//하지만 문자열은 charAt()으로 접근가능
console.log(le1.charAt(1)); // o

//문자열은 불변값이므로 바로 변경하지 않고 새로운 문자열을 생성한 후 반환함
le3 = le1.toUpperCase();
console.log(le1 === le3); //  false
console.log(le1);         //  foo
console.log(le3);         //  FOO

le2.push("!");
console.log(le2);         //  ['f', '0', 'o', '!']

//문자열에 대해 불변 배열 메서드를 빌려 사용할 수 있다.
// le1.join();  //  undefined
// le1.map();   //  undefined
let le4 = Array.prototype.join.call(le1, "-");
let le5 = Array.prototype.map.call(le1, (v) => {
  return v.toUpperCase() + ".";
}).join("");
console.log(le4);         //  f-o-o
console.log(le5);         //  F.O.O.

//문자열은 불변값이기에 배열의 가변 메서드를 사용할 수 없어 빌려 쓰기도 불가능하다.
//해결책으로 문자열을 배열로 바꿨다가 다시 문자열로 돌리는 방법이 있다.
let test = le1.split("").reverse().join("");
console.log(test)         //  oof
//🔰주의해야 할 점이 있다. 유니코드(복잡한)문자가 있다면 에스레베스와 같은 유니코드를 읽을 수 있는 라이브러리를 사용해야한다.

//문자열에 작업이 많은 경우 문자 둔위로 저장하는 배열로 취급하는 것이 좋다.
//배열을 문자열로 바꾸려면 join("") 메서드를 호출하면 된다.


//2️⃣숫자
//JS에서의 숫자 타입은 nember가 유일하며, 정수-부동 소숫점 숫자를 모두 포함
//JS의 number는 IEEE 754 표준을 따르며, 배 정도의 표준 포맷(64비트 바이너리)을 사용

//2️⃣.1️⃣ 숫자 구문
//10진수 리터럴, 소숫점 앞의 0 생략 가능, 소숫점 이하가 0이면 생략가능, 대부분 10진수 디폴트 소숫점 이하 0은 제거
//아주 큰 숫자는 지수형으로 표시(toExpenential()의 결과와 같다), 숫자값은 Number객체 래퍼로 박싱가능(Number.prototype()로 접근 가능)
//숫자값은 문자열로 반환, 소숫점. 과 프로퍼티 접근자.을 혼돈하지 말자, 큰숫자는 보통 지수형으로 표시(2진 b, 8진 o, 16진 x) 

//2️⃣.2️⃣ 작은 소수값
//이진 부동 소수점 숫자의 부작용 문제에 대해 알아보자
console.log(0.1 + 0.2 === 0.3); //  false
//이진 부동 소수점으로 나타낸 0.1과 0.2는 원래 숫자와 일치하지 않고 실제 값은 원래 숫자와 가깝지만 다른 것이기 때문이다.
//(전채수(정수)만 사용한다면 안심하고 JS의 숫자 연산 기능을 믿어도 된다.)
//해결책 : 미세한 반올림 오차를 허용공차로 처리하는 방법(Number.EPSILON으로 두숫자의 동등함을 비교가능)
//미세한 오차 = 머신 입실론(JS의 머신입실론 = 2^-52)
function equal(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}
const n1 = 0.1 + 0.2;
const n2 = 0.3
console.log(equal(n1, n2));

//2️⃣.3️⃣ 안전한 정수 범위
//Number.MIN_SAFE_INTEGER < 정수 < Number.MAX_SAFE_INTEGER
//-2^52 < 정수 < (2^52)-1
//JS프로그램에서 64비트 ID를 처리할 때 JS string 타입으로 저장해야 함

//2️⃣.4️⃣ 정수인지 확인
//Number.isInteger() 메서드로 값의 정수 여부를 확인한다(boolean값 반환)
//안전 정수 여부는 Number.isSafeInteger() 메서드로 확인 가능
//두 메서드 모두 폴리필이 있기에 지원이 되지 않는 브라우저에는 폴리필을 작성해 적용이 가능하다.

//2️⃣.5️⃣ 32비트(부호가 있는) 정수
//안전 범위는 32비트보단 크지만 32비트 숫자만 가능한 연잔이 있으므로 실제 범위는 줄어든다
//안전 범위는 Math.pow(-2,31)에서 Math.pow(2,31)-1 까지이다.