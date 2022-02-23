//tip 29 해체 할당으로 객체 속성에 접근하라

//매개변수는 객체와 배열에서 정보를 빠르게 가져오는 좋은 기능이지만
//항상 순서를 지켜야하고, 매개변수를 건너뛰고 싶은 경우에도 작성해야 한다는 문제점이 있다.
//그렇다면 함수의 여러개의 인수가 필요할때, 요구사항이 변경될 때는 어떻게 해야하는가?
//사진의 정보들을 전달하는 예시를 보자
//이 경우에는 개별 매개변수로 전달하는 것은 옳지 않다.
//많은 매개변수를 작성할 수 도 있고, 이미 구조화된 정보를 변경하는 것은 의미가 없다.

const landscape = {
  title: `Landscape`,
  photographer: `Nathan`,
  equipment: `Cannon`,
  format: `digital`,
  src: `/landscape.jpg`,
  location: [36, -103],
};
//위의 코드에서 필요한 정보가 있을 때는 점 표기법으로 정보를 가져오거나 넘겨받은 정보를 변수에 할당해 사용해도 된다.
//하지만 알고있는 값을 처리하는것은 쉬운 반면, 알 수 없는 방대한 양의 정보를 다루는것은 어렵다.
//이런 많은 양의 정보를 다루는 방법은 다른 곳에 사용할 키-값 쌍은 제거하고 남은 값을 유지하는 것이다.

//우선 1️⃣객체 조작전에 먼저 복제를 한뒤 2️⃣필요치 않은 키를 반번에 하나씩 삭제 => 이러한 동작을 많이 해줘야한다. 예제를 보자
function displayPhoto(photo) {
  const title = photo.title;
  const photographer = photo.photographer || 'Anonymous';
  const location = photo.location;
  const url = photo.src;

  const copy = { ...photo };
  delete copy.title;
  delete copy.photographer;
  delete copy.location;
  delete copy.src;

  const additional = Object.keys(copy).map(key => `${key}: ${copy[key]}`);

  return (`
    <img alt="Photo of ${title} by ${photographer}" src="${url}" />
    <div>${title}</div>
    <div>${photographer}</div>
    <div>Latitude: ${location[0]} </div>
    <div>Longitude: ${location[1]} </div>
    <div>${additional.join(' <br/> ')}</div>
  `);
}
//3분의 2 정도가 객체 정보를 가져오는데 할애된다...


//자바스크립트에서는 애페 할당을 통해 객체에 있는 정보를 변수에 직접 할당할 수 있다.
//사용 방법은 1️⃣객체에 있는 키와 같은 이름의 변수를 생성 2️⃣객체에 있는 키에 연결된 값을 생성한 변수의 값으로 할당
const landscape2 = {
  photographer: `Nathan`,
};
const { photographer } = landscape2;
console.log(photographer);
//  Nathan
//주의해야할 점이 있다. 1️⃣변수 형식(const 권장)을 사용 2️⃣캆을 할당하는 변수의 이름과 객체의 키의 이름이 같아야한다 3️⃣변수가 객체를 이용해서 선언됨(중괄호는 변수에 할당되는 값이 객체에있음을 나타냄)

//하지만 객체에 키가 없다면 undefined가 되지만, 해체할당을 하면서 기본값을 설정해주면 된다.
const landscape3 = {};
const { photographer2 = `Anonymous`, title } = landscape3;
console.log(photographer2, title);
//  Anonymous undefined

//여기서 키의 이름을 모른다면 어떻게 해야하나?
//이때는 마침표 세개를 변수앞에 작성해주면 추가 정보를 담을 수 있다. 이때 마침표 세개는 펼침연산자가 아닌 나머지 매개변수(rest parameter)라 부른다.
const landscape4 = {
  photographer3: `Nathan`,
  equpment: `Cannon`,
  format: `digital`,
};
const { photographer3, ...additional } = landscape4;
console.log(photographer3, additional);
//  {equpment: 'Cannon', format: 'digital'}
//사진 객체를 복사한 뒤 photographer키를 삭제한 것과 같이 나머지 키-값 쌍이 새로운 객체에 담겨진다.

//이제 변수 이름으로 원래의 키와 다른 이름을 지정해 보자.
//이는 이미 다른 변수에 이름이 사용됬거나, 맘에들지않아 바꿔야할 때 사용한다.
const landscape5 = {
  src: `/landscape.jpg`,
};
const { src: url } = landscape5;
console.log(url);
//  /landscape.jpg
//객체에서 어떤 값을 사용할지 나타내기위해 키 이름을 사용했지만, 벗어날 수 도 있다.

