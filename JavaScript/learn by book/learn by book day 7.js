//tip 22 map() 메서드로 비슷한 길이의 배열을 생성하라
//map() 메서드는 map객체와는 다른 것이다.
//map() 메서드는 흔하게 사용되고 새롭게 생성된 배열에 메서드를 콜백에서 반환하는 정보가 담긴다. 즉, 반환값이 알기 쉽다는 것이다.
//맵 함수는 정보, 값의 일부를 가져와 다른 형식의 값으로 반환한다. 예제를 보자
const band = [
  {
    name: `corbett`,
    instrument: `guitar`,
  },
  {
    name: `evan`,
    instrument: `guitar`,
  },
  {
    name: `sean`,
    instrument: `bass`,
  },
  {
    name: `brett`,
    instrument: `drums`,
  },
];
//모든 배열 메서드는 배열의 각 항목에 적용할 수 있는 콜백 함수를 전달받는다. 콜백 함수는 배열에 담긴 각 항목을 한가지 인수로써 필수 값을 갖는다.

//이제 for문을 먼저 작성하고 map()메서드가 어떻게 작동하는지 알아보자
const instruments = [];
for (let i = 0; i < band.length; i++){
  const instrument = band[i].instrument;
  instruments.push(instrument);
}
//위에서 28, 29번째 줄의 코드를 결합 해보자.
//intrument를 가져와 push()로 전달하는 것 보다, push()의 인수에서 instrument를 가져올 것이다. 로직을 분리해 별도의 함수로 생성하면 가독성이 좋아진다.
function getInstrument(member) {
  return member.instrument;
}
//위의 코드에서는 이터레이터 band[i]와 member.instrument를 분리한 것이 중요하다.
//이터레이터란? 시퀀스를 정의하고 종료시 반환값을 잠재적으로 정의하는 객체
//✅map()메서드를 사용할 때는 전체가 아닌 각각의 조각에 대해 생각해야한다.✅ 이제 기존의 for문에 새로운 메서드를 조합해보자
const instruments2 = [];
for (let i = 0; i < band.length; i++){
  instruments.push(getInstrument(band[i]));
}
//✅map()메서드는 배열 메서드의 일부를 포함하기에 값을 담을 배열을 준비할 필요가 없다.
//✅또한 맵 함수의 실행결과를 반활될 배열에 추가하기에 push()도 필요없다.

//map()메서드를 사용하기 위해 ❗원본 배열의 각 항목을 인수로 받아 새롭게 생성될 배열에 값을 반환하는 함수를 만든다.
//대부분의 경우 배열 메서드에서는 익명함수를 작성하지만 테스트 목적인 경우는 기명 함수를 사용하기도 한다.
function getInstrument2(member) {
  return member.instrument;
}
const instruments3 = band.map(getInstrument2);
console.log(instruments3);
//  [`guitar`, `guitar`, `bass`, `drum`]
//배열을 반환 받고, 실행전 미리 배열을 선언하지 않고, 원본과 같은 길이의 배열을 얻고, 원하는 정보만 배열에 담았다. 예측 가능하고 단순하다.
//모든 배열 메서드는 배열의 각 항목을 대상으로 실행할 콜백 함수를 받을 뿐이다. 다만, 메서드의 종류에 따라 콜백 함수의 반환값이 처리되는 방법이 다르다.

//이제 익명 함수로 바꿔보자. 인수를 한개만 받기에 괄호X, 몸체가 한줄에 return만 있기에 return생략 가능
const instruments4 = band.map(member => member.instrument);
console.log(instruments4);
//  [`guitar`, `guitar`, `bass`, `drum`]
//map()은 단순하지만 유연하다. 원본 배열과 같은 길이의 배열을 생성하는 경우라면 모든 곳에 사용이 가능하다.


//tip 23 filter()와 find()로 데이터의 부분집합을 생성하라
//이번엔 배열의 형태는 유지하되 길이를 변경하는 방법을 배워보자
//filter()는 톡정 정보를 가져오고 필요한 경우에 적합하다. filter()는 map()과 다르게 배열에 있는 정보를 변경하지 않고 반환되는 배열의 길이만 줄인다.
const team = [
  `Michelle B`,
  `Dave L`,
  `Dave C`,
  `Courtney B`,
  `Davina M`,
];
//문자열에서 Dav를 포함하는지 match()를 이용해 보자. match()는 문자열이 정규 표현식과 일치하면 일치한 항목에 대한 정보를 배열로 반환하고 일치하지 않으면 null반환.
console.log(`Dave`.match(/Dav/));
//  [`Dav`, index: 0, input: `Dave`]
console.log(`Michelle`.match(/Dav/));
//  null
//이전에는 이러한 문제를 for문으로 해결했지만 좋은 해결책은 아니다.
const daves = [];
for (let i = 0; i < team.length; i++){
  if (team[i].match(/Dav/)) {
    daves.push(team[i]);
  }
}
console.log(daves);

//필터 함수는 같은 작업을 한줄로 할 수 있고 map()처럼 배열 메서드를 호출하면 새로운 배열을 반환한다.
//filter()는 map()과는 다르게 메서드에 전달하는 함수는 참 값을 반환해야 값이 유지되고 거짓이면 새로운 배열에 담기지 않는다. 반환되는 순서는 유지된다.
//하지만 true, false값은 반환 하지만 배열에는 담기지 않을 뿐이다.
const scores = [30, 82, 90, 60, 100];
function getNumberOfPassingScores(scores) {
  const passing = scores.filter(score => score > 60);
//  [82, 90, 100]
  return passing.length;
}
console.log(getNumberOfPassingScores(scores));
//  3
//filter()는 조건에 일치하는 값이 없어도 배열을 반환한다.
function getPerfectScores(scores) {
  const perfect = scores.filter(score => score === 100);
//  [100]
  return perfect.length;
}
console.log(getPerfectScores(scores));
//  0

