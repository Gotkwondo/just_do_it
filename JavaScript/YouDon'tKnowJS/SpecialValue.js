//void 연산자
// if (!App.ready) {
//   //나중에 다시
//   return void setTimeout(doSomething, 100);
// }
// //주로 아래와 같이 사용함
// if (!App.ready) {
//   setTimeout(doSomething, 100);
//   return ;
// }

//NaN 사용시 주의해야 하는 경우
const a = 2 / "foo";  //  NaN
typeof a === "number" //  true
//NaN은 경계값의 일종으로 숫자 집합 내에서 특별한 종류의 에러상황(연산에 사용한 요소를 숫자로 반환함)을 나타낸다

//음의 영(-0)을 문자열화 하면 "0"이 나온다
const b = 0 / -3; //  -0
console.log(b);
console.log(b.toString()) //  "0"

//문자열에서 숫자로 바꿀 경우
const c = Number("-0");
console.log(c); //  -0

//두 값의 동등 여부를 판단하는 유틸리티 Object.is()
const d = 2 / "foo";
const e = 0 / -3;
console.log(Object.is(d, NaN)); //  true
console.log(Object.is(e, -0));  //  true

//값-복사
let f = 2;
let g = f;
g++;
console.log(f); //  2
console.log(g); //  3

//레퍼런스-복사
let h = [1, 2, 3];
let i = h;
i.push(4);
console.log(h); //  [1, 2, 3, 4]
console.log(i); //  [1, 2, 3, 4]

//레퍼런스는 변수가 아닌 값 자체를 가르키므로 A 레퍼런스로 B 레퍼런스가 가리키는 대상을 변경할 수는 없다
let j = [1, 2, 3];
let k = j;
k = [4, 5, 6];
console.log(j); //  [1, 2, 3]
console.log(k); //  [4, 5, 6]

//함수의 인자로 사용할 때는 내용을 바꿀 수는 있지만 재할당(새 변수를 만들어 적용)을 통해 값 변환은 안된다.
function foo(x) {
  x.push(4);

  x = [4, 5, 6];
  x.push(7);
  x;
}
let l = [1, 2, 3];
foo(l);
console.log(l); //  [1, 2, 3, 4]

//스칼라 원시값을 레퍼런스 처럼 바뀐값이 바로 반영되게 넘기려면 다른 합성값(객체, 배열 등)으로 감싸야함
function foo2(wrapper) {
  wrapper.a = 42;
}
const obj = {
  a: 2,
};
foo2(obj);
console.log(obj.a); //  42

//스칼라 원시값을 Number객체로 박싱했을 때 레퍼런스 형식으로 함수에 전달되지만 변경할 권한이 없음
function foo3(x) {
  x = x + 1;
  x;
}
let m = 2;
let z = new Number(m);
foo3(z);
console.log(z); //  Number {2}