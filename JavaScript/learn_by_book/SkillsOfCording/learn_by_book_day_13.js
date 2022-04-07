// //tip 34 부분적용 함수로 단일책임 매개변수를 관리하자
// //부분 적용 함수로 매개변수를 집중시키자

// //부분 적용 함수 : n개의 인자를 받는다면 m개의 인자를 기억해, 나중에 (n-m)개의 인자만 받아도 동작하는 함수
// //Lodash의 리바운스(단기간 동일 이벤트가 다량으로 발생시 처음이나 마지막의 이벤트만 한번 처리하는 것)에 사용됨

// //❎고차함수는 매개 변수를 가두는 방법으로 특별한 값을 제공, 원래의 인수에 접근할 수 있게 해두고 함수 실행 마칠 수 있음
// //또한, 매개변수를 분리해 함수의 의도를 명확하게 유지
// //고차함수는 다른 함수를 반환하는 함수이다. 함수 실행이 끝날때까지 최소 두단계를 걸친 매개변수가 있다는 것이다.

// //이때, 부분 적용 함수를 통해 한번에 전달해야 할 인수가 줄어드는 대신 인수를 전달해야 하는 다른 함수를 반환한다.
// const building = {
//   hours: '8 a.m. - 8 p.m.',
//   address: 'Jayhawk Blvd',
// };

// const manager = {
//   name: 'Augusto',
//   phone: '555-555-5555',
// };

// const program = {
//   name: 'Presenting Research',
//   room: '415',
//   hours: '3 - 6',
// };

// const exhibit = {
//   name: 'Emerging Scholarship',
//   contact: 'Dyan',
// };

// function mergeProgramInformation1(building, manager, event) {
//   const { hours, address } = building;
//   const { name, phone } = manager;
//   const defaults = {
//     hours,
//     address,
//     contact: name,
//     phone,
//   };

//   return { ...defaults, ...event };
// }
// const programInfo1 = mergeProgramInformation1(building, manager, program);
// const exhibitInfo1 = mergeProgramInformation1(building, manager, exhibit);
// //이때 매개변수가 반복되는 것을 볼 수 있다. 이러한 반복이 있다는 것은 함수가 분리될 수 있다는 단서다.
// //고차함수를 이용해 단일 책임 매개변수를 만들면 두개의 인수를 재사용 할 수 있다.
// //첫번째 매개변수 집합은 기초 데이터 수집, 두번째 매개변수 집합은 기초 데이터를 덮어쓰는 사용자 지정 정보.

// //이를 위해 building과 manager를 가지고 매개변수를 program하나만 사용하는 함수를 반환하도록 해야한다.
// function mergeProgramInformation2(building, manager) {
//   const { hours, address } = building;
//   const { name, phone } = manager;
//   const defaults = {
//     hours,
//     address,
//     contact: name,
//     phone,
//   };

//   return program => {
//     return { ...defaults, ...program };
//   };
// }
// const programInfo2 = mergeProgramInformation2(building, manager)(program);
// const exhibitInfo2 = mergeProgramInformation2(building, manager)(exhibit);
// //한번에 함수의 두 부분을 모두 호출하려면 괄호에 이어 괄호를 작성하면 외부함수가 호출된 뒤 내부함수가 호출됨.

// //매개변수에 단일 책임을 부여는 했지만 반복을 제거하지는 못했다.
// //하지만 부분 적용을 이용해 해결할 수 있다.

// //부분 적용과 고차함수를 이용해 단일 책임을 부여하여 인수(인수를 재사용 하면 관련없는 매개변수로 인한 문제를 해결)와 나머지 매개변수를 재사용 할 수 있다.

// //나머지 매개변수 뒤로는 어떤 매개변수도 올 수 없다. 즉, 나머지 매개변수는 한번만 사용가능하다.
// //가끔, 매개변수에 나머지 매개변수가 여러 차례 필요한 경우가 있다.
// //예를 들어, 배열 데이터가 있거나 원본 데이터에 1대1로 대응되는 추가 데이터 존재시.
// // const birds = getBirds('kansas', 'wisconsin', 'new mexico');

// //두개의 배열을 쌍으로 결합하는 것을 zip함수라 한다.
// const zip = (...left) => (...right) => {
//   return left.map((item, i) => [item, right[i]]);
// };
// //...left = 원본 배열을 받는 고차함수
// //...right = 결과값 배열을 넘겨받아 결합하는 함수

// //자주는 아니지만 인터페이스를 간결하게 유지할 때 유용하게 사용됨.



// //tip 35 커링과 배열 메서드를 조합한 부분적용 함수를 사용하라

