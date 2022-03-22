//1️⃣배열
//JS의 배열은 문자열, 숫자, 객체, 다른 배열(다차원 배열)을 담을 수 있는 그릇이다.
//배열에 값을 나중에 추가할 수 있고, 배열 인덱스는 숫자이지만 배열은 객체이므로 키/값을 추가할 수 있다. 하지만 객체 추가시 length프로퍼티는 증가 안함
let a = [1, "2", [3]];
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


//2️⃣유사배열
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

//문자열
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