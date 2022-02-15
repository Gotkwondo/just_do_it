//tip 15 맵 생성 시 부수 효과를 피하라.
//부수효과는 함수 내부에서 함수 외부의 값에 영향을 주거나 받는것으로
//즉, 함수내부에서 매개변수가 아닌 외부의 값을 참조, 대입, 변경, 삭제하는 행위이다.

const defaults = new Map()
  .set(`색상`, `갈색`)
  .set(`견종`, `비글`)
  .set(`지역`, `캔자스`);
const filters1 = new Map()
  .set(`색상`, `검정색`);
//부수 효과를 신경 쓰지 않으면 맵에 has()메서드를 사용해서 키가 존재하는지 확인할 수 있다.

//사용자가 설정한 데이터에 없는 디폴트의 키를 병합해주는 함수이다.
function applyDefaults(map, defaults) {
  for (const [key, value] of defaults) {
    if (!map.has(key)) {
      map.set(key, value);
    }
  }
}

//이제 필터링 조건 객체의 사용처를 생각해 보자.
//위의 예제에서 강아지 분양 프로그램을 만드는데 강아지가 있는 지역과 사용자의 지역이
//같은 경우에만 보여지게 해보려고 한다. 가장 간단하게 하는 방법은 맵의 사본을 만드는 것이다.
//앞서 본것처럼 키-값 쌍이 담긴 배열을 전달하거나 펼침연산자를 이용해 키-값 쌍의 목록을 만들어 전달 가능하다.
function applyDefaults2(map, defaults) {
  const copy = new Map([...map]);
  for (const [key, value] of defaults) {
    if (!copy.has(key)) {
      copy.set(key, value);
    }
  }
  return copy
}
//위의 코드는 1️⃣1️필터링 조건의 사본을 생성하고 2️⃣기본값을 적용해서 새로운 맵을 반환
//즉, 함수 문맥 내부에서 조작하는 것은 문제가 되지 않는다는 말이다.

//하지만 더 개선 해보자. 여러가지 키의 존재 여부를 일일이 확인 하고 있지만 이 과정을 생략할 수 있다.
//맵과 객체는 하나의 키를 한 번만 사용할 수 있고 해당 키에 마지막으로 선언한 값을 사용하는 성질을
//이용하여 값을 설정하는 대신 갱신을 하는 것 이다.
let filters2 = new Map()
  .set(`색삭`, `검정색`);
let filters3 = new Map()
  .set(`색삭`, `갈색`);
let update = new Map([...filters2], [...filters3]);
update.get(`색상`);
// 갈색

//앞선 코드를 다시 개선해보자. 맵을 병합하고 새로운 맵을 생성하는것은 한줄이면 충분하다.
function applyDefaults3(map, defaults) {
  return new Map([...defaults, ...map]);
}