//다시 이전의 예시로 돌아가자. 직전의 예시에서는 filter()에 넘기는 익명함수는 불 값을 반환했다면,
//이제는 문자열을 검사하고 match()가 불값을 반환하여 함수에 사용해보자
const daves2 = team.filter(member => member.match(/Dav/));
//  ['Dave L', 'Dave C', 'Davina M']

//가끔 배열에 조건과 일치하는 항목이 최대 한개이거나 일치하는 항목 하나만 필요한 경우에는 filter()와 find()를 사용할 수 있다.
//find()는 참 또는 거짓 값을 반환하는 함수를 인수로 받고 배열의 항목에 전달한 함수로 평가해 참 값을 반환하는 첫번째 항목만 반환한다. 없다면 undifined반환
//find()는 찾는 항목이 한개인 것을 알고 있는 경우에 좋다(특정 정보를 찾는).
//find()를 이해하기 쉬운 예제는 바로 break문이다. 예시를 보자
const instructors = [
  {
    name: 'Jim',
    libraries: ['MERIT'],
  },
  {
    name: 'Sarah',
    libraries: ['Memorial', 'SLIS'],
  },
  {
    name: 'Eliot',
    libraries: ['College Library'],
  },
];
//Memorial에 근무하는 사서를 찾기위해 for문을 작성한다면 정확한 정보를 찾았을 때 break문을 이용해 빠져나온다.
let memorialInstructor;
for (let i = 0; i < instructors.length; i++){
  if (instructors[i].libraries.includes(`Memorial`)) {
    memorialInstructor = instructors[i];
    break;
  }
}
//3번의 과정을 통해 결과를 얻었다... 이 상황에서 가장 최적화된 방법은 첫번째 인스턴스에서 멈추는 것이다.
//바로 find()를 이용하는 것이다.
const librarian = instructors.find(instructor => {
  return instructor.libraries.includes(`Memorial`);
});
console.log(librarian);
//매우 간간하게 코드가 바뀌었다. 또한 let에서 const로 바꿔서 안정성을 높혔다.

//find()의 단점은 반환값을 확신할 수 없다는 것이다. filter()는 조건에 맞는 항목이 없으면 빈 배열을 반환하지만,
//find()는 undifined를 반환한다. 그렇지만 단락평가를 이용하면 기본값을 추가해 일치하는 항목이 없을때도 사용이 가능하다.
const images = [
  {
    path: `./me.jpg`,
    profile: false
  }
];
const profile = images.find(image => image.profile) || {
  path: `./default.jpg`
};
//find()에서는 아쉬운점이 한개있다. 배열 메서드의 콜백 함수는 인수가 하나뿐이라는 점이다.
//두번째 인수를 추가할경우 커링이라는 기법으로 인수의 수를 하나로 줄일 수 있다. 하지만... 나중에 하자.....


//tip 24 forEach()로 동일한 동작을 적용하라

//forEach()로 배열의 각 항목에 동작을 적용하는 예시를 보자
//입력 배열을 변경하지 않고 모든 항목에 동일한 동작을 수행할 거다.
//센터의 회원들에게 단체 메세지를 보내는 예시를 만들어보자
const centerMember = [
  `ji hong`,
  `andy`,
  `darcy`,
  `jessi`,
  `alex`,
  `nathan`,
];
for (let i = 0; i < centerMember.length; i++){
  sendEmail(centerMember[i]);
} //sendEmail이라는 메일을 보내는 임의의 함수가 있다 치자.
//위의 코드보다 더 간단하게 하기는 힘들다. forEach()가 가치있는 이유는 코드를 간단하게 만드는것이 아닌
//예측가능하면서 다른 배열 메서드와 같이 작동하며 연결이 되기에 가치가 있는 것이다.

//forEach()메서드도 배열의 각 항목을 인수로 하는 함수를 넘겨준다.
//하지만 forEach()에서는 return문은 명시적, 암시적인지 여부와 상관없이 동작은 안함. 또한 forEach()에서 처리하는 모든 동작은 함수 외부에 영향을 줌(부수효과를 줌)
const names = [`walter`, `white`];
const capitalized = names.forEach(name => name.toUpperCase());
console.log(capitalized)
//  undefined

//예시의 코드처럼 capitalized 배열을 둬서 대문자로 바꾼 결과를 갖을 수 있었지만, 배열을 직점 조작하는것은 별로 좋지 않다.
//거기다 이런 작업은 map()으로 할 수 있기에 forEach()가 필요한것은 아니다.
const names2 = [`walter`, `white`];
let capitalized2 = [];
names2.forEach(name => capitalized2.push(name.toUpperCase()));
//  [`WALTER`, `WHITE`]

//이제 센터 멤버들에게 메일을 보내는 함수를 이용해 코드를 수정해 보자
centerMember.forEach(member => sendEmail(member));
//sendEmail()은 메일을 보내는 임의의 함수이다.
//코드가 간결해저서 좋아진것인가? 아니다. 약간의 예측가능성이 좋아져서이다. forEach()는 부수효과가 있어 불안전성이 있다.
//그렇다면 왜 사용하는 것인가? 그것은 다음 tip에서 다룰 체이닝 과정에서 다른 배열 메서드와 결합할 수 있기때문이다.