//마지막으로 배열에도 해체 할당을 할 수 있다.
//배열에 키가 없기에 변수 이름을 마음대로 할 수 있지만, 대신 배열에 담긴 순서대로 할당해야한다.
//해체 할당은 배열에 값이 쌍으로 담겨 있기에 순서가 정보의 일부인 경우에도 유용하다.
const land = {
  location2: [32.71, -103.14],
};
const { location2 } = land;
const [latitude, longitude] = location2;
console.log(latitude, longitude);

//잘 된 코드인것 같지만 저 가운데 코드 두줄을 줄여보자

const { location2: [latitude2, longitude2] } = land;
console.log(latitude2, longitude2);
//방금 실수가 있었다. 해체할당에서 location2를 location3로 할당해서 객체의 키를 찾지 못해 에러가 있었다.


//이제 처음에 했던 사진 작업을 다시 정리해보자.
const lands = {
  title: `Lands`,
  photographer: `Nathan`,
  equipment: `Cannon`,
  format: `digital`,
  src: `/landscape.jpg`,
  location: [36, -103],
};
function displayPhoto(photo) {
  const {
    title,
    photographer = `Anonymous`,
    location: [lat, long],
    src: url,
    ...other
  } = photo;
  const additional = Object.keys(other).map(key => `${key}: ${other[key]}`);
  return (`
    <img alt="Photo of ${title} by ${photographer}" src="${url}" />
    <div>${title}</div>
    <div>${photographer}</div>
    <div>Latitude: ${location[0]} </div>
    <div>Longitude: ${location[1]} </div>
    <div>${additional.join(' <br/> ')}</div>
  `);
}
//훤씬 좋아 보이지만 더 정리할 수 있다.
//해체할당의 가장 큰 장점은 해체할당을 함수의 매개변수에 적용할 수 있다는 점이다.
//해체 할당을 매개변수에 사용하면 let으로 변수를 할당하기에 변수를 재할당 할 수 도있고, 변수를 선언하지 않아도 정보를 함수 몸체에서 항당한것처럼 이용 가능하다.
function displayPhoto2({
    title,
    photographer = `Anonymous`,
    location: [lat, long],
    src: url,
    ...other
  }) {
  const additional = Object.keys(other).map(key => `${key}: ${other[key]}`);
  return (`
    <img alt="Photo of ${title} by ${photographer}" src="${url}" />
    <div>${title}</div>
    <div>${photographer}</div>
    <div>Latitude: ${location[0]} </div>
    <div>Longitude: ${location[1]} </div>
    <div>${additional.join(' <br/> ')}</div>
  `);
}
console.log(displayPhoto2(lands));
//여전히 중괄호가 필요하지만 그 이외는 같다.


//tip 30 키-값 할당을 단순화 해라
//축약한 키-값 할당을 이용해 객체를 빠르게 만드는 법을 알아보자.
const landTest = {
  title: `LandTest`,
  photographer: `Nathan`,
  location: [32.71, -103.14],
};
//위의 위치 정보로 위도 경도로 담겨있지만 실제 필요한 것은 지역이름이라 하자
//임의의 좌표를 통해 지역의 정보를 가져올 수 있는 헬퍼 함수가 있다 치자.

//이때 다른 객체의 정보를 가져올 수가 있다.
const region = {
  city: `Hobbs`,
  country: `Lea`,
  state: {
    name: `New Mexico`,
    abbreviation: `NM`,
  },
};
//이제 반환된 객체에서 도시 정보를 가져다 새 객체에 할당해준다.

//변수와 이름이 같은 키를 갖는 키-값 쌍을 객체에 추가하려면 변수의 이름만 적으면 된다. => 단축 속성명(Shorthand property names)
function getCityAndState([location]) {
  const { city, state } = determineCityAndState(location);
  return {
    city,
    state: state.abbreviation,
  }
}
//  { city: `Hobbs`, state: `NM` }
//해체할당으로 꺼낸 후, city는 단축 속성명으로 추가하고 state는 기존의 키-값 할당 방법을 이용했다.

//만약 객체에서 한가지 정보만 제거하고 나머지는 유지한다면 어떻게 해야할까?
//객체 펼침 연산자와 일반적인 키-값 할당을 함께 사용하면 한개의 정보를 제거하고 나머지는 유지시킬 수 있다.
function setRegion({ location, ...details }) {
  const { city, state } = determineCityAndState(location);
  return {
    city,
    state: state.abbreviation,
    ...details,
  };
}
//모두 해체할당을 이용했고 위치정보를 담은 키-값을 할당할때, location이외의 모든것을 ...details에 할당했다.
//기존 방식으로는 객체를 복사하고 delete를 통해 photo.location을 삭제했어야 된다.
//details를 펼치면 우리가 원하는 객체를 얻는다. details에는 location이 없고 title, photographer, city, state가 있다.
//  { title: `LandTest`, photographer: `Nathan`, city: `Hobbs`, state: `NM` }
