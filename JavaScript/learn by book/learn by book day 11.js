//tip 31 나머지 매개변수로 여러 개의 인수를 변수로 전달하자
//나머지 매개변수로 개수를 알 수 없는 다수의 매개변수를 전달하는 방법을 알아보자.

//매개변수를 객체로 전달하는 것은 좋은 방법이지만 객체처럼 전달되는 매개변수들이 서로 다를때 즉, 객체를 다루는 경우에만 좋다.
//그렇다면 갯수를 알 수 없는 비슷한 매개변수들을 어떻게 처리해야 하는가?
//우선 내장된 arguments 객체를 이용해 해결해 보자.
function getArguments() {
  return arguments;
}
getArguments(`Bloomsday`, `June 16`);
console.log(getArguments(`Bloomsday`, `June 16`))
//  { `0`: `Bloomsday`, `1`: `June 16` }
//arguments객체는 함수에 전달된 모든 인수를 담는 배열과 비슷한 컬랙션이다.
//이때 배열과 유사하다는 말은 객체이므로 배열로 변환해야한다는 이야기이다.

function validateCharacterCount(max) {
  const items = Array.prototype.slice.call(arguments, 1);
  return items.every(item => item.length < max);
}
//함수에서 전달받은 순수를 배열로 바꾼다는 점을 알고있기에 원하는 만큼 인수를 전달할 수 있다.

//하지만 인수가 이미 배열에 있다면 어떻게 해야하는가?
//이때는 인수를 배열로 전환하기에 인수 목록으로 변환 전달해야한다.

//하지만, 우리는 이미 펼침연산자라는 좋은 도구가 있다.
//인수에도 펼침연산자를 사용할 수 있다.
//매개변수를 목록으로 수집하는 경우에 문자열이나 배열을 쉽게 처리할 수 있다.
validateCharacterCount(10, `wvoquie`);
// true
const tags = [`Hobbs`, `Eagles`];
validateCharacterCount(10, ...tags);
// true
//이러한 방법은 유연하게 코드 작성이 가능하지만 추천하지는 않는다.
//다른 개발자들은 함수 몸체를 봐야 전달하고자 하는 정보를 알고, 매개변수로 인수 목록을 받는다는것을 알기도 어렵기 때문이다.

//❗❗❗이러한 문제를 해결하기 위해 나머지 매개변수(rest parameter)를 이용할 수 있다.
//나머지 매개변수를 이용해서 뒤에 더 할당할 변수 이름을 작성하면 전달되는 매개변수는 변수에 배열로 담김
function getArguments2(...args) {
  return args;
}
getArguments2(`Bloomsday`, `June 16`);
console.log(getArguments2(`Bloomsday`, `June 16`));
//  [`Bloomsday`, `June 16`]

//이번엔 validateCharacterCount()을 다시 작성해 보자
function validateCharacterCount2(max, ...items) {
  return items.every(item => item.length < max);
}
console.log(validateCharacterCount2(10, [`voquie`]));
const tags2 = [`Hobbs`, `Eagles`];
console.log(validateCharacterCount2(10, ...tags2));
//이제 간결하고 예측 가능성이 높아졌습니다.
//다른 개발자들이 최소 두개이상의 인수를 받고 있다는 것을 알 수 있습니다.
//이전 argumnets를 사용해 작성했던 코드들과 다른점이 없습니다.

//인수를 사용하는 이유 2가지 더 알아보면

//첫번째로, 인수를 배열로 다루는 것을 다른 개발자에게 알릴때 좋다.
//1️⃣타입 검사가 없을 경우 개발자들에게 단서를 전달한다. 2️⃣전달하는 데이터가 배열형식 일때 나머지 매개변수를 사용한다.
//3️⃣함수를 호출할 때 항상 정보를 펼쳐야할때 기대되는 매개변수 유형을 보여줌

//두번째로, 나머지 매개변서는 코드 디버깅에 좋은 방법이 될 수 있다.
//1️⃣나머지 매개변수를 통해 추가적인 매개변수를 가져올 수 도 있는 함수 해석에 용이하다.
//2️⃣나머지 인수를 사용하면 길게 나열된 인수를 확인할 수 있다.

function debug() {
// START:debug
  ['Spirited Away', 'Princess Mononoke'].map((film, ...other) => {
    console.log(other);
    console.log(film)
    return film.toLowerCase();
  });
  // [0, ['Spirited Away', 'Princess Mononoke']]
  // [1, ['Spirited Away', 'Princess Mononoke']]
// END:debug
}
debug()
//map()은 콜백 함수에서 검사중인 항목을 인수로 받는다.
//이게 뭔말인가 고민했다. 한마디로 콜백함수에서 사용되고있는 것 즉 위의 배열의 항목들을 인수로 받는다는 것이다.
//그러다면, 위의 함수에서 other에는 인덱스값과 배열이 들어가는 것이다. ㅠ 어려웠다....
//이렇게 나머지 매개변수를 이용하면 확인하기 어려운 매개변수를 찾는데 큰 도움이 된다.

//세번째로, 나머지 인수는 함수 간에 속성을 전달하면서 해당 속성을 ❗조작할 필요가 없을 때❗ 사용하면 좋다.
//즉, 여러개의 함수를 감싸서 인수를 전달할 때 좋다.
function applyChanges(...args) {
  updateAccount(...args);
  closeModal();
}
//위의 함수는 모달 창에서 변경사항 저장 후 다른 함수로 정보를 갱신과 동시에 창을 닫는 함수이다.

//마지막으로 나머지 매개변수가 매개변수만을 위한 것은 아니다.
//펼침 연산자와 같이 부수효과를 제거하고 일반적인 배열 메서드를 다시 만들 수 있다.
//배열의 첫번째 항목을 제거하는 shift()를 다시 만들어 보자
const queue = [`stop`, `collaborate`, `listen`];
const [first, ...remaining] = queue;
console.log(first, remaining);
//첫번째 값과 나머지 값이 담긴 배열을 확인하고, 원본은 유지되었다.

//인수에 나머지 매개변수를 사용하는 유일한 단점은
//1️⃣언제나 마지막 인수에 사용해야 한다는 것이다.
//2️⃣나머지 매개변수를 사용할 때는 반드시 함수의 마지막 매개변수여야 한다.
//3️⃣해체 할당의 경우에도 마지막 값이어야 한다.
const [...beginning, last] = queue;
console.log(...beginning, last);
//  SyntaxError: Rest element must be last element
