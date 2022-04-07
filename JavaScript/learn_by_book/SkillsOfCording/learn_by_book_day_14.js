//tip 36 화살표 함수로 문맥 혼동을 피하라
//유효범위와 문맥은 JS개발자가 어렵게 느끼는 개념이다.
//함수의 유효 범위는 간단하게 함수가 접근할 수 있는 변수라고 할 수 있다.
//문맥은 함수 또는 클래스에서 this키워드가 참조하는 것이기도 한다.

//유효범위와 문맥은 파악하기도 어렵지만 많은 사람들이 두개를 혼동한다
//라이언 모르 라는 사람은 두 개념의 차이를 알 수 있는 간단한 방법을 말했다.
//유효범위는 함수와 연관되어 있는 것이고, 문맥은 객체와 연관되어 있다는 것이다.
//정확한 분류는 아니지만, 모든 함수에서 통하는 방식이다. 사실상 좋은 일반 규칙이다.

//예시를 보도록 하자.
//form요소에 유효하지 않은 값을 입력시 노출할 메세지를 설정하는 객체가 있다고 하자.
//객체에는 속성과 메서드가 있다.
const validator = {
  message: `는 유효하지 않습니다.`,
  setInvalidMessage(field) {
    return `${field} ${this.message}`
  },
};
console.log(validator.setInvalidMessage(`도시`));
//위에서 this.message는 해당 객체의 속성을 참조한다(객체 참조?)
//메서드가 호출될 때 this바인딩을 생성하면서 해당 함수가 담긴 객체도 문맥에 포함됨

//객체에 담긴 함수를 다른 함수의 콜백함수로 사용하는 경우 주의가 필요하다
//setTimeout(), setInterval(), map(), filter() 메서드 등 자주 사용하는 배열 메서드를 사용할 때 문제가 발생한다.
//위의 함수들은 콜백 함수를 받으면서 콜백 함수의 문맥도 변경한다.

//setInvalidMessage()를 여러 개의 입력폼에 대한 메세지를 처리하도록 리펙토링해 배열 field를 받도록해보자
//메서드를 생성하고 메시지를 처리할 입력폼을 담은 배열을 각각의 항목에 메시지를 추가하면된다.
const validator2 = {
  message: `는 유효하지않다.`,
  setInvalidMessages(...fields) {
    return fields.map(function (field) {
      return `${field}${this.message}`;
    });
  },
};
//하지만 이렇게 하면 에러가 발생한다.
//대부분 this에 대한 참조 제거 후 리팩토링을 한다.

//문제를 생각해보자
//처음 함수에서는 this의 문맥이 해당 객체였다.
//map()메서드에서는 map()메서드의 문멕에서 호출되므로 this바인딩이 validator객체가 아니다. 이때 문맥은 전역 객체가 된다.
//브라우저는 window, NODE.js REPL에서는 global이 된다.

//화살표 함수를 이용하면 이러함 문제는 해결된다.
//화살표 함수는 함수를 호출할 때 this바인딩을 새로 만들지 않기 때문이다.
const validator3 = {
  message: `는 유효하지않다.`,
  setInvalidMessages(...fields) {
    return fields.map(field => {
      return `${field}${this.message}`
    });
  },
};

//하지만 기존에 문맥이 존재하지 않은상태 즉 this문맥 바인딩이 없는 상태에서는 새로운 문맥을 만들지 않았기에 전역 객체에 바인딩이 된다.
// const validator4 = {
//   message: `는 유효하지않다.`,
//   setInvalidMessages: field => `${field}${this.message}`,
// };

//정리하자면 화살표 함수는 이미 문맥이 있고 다른 함수 내부에서 이 함수를 사용할 때 유용하다.
//하지만 새로운 this바인딩을 설정할 필요가 있을 때는 문제가 된다.