//tip 16 세트를 이용해 고윳값을 관리하라
const dogs = [  //강아지 컬랙션(배열)
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

function getColors(dogs) {
  return dogs.map(dog => dog[`색상`]);  //화살표 함수안에 return과 ({})가 생략되어 있다.
}
getColors(dogs);
//[`검정색`, `검정색`, `갈색`]

//for문을 사용해 중복된 색상을 제거하여 배열로 반환하는 함수
function getUnique(attributes) {
  const unique = [];
  for (const attribute of attributes) {
    if (!unique.includes(attribute)) {
      unique.push(attribute);
    }
  }
  return unique;
}
const colors = getColors(dogs);
getUnique(colors);
//이렇게 긴 코드를 사용하지 않고 세트 객체를 이용하여 고윳값만 분류할 수 있다.

//세트는 단순하고 맵과 비슷하지만 대표적인 ❗차이점은 맵은 키-값 쌍 배열을 받지만
//✅세트의 새로운 인스턴스는 중첩하지 않은 배열을 인수로 받는다.
const colors2 = [`검정색`, `검정색`, `갈색`];
const unique = new Set(colors2);
console.log(unique);
//새롭게 생성한 객체의 값은 각 색상을 하나씩만 포함하는 세트이다.
//하지만 배열로 반환 받고 싶다면 ❗펼침 연산자❗를 이용하면 된다.
function getUnique2(attributes) {
  return [...new Set(attributes)];
}
//이 색상 배열을 만들려면 처음 강아지 정보 배열에 순회해야 한다. 그리고 배열을 조작하여 고윳값만 분류한다.
//한번에 처리하게 만드는것이 좋다.
//맵과 유사하게 세트에 값을 추가할때 add(), 검증할때 has(), delete(), clear() 메서드들이 있다.
let name = new Set();
name.add(`Ju`).add(`Hyeon`).add(`Ju`);
console.log(name);

//위의 예제를 통해 강아지 정보가 담긴 배열에서 고유 정보를 한번에 가져올 수 있다.
function getUniqueColors(dogs) {
  const unique = new Set();
  for (const dog of dogs) {
    unique.add(dog.색상);
  }
  return [...unique];
}
//매개변수 dogs를 순회하기에 위에 작성된 코드보다 효율적이게된 코드라 볼 수 있다.
//또한 위의 함수에서는 for문을 사용했지만, reduce() 메서드를 이용하여 더 간추려보자.
function getUniqueColors2(dogs) {
  const arry = [...dogs.reduce((colors, {색상}) => colors.add(색상), new Set())]
  return arry;
}
console.log(getUniqueColors2(dogs))
//아직은 reducr() 메서드를 몰라서 일단은 책에 나온 것만 적어본다.....
//어렵다....


//4장
//tip 17 거짓 값이 있는 조건문을 축약하라
//비교 연산자 중 `==`은 양쪽의 값이 같으면 참을, `===`은 값과 자료형이 같아야 참을 반환한다.
//빈 문자열은 false와 동등하다. 그렇지만 일치하지는 않는다.
//거짓 값을 갖는 목록은 다음과 같다.
//false, null, 0, NaN(숫자가 아님), ' ', " " 이 중에 0, null, 빈 문자열을 기억하자
//주의할 점은 빈 배열과 빈 객체는 항상 참값이다. 참과 거짓 값이 중요한 이유는 긴 표현식을 축약할 수 있기때문이다.
//정의되지 않은 키의 값을 가져오면 undifined가 반환되는데, 이 경우 코드의 다른 곳에 객체 또는 맵을 변경하는 부분이 있다면 문제를 일으킴.
//이때의 해결방법은 두가지인데 가장 좋은 해결방법은 데이터를 조작하지 않는 것이다. 거짓문은 포기하기에 가치가 너무크다. 함수가 데이터를 조작한다면 함수를 수정하자
//두번째로는 엄격한 일치를 이용해 값이 있는지, 원하는 형식인지 확인하는 방법이다.


//tip 18 삼항 연산자로 빠르게 데이터를 확인하라
//삼항 연산자를 이용해 재할당을 피하는 법.
//삼항 연산자를 이용하여 if/else문을 과도하게 사용하여 재할당을 줄이자. 이는 블록 유효 범위 변수를 확인하려 할 때 블록 밖에서는 결과를 알 수 없기 때문이다
if (title === `과장`) {
  const permissions = [`근로시간`, `수당`];
} else {
  const permissions = [`근로시간`];
}
//위의 코드에서는 permissions라는 변수를 조건문 외부에서 확인이 불가능하기에 외부에도 할당 해줘야한다.

let permissions;
if (title === `과장`) {
  permissions = [`근로시간`, `수당`];
} else {
  permissions = [`근로시간`];
}
//이러한 코드를 작성할 때는 과도한 코드와 잠재적인 유효 범위 총돌까지 고려해야한다.
//해결책은 삼항 연산자이다. 위의 코드를 삼항 연산자를 이용하여 작성 해보자.
const permissions = title === `과장` ? [`근로시간`, `수당`] : [`근로시간`];
//진짜 깔끔한 문장이 되었다.
//다만 여러개를 연결해서 사용하면 삼항 연산자를 이용하는 이점이 없어진다. 코드가 가독성이 낮아지기 때문이다.
const permissions2 = title === `과장` || title === `부장` ? title === `과장` ? [`근로시간`, `초과근무승인`, `수당`] : [`근로시간`, `초과근무승인`] : [`근로시간`];
//if문을 이용해 다시 작성해보자
function getTimePermissions({ title }) {
  if (title === `과장`) {
    return [`근로시간`, `초과근무승인`, `수당`];
  }
  if (title === `부장`) {
    return [`근로시간`, `초과근무승인`];
  }
  return [`근로시간`];
}
//단순히 한가지 작업을 줄이기에는 삼항 연산자가 좋으나 여러가지 동작을 삼항 연산자를 이용한다면 if문으로 돌아가는것이 더 좋다.


//tip 19 단락 평가(short-circuiting)를 이용해 효율성을 높혀라
//단락 평가의 목적은 가장 타당한 정보를 먼저 위치시켜서 정보 확인을 건너뛰는 것이다.
function getIconPath(icon) {
  const path = icon.path ? icon.path : `uploads/default.png`;
  return `https://assets.foo.com/${path}`;
}
const icon = {
  path: `acme/bar.png`
}
getIconPath(icon);
//`https://assets.foo.com/acme/bar.png`;
//위의 코드는 icon.path를 두번이나 확인하는 것을 확인 가능하다.
//이를 개선하기 위해 OR연산자를 이용해 보자
const name = `joe` || `I have no name`;
name; // `joe`
//OR연산자는 검사한 값 중 하나가 true를 반환하면 검사를 통과한 참 값이 반환됨.

//위의 코드를 OR연산자를 이용해보자
function getIconPath2(icon) {
  const path = icon.path || `uploads/default.png`;
  return `https://assets.foo.com/${path}`;
}

//단락 평가를 이용하는 또다른 이유는 오류를 방지하는 것이다.
//  지정된 배열❎
const userConfig1 = {
}
//  배열에 내용❎
const userConfig2 = {
  imges: []
}
//  내용있는 배열
const userConfig3 = {
  imges: [
    `me.png`,
    `work.png`,
  ]
}
//원하는 값을 가져올 때 OR연산자로 단락평가를 사용할 수 없다.왜냐 속성이 정의되지 않았기 때문이다.
//이 경우에는 OR연산자를 사용하기 적절치 않기에 여러번 중첩된 조건문을 이용한다.
function getFirstImage(userConfig) {
  let img = `default.png`;
  if (userConfig.images) {
    img = userConfig.images[0];
  }
  return img;
}
//위의 코드에서는 문제가 없지만 배열에 항목이 없다면 문제가 발생한다. (undefined가 반환됨)
//문제를 해결하기 위해 조건문을 한번 더 중첩한다.
function getImgae(userConfig) {
  let img = `default.png`;
  if (userConfig.images) {
    if (userConfig.images.length) {
      img = userConfig.images[0];
    }
  }
  return img;
}
//이렇게 작성되면 가독성이 낮아진다....
//중첩된 조건문은 &&연산자를 이용하면 해결이 된다.
function getImgae(userConfig) {
  if (userConfig.images && userConfig.images.length) {
      img = userConfig.images[0];
  }
  return `default.png`;
}
//하지만 위의 코드는 참값만 확인하기에 잘못된 데이터나 이미지가 문자열로 설정되어 있으면
//잘못된 결괏값이 반환될 수 있다. 나중에는 데이터 흐름의 상위에서 데이터를 정규화하는 방법이 필요하다고 한다.

//마지막으로 삼항연산자와 조합하여 한줄로 줄여보자. 참고로 객체에 없는 속성은 undifined이다.
function getImage(userConfig) {
  const images = userConfig.images;
  return images && images.length ? images[0] : `default.png`;
}
//삼항 연산자와 단락 평가를 조합할 때는 주의해야 한다. 코드가 어려워지고 이상해질 수가있다고 한다.

  // const images = userConfig.images;
  // return images && images.length && images[0].indexOf(`gif`) < 0 ? images[0] : `default.png`;
  //위는 이미지 확인을 위한 코드이다.