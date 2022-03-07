//tip 42 bind()로 문맥 문제를 해결
//this를 다룰때 발생하는 문제를 bind()로 해결해 보자.

//함수로 새로운 문맥을 생성하고 새로운 문맥에서 오류가 발생하는 경우를 이전에 알아봤다.
//문맥변경은 혼란을 일으킬 수 있는데 this키워드를 콜백이나 배열 메서드에서 사용할 경우에는 더 문제가 될 수 있다.
//클래스에서도 마찬가지이다.

//우선 클래스로 만들어진 예제를 보자
class ValidatorProblem {
  constructor() {
    this.message = `가 유효하지 않습니다.`;
  }
  setInvalidMessage(field) {
    return `${field}${this.message}`;
  }
  setInvalidMessages(field) {
    return field.map(this.getInvalidMessage);
  }
}
//이때 setInvalidMessages을 보면, 배열에 map()을 호출하면 콜백에 setInvalidMessage메서드를 전달하는데
//이때의 this는 클래스가 아닌 배열메서드의 문맥으로 새로운 연결을 하여 의도한 대로 동작하지 않는다.
// const validator1 = new ValidatorProblem();
// validator1.setInvalidMessages(`도시`);
  //  Uncaught TypeError: field.map is not a function at ValidatorProblem.setInvalidMessages

//이러한 문제의 첫번째 해결책은 메서드를 화살표 함수로 바꾸는 것이다.
//화살표 함수는 새로운 this 연결을 생성하지 않기에 오류가 발생하지 않는다.
//하지만, 주의해야 할 점은 클래스 문법을 사용할 때는 함수를 메서드가 아닌 속성으로 옮겨야 한다는 점이다.
//객체에서는 속성이 키-값으로 선언되므로 문제가 되지 않는다. 하지만, 클래스에서 속성은 생서자에서 설정하고 메서드는 따로 위치한다.
//고로 화살표 함수를 이용해 해결하고자 하면 일부 메서드는 생성자 내부에서, 다른 메서드는 클래스 메서드로 설정해야 한다.
class Validator2{
  constructor() {
    this.message = `가 유효하지 않습니다.`;
    this.setInvalidMessage = field => `${field}${this.message}`;  //생성자 내부에 설정되어 있는 것을 볼 수 있다.
  }
  setInvalidMessages(...field) {
    return field.map(this.setInvalidMessage);
  }
}
//문제는 해결되었지만 다른 문제가 다시 생긴다.
//우선 메서드가 이곳 저곳에 정의되고, 메서드가 많이 작성되다 보면 생성자가 비대해지는 문제가 발생한다.

//화살표 함수보다 더 나은 해결책은 bind()메서드를 이용하는 것이다.
//bind()메서드는 모든 함수에 사용이 가능하고, 문맥을 명식적으로 정하여 this로 참조된 곳을 항상 알 수 있게 해준다.

//this속성을 참조한ㄴ 함수가 있다고 가정해보자. 이 함수에는 해당 속성이 존재하지 않으며, this가 참조하는 속성이 아직 존재하지 않을 수 있다.
//함수를 선언할 때 반드시 속성이 존재하지는 않지만 속성이 없다면 함수를 호출할 때 undifined를 받게된다.
function sayMessage() {
  return this.message;
}
const alert = {
  message: `위험해!`,
};
const sayAlert = sayMessage.bind(alert);
console.log(sayAlert());
//위의 예제에서는 bind()를 이용해 특정한 객체를 명시적으로 this로 설정했다.

//함수가 this를 사용할 때 마다 우리가 명시적 연결한 객체로 연결된다.
//이는 자바스크립트 엔진이 아닌 작성자가 직접 문맥을 선언했기에 명시적 연결이라 한다.

//이제는 함수를 this에 연결해서 기존의 문맥에 연결할 수도 있다.
//함수에 this를 연결하는게 이상하겠지만 이는 새로운 문맥을 생성하지 않고 기존의 문맥을 사용하게 만드는 것이다.
//화살표 함수와 달리 함수는 여전히 this 연결을 생성하지만 기존의 문맥을 사용하는 것이 다른 점이다.
class Validator3{
  constructor() {
    this.message = `가 유효하지 않습니다.`;
  }
  setInvalidMessage(field) {
    return `${field}${this.message}`;
  }
  setInvalidMessages(...fields) {
    return fields.map(this.setInvalidMessage.bind(this)); //map()메서드에 함수를 넘겨주기 전에 기존의 문맥에 bind()를 통해 연결
  }
}
//위의 코드는 잘 짜여진 코드이지만 한가지 단점이 있다.
//바로 다른 메서드에서 함수를 사용하면 다시 bind()로 연결해야 한다는 것이다. 
//이는 생성자에서 메서드와 같은 이름을 가진 속성에 this를 연결한 메서드를 설정해 bind()를 여러번 호출하는것은 기피하는 것이다.

//속성을 생성자로 옮기고 메서드의 위치를 유지하고 생성자를 this에 연결할 수 있다.
//이를 통해 모든 메서드는 클래스의 몸체에 선언할 수 있고, 속성과 문맥이 생성자에서만 설정하게 된다.
class Validator4{
  constructor() {
    this.message = `가 유효하지 않습니다`;
    this.setInvalidMessage = this.setInvalidMessage.bind(this);
  }
  setInvalidMessage(field) {
    return `${field}${this.message}`;
  }
  setInvalidMessages(...fields) {
    return fields.map(this.setInvalidMessage);
  }
}
const validator4 = new Validator4();
console.log(validator4.setInvalidMessages(`인천`, `서울`));
//  ['인천가 유효하지 않습니다', '서울가 유효하지 않습니다']
console.log(validator4.setInvalidMessage(`인천`));
//  인천가 유효하지 않습니다

//문맥 연결은 유기적으로 살펴봐야 더 잘 이해된다.
//this를 다루다가 예상하지 못한 동작이나 오류를 만나면 명시적으로 문맥을 연결할 수 있다는 것을 잊지말자.