// //tip 25 체이닝으로 메서드를 연결하라
// //체이닝을 간단히 정의 하자면 값을 다시 할항하지 않고 반환된 객체(또는 원래 객체)에 메서드를 바로 호출 하는 것이다.
// //더 간단히 여러개의 배열 메서드에서 배열이 반환 될 때, 배열 메서드를 연이어 호출하는 것.
const sailors = [
  {
    name: `yi hong`,
    active: true,
    email: `yiho@naver.com`,
  },
  {
    name: `alex`,
    active: true,
    email: ``,
  },
  {
    name: `nathan`,
    active: false,
    email: ``,
  },
];
// //먼저 active가 true로 된 사람들에게 메일을 보낼 수 있도록 true로 된 사람만 filter하는 코드를 작성 해보자
const active = sailors.filter(sailor => sailor.active);


// //다음으로 초대장을 보낼 이메일 정보를 얻는 코드를 작성하자. 또한 ||를 이용해 표기된 이메일과 기본 이메일중 하나의 정보를 얻게 해보자.
const emails = active.map(member => member.email || `${member.name}@naver.com`);

// //위의 단계를 거쳐 활동중인 인원에게 메일을 보내는 함수 sendEmail() 함수를 불러오며 코드는 완성된다.
emails.forEach(sailor => sendEmail(sailor));

// //완성한 코드를 보면 항상 결과값을 변수에 할당하고 있다. 그러나 체이닝을 이용하면 변수에 할당하지 않고 작성이 가능하다.
// //하지만 filter와 map()은 변수를 반환하는 변수 메서드라 두개를 바로 사용할 수 있지만 forEach()는 아무것도 반환하지 않기에 작업한 결과를 변수에 할당할 수 없다.
sailors
  .filter(sailor => sailor.active)
  .map(sailor => sailor.email || `${sailor.name}@naver.com`)
  .forEach(sailor => sendEmail(sailor));
// //이렇게 했을 때 좋은 점은 각 매서드가 고유작업을 하기에 가독성이 좋다는 점이다.
// //하지만 배열 메서드 체이닝의 단점은 반환된 배열 전체를 다시 반복한다는 것이다. 위의 코드는 총 7번 반복한다.
// //메서드 체이닝에서 주의 해야할 점이 있다. 마지막 문장에서 ;를 사용할 것, 그리고 메서드들을 올바른 순서대로 사용해야한다.



// //tip 26 reduce()로 배열 데이터를 변환하라
// //reduce()를 이용해 원본 배열과 크기와 형태가 다른 새로운 배열을 만들어보자.
// //특정 항목의 수가 필요하거나, 배여을 객체처럼 다른 형태의 자료구조로 변환해야 하는 경우에 reduce()를 사용하면 좋다
// //reeduce()메서드는 다른 배열 메서들과는 가장 다른점은 배열의 길이와 데잍 형태를 모두 또는 각각 변경이 가능하다는 것이다. 또한 반드시 배열반화을 할 필요가 없다.
// //아래의 동일한 배열을 반환하는 예제를 보자
const callback = function (collectedValues, item) {
  return [...collectedValues, item];
};

