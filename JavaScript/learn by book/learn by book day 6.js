//tip 20 화살표 함수(arrow function)으로 반복문을 간략하게
//자바 스크립트에서 콜백삼수를 많이 보게되는데, 콜백 함수는 다른 삼수의 매개변수로 사용된다.
//화살표 함수를 이용해 콜백 함수를 받는 함수보다 콜백함수가 더 긴 상황을 줄일 수 있다.
//화살표 함수는 함수에 필요하지 않은 정보(function키워드, 인수를 감싸는 괄호, return, 중괄호)를 최대한 걷어낸다.
//대신에 `=>`화살표 하나만 사용하면 된다. 예제를 보자

function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
} //toUppercase() : 문자열을 대문자로 변환, 반환. slice(begin, end) : begin부터 end까지(end미포함)에 대한 얕은 복사본을 새로운 배열객체로 반환.
//위의 함수는 ❗기명함수(이름이 함수의 일부로 선언된 함수)이다. 다른 방법도 있다. 이름이 없는 함수를 생성 후 변수에 할당할 수도 있다.
const testFunction1 = function () {
}
//이와 같은 함수를 익명 함수라 하는데, 익명 함수를 이용해 선언하면 아래와 같다.
const testFunction2 = function (name) {
  return name[0].toUpperCase() + name.slice(1);
}
//이제 익명 함수를 화살표 함수로 바꿔보자
const testFunction3 = name => {
  return name[0].toUpperCase() + name.slice(1);
}

//위의 함수는 매개변수가 하나이므로 괄호가 없어도 되지만 매개변수가 없는 경우에는 ()를 사용해야한다.
function name1() {
  return `Hello`;
}
const name2 = () => {
  return `Hello`;
}
//매개변수가 2개이상일 경우도 ()사용
function sayHi(first, last) {
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`
}
const sayHi = (first, last) => {
  return `안녕하세요, ${capitalize(first)} ${capitalize(last)}님`
}
//기존에 함수의 중괄호 안에 있던 몸체가 한줄이면 화살표, 매개변수, return문을 모두 한주에 담을 수 있다.
//또한, 한줄만 작성할 경우 return키워드 사용을 안해도 실행 결과를 자동으로 반환함.
function formatUser(name) {
  return `${capitalize(name)}님이 로그아웃했습니다.`;
}
const formatUser = name => `${capitalize(name)}님이 로그아웃했습니다.`;

//화살표 함수는 변수에 할당하지 않고 익명 함수로 사용할 수 있다. 이후에 가장 흔하게 사용되는 방법이기에 기억하자
//함수를 다른 함수에 인수로 전달이 가능하다. 콜백 함수를 인수로 받는 함수를 예를 들어보자.
function applyCustomGreeting(name, callback) {
  return callback(capitalize(name));
}
//기명 함수를 생성하고 전달해도 문제는 없지만 원본 함수를 호출할 때 익명함수를 생성하면 더 편리하다.
applyCustomGreeting2(`mark`, function (name) {
  return `안녕, ${name};`
});
//하지만 위의 함수는 한줄의 함수 몸체가 있고 return문만 존재한다. 이럴 때는 화살표함수가 더 좋을것이다.
applyCustomGreeting3(`mark`, name => `안녕, ${name}!`);


//tip 21 배열 메서드로 반복문을 짧게 작성하자
//for문과 for...of문도 정말 좋은 문법이다. 하지만 모던 자바스크립트에서는 간결함, 가독성, 예측 가능성을 갖는
//코드를 작성해는것이 좋다. 이러한 상황에서 반복문은 부합하지 않는다. 대안으로 나온것이 바로 배열 메서드이다.
const prices = [`1.0`, `2.15`];
const formattedPrices = [];
for (let i = 0; i < prices.length; i++){
  formattedPrices.push()
}
//괜찬은 코드이지만, 이 함수가 더 길고 많은 파일에 있다면 작성해야 할 코드가 많아진다.
//또한, 배열에 숫자 형식이 아닌 문자열이 있고, 숫자로 변환할 수 있는 값만 필요로 하는경우는 함수의 코드가 늘어난다. 예시를 보자
const prices2 = [`1.0`, `2.15`];
const formattedPrices2 = [];
for (let i = 0; i < prices2.length; i++){
  const price = parseFloat(prices2[i]);
  if (price) {
    formattedPrices.push(price);
  }
}
//어수선하다. 데이터를 다루기도 전에 새로운 컬랙션(formattedPrices2)을 선언해야한다. 또한 이터레이터는 for...of문을 이용해 해결할 수 있지만
//여전히 이터레이터를 이용해야한다. 그리고 if문은 값 변환을 위한 작업과 불필요한 값을 제거하기 위해 작성된 코드이다. 이는 예측가능성을 훼손한다.
//종합적으로 코드는 복잡하고, 코드가 늘어나면 가독성은 낮아지고, 예측이 불가능한 코드이므로 좋은 코드는 아니다....

//이번엔 배열 메서드에 대해 알아보자. 배열 메서드는 불필요한 데이터를 배제한, 간결➕예측가능한 코드를 만드는데 좋은 방법이다.
const team = [
  {
    name: `melinda`,
    position: `us designer`
  },
  {
    name: `katie`,
    position: `strategis`
  },
  {
    name: `madhavi`,
    position: `developer`
  },
  {
    name: `justin`,
    position: `manager`
  },
  {
    name: `chris`,
    position: `developer`
  },
]
//한눈에 봐도 배열에 5개의 객체가 있다는 것을 알 수 있다.
//대부분의 배열 메서드는 반환되는 배열의 길이나 형태를 변경하기도 길이를 변경하기도 형태를 변경할 수도 있다.(필요시 모두 가능)
//배열 메서드의 치트시트를 먼저 보고 다음으로 넘어가자
//map() : 형태를 바꿀 수 있지만 길이는 유지, sort() : 형태나 길이는 유지되지만 순서는 바뀜, filter() : 길이는 변경되지만 형태는 안바뀜,
//find() : 배열은 반환안됨➕한개의 데이터 반환 형태는 안바뀜, forEach() : 형태를 이용하고 반환 없음, 🧡reduce() : 길이와 형태를 바꿀 수 있고 무엇이든 할 수 있다.🧡

//이제 다시 배열 메서드를 이용해 for문을 다시 작성하자
const prices3 = [`1.0`, `2.15`];
const formattedPrices3 = prices3.map(price => parseFloat(price));
//  [1.0, 2.15]
//위의 코드는 간결하고, 가독성이 높고, const로 선언하였기에 변경이 없고 map()메서드를 사용해서 배열이 반환된다는것이 예측이 가능하다.

//하지만 for문처럼 false값을 제거해야 하는 경우는 어떻게 해야하나.... 아래의 코드를 보자
const prices4 = [`1.0`, `흥정가능`, `2.15`];
const formattedPrices4 = prices.map(price => parseFloat(price)).filter(price => price);
//기존의 코드에서 filter()를 이용해서 false값을 제거하여 배열로 반환한 코드이다.