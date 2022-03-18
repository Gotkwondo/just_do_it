//네임 스페이스 패턴
let MyApp = {};

MyApp.First = function () { console.log(`First`) };
MyApp.Second = function () { console.log(`Second`) };

MyApp.variable = 1;

MyApp.modules = {};

MyApp.modules.module1 = {};
MyApp.modules.module1.data = { a: 1, b: 2 };
MyApp.modules.module2 = {};

MyApp.First(); //  First
console.log(MyApp.modules.module1.data.a);  //  1
MyApp.Second();  //  Second

//네임 스페이스 패턴에서 this사용
var MYAPP = {};

MYAPP.message = "Hi";
MYAPP.sayHello = function() {
	// 네임스페이스 명을 사용하여 리턴
	return MYAPP.message;
};

console.log(MYAPP.sayHello());    // Hi 출력
var direct = MYAPP.sayHello;
console.log(direct());            // Hi 출력
var MYAPP = {};

MYAPP.message = "Hi";
MYAPP.sayHello = function() {
	// this를 사용하여 리턴
	return this.message;
};

console.log(MYAPP.sayHello());    // Hi 출력
var direct = MYAPP.sayHello;
console.log(direct());            // undefined 출력
//전역 변수에 this를 사용하여 네임 스페이스 객체를 참조한 네임스페이스명을 사용하면 부모객체 참조에서 전역 참조로 바뀌기에 에러가 발생한다.


//범용 네임 스페이스 함수
// 1번
var MYAPP = {};

// 2번
if (typeof MYAPP === "undefined") {
	var MYAPP = {};
}

// 3번
var MYAPP = MYAPP || {};
//1번 처럼 객체를 선언하는 대신 2번, 3번 처럼 미리 선언 되어있는지 확인하고 선언하는 것이 좋음 



var MYAPP1 = MYAPP1 || {};

MYAPP1.nsFunc = function (ns_string) {
  // '.'으로 구분된 네임스페이스 표기를 쪼갭니다
  var sections = ns_string.split('.'),
    parent = MYAPP1,
    i;
  
  // 최상단의 MYAPP객체는 이미 선언되었으므로 제거합니다.
  if (sections[0] === "MYAPP1") {
    sections = sections.slice(1);
  }

  var s_length = sections.length;
  for (i = 0; i < s_length; i += 1) {
    // 프로퍼티가 존재하지 않아야만 생성합니다.
    if (typeof parent[sections[i]] === "undefined") {
      parent[sections[i]] = {};
    }
    parent = parent[sections[i]];
  }
  return parent;
};
console.log(MYAPP1.nsFunc)

//존재하지 않는 기능을 추가하기 위해 폴리필을 추가시 const, let, var과 같은 변수 선언 키워드를 빼는 것이 좋다.
//키워드 사용시 최상위 스코프로 호이스팅 되기에 중복 선언되어 에러가 발생한다.
let atob;
if (typeof atob === "undefined") {
  atob = function(){return `되네`}
}
console.log(atob())