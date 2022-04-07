//tip 32 테스트 하기 쉬운 함수를 만들자
//테스트는 매우 중요하다.
//코드를 리팩토링 하기 쉽고, 오래된 코드를 이해하기 쉽고, 명확하고 버그가 적은 앱플리케이션을 만들 수 있다.
//하지만 테스트를 작성하는 것은 어렵기 때문에 개발자들은 많이 안하려한다.
//그렇지만 우리는 테스트할 수 있는 코드를 작성하는것에 집중해야한다.

//테스트할 때 어려운점이라 하면 외부 의존성에 강하게 연결된 코드들이 어렵다.
//여기서 외부 의존성이 높다고 말하는 것은 테스트하는 코드 외부에서 함수, API등을 불러와 테스트 할 함수와 밀접하게 결합되어 있다는 것이다.

//이러한 문제는 모의객체(mock object)를 생성하여 함수를 가로채고 명시적인 반환값을 설정하게 만들어야 한다.
//모의객체 : 주로 객체지행 프로그래밍으로 개발한 프로그램을 테스트 할 때 수행되는 모듈과 외뷔의 다른 서비스나 모듈들을 실제로 사용하지 않고 흉내내는 가짜모듈을 작성한 것.
//책에 있는 예제 코드를 보자
// import expect from 'expect';

// import sinon from 'sinon';
// import * as taxService from './taxService';
// import { formatPrice } from './problem';

// describe('format price', () => {
//   let taxStub;

//   beforeEach(() => {
//     taxStub = sinon.stub(taxService, 'getTaxInformation'); // <label id="test.stub" /> 스텁 생성
//   });

//   afterEach(() => {
//     taxStub.restore(); // <label id="test.restore" /> afterEach()를 이용한 코드 원복
//   });

//   it('should return plus tax if no tax info', () => {
//     taxStub.returns(null); // <label id="test.stub2" /> 스텁 사용 예시
//     const item = { price: 30, location: 'Oklahoma' };
//     const user = 'Aaron Cometbus';
//     const message = formatPrice(user, item);
//     const expectedMessage = 'Aaron Cometbus your total is: 30 plus tax.';
//     expect(message).toEqual(expectedMessage);
//   });

//   it('should return plus tax information', () => {
//     taxStub.returns(0.1);

//     const item = { price: 30, location: 'Oklahoma' };
//     const user = 'Aaron Cometbus';
//     const message = formatPrice(user, item);
//     const expectedMessage = 'Aaron Cometbus your total is: 30 plus $3 in taxes.';
//     expect(message).toEqual(expectedMessage);
//   });
// });
//위에서 스텁 생성하는 23번 라인 코드를 에서 getTzsInformation()를 덮어써서 간단한 반환값이 되도록 하는 스텁을 생성한다.
//스텁을 만들 때 불러온 코드는 건너뛰기 때문에 실제 코드를 실행하지 않고 출력될 값만 선언된다.
//스텁 사용의 장점은 어떤 종류든 외부 의존성을 걱정할 필요가 없다는 것이다.
//하지만 단점으로는 단언문을 작성할 때는 반환값을 반복 설정해야한다.

//그리고 테스트 꾸러미가 종료되면 원래 메서드를 사용하도록 코드를 복구해야한다. 안하게 된다면 모든 테스트에서 덮어쓴 코드를 사용하기 때문이다.

//또한 테스트 꾸러미는 특정한 순서로 실행되었기 때문에 파일 위치가 바뀐다면 테스트가 실패할 수 도 있다.

//테스트 코드에 스파이, 모의객체, 스텁과 같은 외부 헬퍼를 이용하고 있다면, 코드가 복잡하고 강하게 결합되어있다는 증거이다.
//이럴때는 외부 함수를 인수로 전달하여 코드를 단순화 시켜야한다. 의존성을 인수로 전달하는 것을 의존성 주입이라고 한다.

