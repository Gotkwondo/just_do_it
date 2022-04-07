//내부[[class]]
Object.prototype.toString([1, 2, 3]);
//  "[object Array]"

//래퍼 박싱하기
const b = "abc";
console.log(b.length);
console.log(b.toUpperCase());

//객체 래퍼의 함정
const a = new Boolean(false);
console.log(a);
if (!a) {
  console.log("dd");  //  출력 안됨
}

const c = Array.apply(null, { length: 3 });
console.log(c); //  [undefined, undefined, undefined]

//Object(), Function(), RegExp()
const d = new Object();
d.foo = "bar";
console.log(d);

const e = { foo: "bar" }; //이 방법을 추천
console.log(e);

//Function생성자는 함수의 인자나 내용을 동적으로 정의해야 하는 경우에만 유용(드믈다)
const f = new Function("a", "return a*2");
const g = function (a) { return a * 2 };
function h(a) { return a * 2 };
const i = (a) => { a * 2 };

const j = new RegExp("^a*b+", "g");
const k = /^a*b+/g; //이 방법을 추천


//Date()의 폴리필(ES5이전 버전에 사용)
// if (!Date.now) {
//   Date.now = () => {
//     return (new Date()).getTime();
//   }
// }
//new Date()를 사용하여 date객체(유닉스 타임스탬프 값을 얻기 유용)을 얻자(이후 객체 인스턴스로 부터 getTime()을 호출)
console.log(new Date().getTime())

//현채 실행 스택 콘텍스트를 포착하여 객체에 담기 위한 error객체를 얻자. 보통 throw 연산자와 함께 사용됨
//(스택 콘텍스트는 함수 호출 스택, error객체가 만들어진 줄 번호등 디버깅에 도움되는 정보를 갖음)
function foo(x) {
  if (!x) {
    throw new Error("x 주셈");
  }
}
foo(1);
//stack프로퍼티 보다는 error객체에서 toString()을 호출하는 것이 좋다.

//Symbol()
//심볼은 변경 불가능한 원시 타입의 값이며, 다른 값과 중복되지 않는 고유한 값이다. 심볼 값은 충돌 위험이 없는\
//오브젝트의 유일한 프로퍼티 키를 만들기 위해서 사용할 수 있다.하위호환성을 유지하면서 표준을 확장한다든지,
//고유한 상수값을 만드는 데 사용할 수 있다.

//직접 정의 하려면 Symbol() 네이티브를 사용(앞에 new를 붙이면 에러가 나는 유일한 생성자)
const mysys = Symbol("my own symbol");
console.log(mysys); //  Symbol(my own symbol)
console.log(mysys.toString());  //  "Symbol(my own symbol)"
console.log(typeof mysys);  //  "symbol"

const aa = {};
aa[mysys] = "foobar";
console.log(aa);  //  symbol

console.log(Object.getOwnPropertySymbols(aa));  //  [Symbol(my own symbol)]

const cc = Array(3);
console.log(cc.map((v, i) => i))

Array.isArray(Array.prototype); //  true
Array.prototype.push(1, 2, 3);
console.log(Array.prototype); //  [1, 2, 3, constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]