// //이전 팁에서 반복되는 문제를 해결하지 못했지만 이 문제는 고차함수를 이용해 값을 한번 저장 후 새로운 함수를 만들면 된다.
// //고차함수에서는 계속해서 사용가능한 새로운 함수가 반환되기 때문에 다시 호출할 필요가 없다.
// //함수를 호출해 저장된 매개변수를 사용하는 것은 내부 변수를 알고 있는 함수를 선언하는 것과 같다.
// const setStrongHallProgram = mergeProgramInformation(building, manager);
// const programInfo = setStrongHallProgram(program);
// const exhibitInfo = setStrongHallProgram(exhibit);
//첫번째 함수에서고차함수의 부분 적용을 활용했다.
//두번째 함수는 정보를 하드코딩했다.
//두차례에 거쳐 인수를 받는 고차함수가 하드코딩된 정보보다 더 유연하다.

//하지만 두 함수의 유사점을 찾아 고차함수를 이용해 매개변수를 분리할 수 있다.
//그렇지만, 함수를 분리하기 전에 함수에 필요한 인수를 줄이기위해 🧡인수를 분리하는 것🧡이 중요하다.

//🔰한번에 인수를 하나만 받는 함수를 커링(currying)이라 한다.🔰
//커링은 하나의 인수만 전달하는 메서드를 다룰 때 매우 유용하다.
//🚫자바스크립트는 순수한 형태의 커링은 지원하지 않지만 부분적용을 이용해 단일 매개변수로 매개변수의 수를 줄이는게 일반적이라 한다.

const dogs = [
  {
    name: 'max',
    weight: 10,
    breed: 'boston terrier',
    state: 'wisconsin',
    color: 'black',
  },
  {
    name: 'don',
    weight: 90,
    breed: 'labrador',
    state: 'kansas',
    color: 'black',
  },
  {
    name: 'shadow',
    weight: 40,
    breed: 'labrador',
    state: 'wisconsin',
    color: 'chocolate',
  },
];
//강아지 배열과 필터 조건을 인수로 받은 후 필터링 조건에 맞는 강아지 이름을 모아 반환하는 함수를 작성하자

function getDogNames(dogs, filter) {
  const [key, value] = filter
  return dogs
    .filter(dog => dog[key] === value)
    .map(dog => dog.name);
}
console.log(getDogNames(dogs, [`color`, `black`]));
//이 코드에는 두가지 문제가 있다.
//1️⃣첫번째, 필터 함수에 제약이 있다. 필터와 각각의 강이지를 정확히 비교할 때만 작동. 즉, ===을 사용해야 작동
//2️⃣두번째, 모든 배열 메서드와 같이 map()은 검사하는 항목만 인수로 받기에 매개변수를 이용해 외부 함수에 필요한 변수를 전달할 방법이 필요
//(유효 범위 내의 다른 변수들을 가져올 방법이 필요)

//우선 첫번째 문제를 해결하기 위해 비교함수를 하드 코딩하지 않고 필터 함수에 콜백함수로 전달할 수 있게 만들자
function getDogNames2(dogs, filterFunc) {
  return dogs
    .filter(filterFunc)
    .map(dog => dog[`name`])
}
console.log(getDogNames2(dogs, dog => dog[`weight`] < 20));
//개선 되었지만 아직 변수를 사용할 때 직접 코딩해서 넣는등 충돌이 없는지 확인 절차를 밟고있다.

//부분 적용 함수를 이용해 필요한 값을 미리 담아두는 것으로 변수에 할당하여 다른 함수에 데이터로 전달하는 방법으로 나머지 인수를 제공 가능하다.
//인수 집합을 두개 만들어 보자
//한 집합는 집합의 무게이고, 다른 집합는 개별 강아지의 정보이다.
const weightCheck = weight => dog => dog[`weight`] < weight;
console.log(getDogNames2(dogs, weightCheck(20)));
console.log(getDogNames2(dogs, weightCheck(50)));
//이를 통해 알 수 있는 중요한 부분은
//두개의 함수와 두개의 인수 집합으로 제한할 필요가 없다는 점이다.

//커링을 이용해 작성해보면 첫번째 함수는 색상과 같은 비교대상을 지정, 다음함수에서 검정색과 같은 비교 값을 전달
//마지막 함수에서 개별 강아지에 대한 정보를 받는다.
const identity = field => value => dog => dog[field] === value;
const colorCheck = identity(`color`);
const stateCheck = identity(`state`);

console.log(getDogNames2(dogs, colorCheck(`chocolate`)));
console.log(getDogNames2(dogs, stateCheck(`wisconsin`)));

//위와 같이 우리는 특정 요구사항이 잇는 함수를 가져와 다른 비교를 할 수 있도록 만들었다.
//모든 조건에 충족하는 강아지를 찾으려면 every()를 사용, 최소 하나의 조건을 충족하는 강아지를 찾는 경우는 some()을 사용해서 만든다.
function allFilters(dogs, ...checks) {
  return dogs
    .filter(dog => checks.every(check => check(dog)))
    .map(dog => dog[`name`]);
}
console.log(allFilters(dogs, colorCheck(`black`), stateCheck(`wisconsin`)));

function anyFilters(dogs, ...checks) {
  return dogs
    .filter(dog => checks.some(check => check(dog)))
    .map(dog => dog[`name`]);
}
console.log(anyFilters(dogs, colorCheck(`chocolate`), stateCheck('kansas')));