//위의 코드를 의존성 주입을 사용해 보겠다.
function formatPrice2(user, { price, location }, getTaxInformation) {
  const rate = getTaxInformation(location);
  const taxes = rate ? `추가 세금 $${price * rate}` : `추가 세금`;
  return `${user}님의 합계 금액 : $${price} 및 ${taxes}`;
}
//의존성 주입으로 인해 스텁의 필요성은 없어졌다.
//테스트 작성시 불러오기를 생략할 필요가 없고 필요한 값을 반환하는 함수를 전달하면 된다.
//이로서 외부 의존성이 모두 제거되었다.

//테스트가 가능한 코드를 작성하는 것은 테스트 코드를 작성하기 쉽고, 코드의 외부 의존성을 줄이는 면에서도 좋다.
//허나 문제가 해결된 것이 아니라 다른 함수로 옮겨졌을 뿐이다.
//코드에 몇가지 부소효과와 입출력이 있을 수 있다.
//이러한 부분을 최대한 적게 사용해야 테스트 간으한 코드 작성에 있어 이점을 가져올 수 있다.



//tip 33 화살표 함수로 복잡도를 잡아라
//인수를 해체할당하는 방법, 객체를 반환하는 방법, 고차함수를 만드는 방법을 알아보자

//우선 해체할당 부터 시작하자
const name = {
  first: `Oh`,
  last: `Juhyeon`,
  city: `Incheon`,
  age: `24`,
};
function getName1({ first, last }) {
  return `${first} ${last}`;
}
//위의 코드를 화살표 함수로 바꾸는 것은 쉽기는 하나 주의해야 할 점이 있다.
//해체할당, 나머지 매개변수, 매개변수 기본값 등을 사용하는 특별한 매개변수는 ❗괄호❗를 사용해야한다.
const getName2 = ({ first, last }) => `${first} ${last}`;
console.log(getName2(name));  //  Oh Juhyeon

//화살표 함수에서 객체를 반환 하는 경우 return문을 생략한다면 주의해야한다.
//객체 반환을 원하는 경우 객체를 괄호로 감싸야 한다.
const getFullName1 = ({ first, last }) => ({ fullname: `${first} ${last}` });
console.log(getFullName1(name));  //  {fullname: 'Oh Juhyeon'}

//괄호를 사용해서 반활할 경우는 코드를 여러줄을 작성할 수 있다.
//return문을 생략과 동시에 여러줄로 작성 가능하다.
const getNameAndLocation = ({ first, last, city, age }) => ({
  fullname: `${first} ${last}`,
  cityAndAge: `${city} ${age}`,
});
console.log(getNameAndLocation(name));  //  {fullname: 'Oh Juhyeon', cityAndAge: 'Incheon 24'}
//name에 커서를 올리면 deprecated라 하는데 이는 명령 혹은 문장이 나중에는 쓰이지 않게되며, 다른것으로 대체 될 수 있으니 주의하라는 말이다.

//마지막으로 다른 함수를 반환하는 고차함수를 만드는 것을 알아보자.
//고차함수는 다른함수를 반환하는 함수이다.
//초기 매개변수는 다를게 없고 함수 몸체에서 다른 함수를 반환하게 만들면 된다.
const discounter = discount => {
  return price => {
    return price * (1 - discount);
  };
};
const tenPercentOff = discounter(0.1);
console.log(tenPercentOff(100));
//화살표 함수의 기능을 이용해 return과 중괄호를 삭제하여 작성해 보자

const discounter2 = discount => price => price * (1 - discount);
const tenPercentOff2 = discounter2(0.1);
console.log(tenPercentOff2(100));

//배열 메섣와 나머지 매개변수에도 도움을 줄 수 있습니다.
//매개변수 바로 뒤에 괄호를 연결하여 두번째 매개변수를 전달하면 바로 다른 함수를 호출 할 수 있다.
console.log(discounter2(0.2)(100));