const saying = [`veni`, `vedi`, `veci`];
const initialValue = [];
const copy = saying.reduce(callback, initialValue);
//callback함수에서 2개의 인수를 전달하고 반환된 값은 콜백함수가 반환하는 값을 누적한 것이다.
//reduce()메서드의 반환값은 정수뿐 아니라 세트같은 컬렉션도 될 수 있다.
//copy에서 콜백함수와 기본값을 전달해 준다. 기본값을 작성하면 반환값을 담을 수 있어 다른 개발자들에게 반환값에 대한 정보를 제공할 수 있다.
//reduce()에서 까다로운 부분은 콜백한수에서 항상 누적된 값을 반환해야 한다는 점이다. 이전에 작성했던 예를 보자
const dogs = [
  {
    이름: `맥스`,
    크기: `소형견`,
    견종: `보스턴테리어`,
    색상: `검정색`,
  },
  {
    이름: `도니`,
    크기: `대형견`,
    견종: `래브라도레트리버`,
    색상: `검정색`,
  },
  {
    이름: `섀도`,
    크기: `중형견`,
    견종: `래브라도레트리버`,
    색상: `갈색`,
  },
];
//reduce()를 이용해 값을 얻어보자. 원하는 고윳값이 색상이라면 객체를 순회하며 색상을 확인하고 저장하는 reduce()메서드를 작성한다.
const colors = dogs.reduce((colors, dog) => {
  if (colors.includes(dog[`색상`])) {
    return colors;
  }
  return [...colors, dog[`색상`]];
}, []);
console.log(colors)
//  [`검정색`, `갈색`]
//함수의 마지막을 보면 빈 배열로 초기화를 시켜준다. 즉 초기값을 빈 배열로 한다는 것이다.
//❗❗reduce()매서드는 콜백을 호출할 때 마다 초기값에 정보를 입력하며 동작한다. 위의 함수에서는 빈 배열에 색상이 없다면 colors에 dog[`색상`]이란 정보를 입력하고 있다면 colors를 반환한다.
//주의할 점은 반환하지 않으면 값은 완전히 사라진다는 점이다. 위의 return [...colors, dog[`색상`]]에서 return을 해주지 않으면 TypeError가 뜬다.

//추가적으로 데이터의 크기와 형태를 모두 변경할 수 있기에 reduce()를 이용해 다른 배열메서드를 만들어 보자
const colors2 = dogs.map(dog => dog[`색상`]);
//map()을 이용해 만들었다. 다음으로 reduce()를 이용해보자
const colors3 = dogs.reduce((color, dog) => {
  return [...color, dog[`색상`]];
}, []);
console.log(colors2)
//reduce()는 리듀서 함수가 더 많은 값을 다룰 수 있게해서 유연성이 필요할 때 사용하면 좋지만 한가지 속성의 값을 모아야 한다면 map()을 사용하는 것이 적절하다.
//map()을 이용해 Set()로 정보를 전달하는 것은 day5를 참고하자. const dogsColor = new Set(dogs.map(dogs => dogs[`색상`]))

//세 항목의 정보를 넘겨주는 함수를 reduce()와 Set()를 이용해 작성해보자.(Set()는 고유 항목만 담긴다.)
const filters = dogs.reduce((filters, item) => {
  filters.breed.add(item[`견종`]);
  filters.size.add(item[`크기`]);
  filters.color.add(item[`색상`]);
  return filters;     // return()해주지 않으면 결과가 반환 되지 않으므로 정의가 안되서 에러가 발생한다... 이걸 까먹네...
},
{
  breed: new Set(),
  size: new Set(),
  color: new Set(),
},);
console.log(filters);
//이와 같이 반복 횟수는 적게 유지하면서 변환되는 데이터의 형태를 다른 개발자에게 알려줄 수 있는 이점을 얻을 수 있다.

//또다른 예시를 보자
const developers = [
  {
    name: `Jeff`,
    language: `php`,
  },
  {
    name: `Ashley`,
    language: `python`,
  },
  {
    name: `Sara`,
    language: `python`,
  },
  {
    name: `Joe`,
    language: `Javascript`,
  },
];
const aggregated = developers.reduce((specialities, developer) => {
  const count = specialities[developer.language] || 0;
  return {
    ...specialities, [developer.language]: count + 1,
  }
}, {});
console.log(aggregated);
// //callback함수에 4가지 인수가 오게되는데 accumulator누산기 : 콜백의 반환값을 누적한다, currentValue : 처리할 현재 요소,
// //currrntIndex(Optional) : 처리할 현재 요소의 인덱스, array : reduce()를 호출한 배열
// //위에서return {...specialities, [developer.language]: count + 1,}에서 ...specialities는 이전에 콜백함수로 인해 나온 반환값들의 배열이며
// //[developer.language]: count + 1은 마지막으로 나온 값이다.