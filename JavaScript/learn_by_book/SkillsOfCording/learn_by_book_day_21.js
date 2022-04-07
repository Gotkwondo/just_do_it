//tip 46 localStorage를 이용해 상태를 장기간 유지하자
//사용자 데티어를 localStorage에 저장하는 방법을 알아보자

//사용자 데이터를 localStorage에 저장하는 방법을알아 볼 것이다.

//많은 사용자들은 페이지 방문할 때마다 데이터 입력을 하는 것을 꺼려한다.
//그렇다 해서 로그인 기능을 만들자니 그것도 꺼려한다고 한다.
//참 어떻게 해야할지 애매하다.
//그래서 사용자 데이터를 브라우저에 저장해서 특정 기기의 특정 브라우저에 정보를 유지하게 할 수 있다.

//하지만 사용자는 여러 기기를 이용하기에 큰 도움은 되지 않지만 계정 생성보다는 접근성이 좋을 것이다.

//localStorage는 브라우저의 작은 데이터베이스(DB)와 같다.
//localStorage에 정보를 추가하거나 가져올 수 있지만, 브라우저의 자바스크립트에서 직접 접근할 수는 없다.

//localStorage에서는 setItem()메서드로 값을 설정한다. 첫번째 인수는 키, 두번째 인수는 값을 전달한다.
function saveBreed(breed) {
  localStorage.setItem(`breed`, breed);
}
//getItem(key)으로 저장된 값을 가져온다.
function getSavedBreed() {
  localStorage.getItem(`breed`);
}
//remoceItem(key)로 값을 삭제한다
function removeBreed() {
  localStorage.removeItem(`breed`);
}

//localStorage의 장점은 사용자에게 추가적인 입력을 요구하지 않고 정보를 저장하고 같은 동작을 제공한다.
//예를 들어 , 조건을 초기화 할때 localStorage에 정보가 있는 경우에 이를 추가할 수 있다.
function applyBreedPreference(filters) {
  const breed = getSavedBreed();
  if (breed) {
    filters.set(`breed`, breed);
  }
  return filters;
}

//다른 객체와 같이 원하는 만큼 키를 추가할 수 있다.
//저장하고 싶은 정보를 항목별로 저장하기 보다는 그룹으로 묶어 저장하면 훨씬 쉽다.
//이미 구조화된 데이터이므로 분리해서 저장하느라 시간을 낭비하지 않아도 된다.

//localStorage의 유일한 단점은 데이터가 문자열이어야 하고 배열이나 객체는 저장하지 못하는데
//JSON.stringify()를 이용하여 데이터를 문자열로 반환하고 가져올때는 JSON.parse()를 이용해 객체로 바꿔주면 해결된다.

//배열을 저장하기 위해서는 배열을 펴쳐 넣어야 한다.
function savePreferences(filters) {
  const filterString = JSON.stringify([...filters]);
  localStorage.setItem(`preferences`, filterString);
}

//저장한 데이터는 가져올 때 다시 맵으로 변환시켜준다. 객체나 배열을 저장하는 경우에는 문자열을 파싱하는 과정만 거치면된다.
function retrievePreferences() {
  const preferences = JSON.parse(localStorage.getItem(`preferences`));
  return new Map(preferences);
}

//localStorage를 비우려면 clear()를 이용해 키-값 쌍을 삭제할 수 있다.
function clearPreferences() {
  localStorage.clear();
}
//localStorage는 서버 측 렌더링과 클라이언트 측 기능이 혼합되어 있는 경우에 유용하다.
//페이지 새로고침하면 데이터는 유지되고, 사용자가 페이지를 떠났다가 다시 돌아오면 데이터가 없는 기본 상태를 보여줌



//tip 47 가져오기와 내보내기로 기능을 분리하라
//파일 간에 코드를 공유하는 방법을 살펴보자

//자바스크립트에서 모듈 시스템을 이용해 import문과 export문을 사용해 프로젝트 내의 파일 뿐만 아니라
//거의 동일한 문법을 이용해 자바스크립트 커뮤니티에 공개된 코드도 사용할 수 있게 되었다.
//참고로 html에 모듈 시스템을 이용하려면 type="module"을 작성해 줘야한다.

//코드를 내보내고 싶다면 export문만 작성해주면 된다.
//이전에 살펴봤던 예제를 보자
const validator = {
  message: `는 유효하지 않음`,
  setInvalidMessage: field => `${field}${message}`,
};
export { validator };

//기본적으로 공유하고자 하는 데이터를 내보내는 것뿐이며 함수, 변수, 클래스를 내보낼 수 있다.
//하지만 모든 것을 내보낼 필요는 없고 여러 함수 중 일부 함수만 내보내는 경우에는 기본적으로 공개 함수와 비공개 함수를 생성한 것과 같다.

//앞의 예제에서 함수 하나를 내보냈다.
//함수를 내보내지 않고, 비공개로 두고 싶은 함수도 있다.
//그럴 때는 원하는 함수만 내보낼 수 있다.
function getPower(decimalPlaces) {
  return 10 ** decimalPlaces;
}
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}
function roundToDecimalPlace(number, decimalPlaces = 2) {
  const round = getPower(decimalPlaces);
  return Math.round(number * round) / round;
}
export { capitalize, roundToDecimalPlace };

//다른 파일에서 함수를 사용할 때 import 키워드 작성을 한뒤 불러오려는 함수를 중괄호 안에 작성하고 현제파일 기준으로 상대경로를 작성한다.
//라이브러리 코드도 불러올 수 있다.
//day_21's_example.js 파일의 1번줄 부터를 참고하자

//모든 것을 가져올 필요는 없다. 한가지 항목만 필요하다면 그렇게 사용해도 된다.
//ex) import { capitalize } from './learn_by_book_day_21.js';

//또한 내보내기는 함수만 가능한게 아니라 변수와 클래스도 내보낼 수 있다.
const PI = 3.14;
const E = 2.71828;
export { E, PI };

//내보내기와 가져오기는 해체할당과 거의 동일한 문법을 사용한다(기억이 잘 안나면 day10을 참고하자)
//가져오기 항목을 모두 객체의 속성으로 관리하면 변수명으로 모든 것을 거져올 수 있다.

//해체할당의 문법과 조금 다른점은 별표(*)를 이용한다는 것인데 별표를 이용하여 모든 함수를 불러오고 변수명을 지정할 수 있다.
//이렇게 객체에 속한 함수처럼 호출할 수 있다.
//해체할당과 마찬가지로 가져오는 함수나 데이터의 이름을 as 키워드를 이용해 바꿀 수 있다.
//day_21's_example.js 의 9번줄 부터

//내보내기는 이미 간단하지만 더 쉽게 만들어주는 몇가지 숏컷이 있다.
//선언한 객체의 끝에서 추가하기보다 각각의 함수 앞에 export키워드를 추가해주면 훨씬 쉬워진다.
export function testFunction(sayAnyThing) {
  return `${sayAnyThing.toUpperCase()}`;
}
//day_21's_example.js 파일의 17번줄 부터를 참고하자

//코드를 분리할 수 있으니 단일 진입점을 가진 파일을 자주 만들거나 중요한 함수가 생길수 있다.
//이때 해당 파일의 내보내기 기본값(export default)을 선언할 수 있다.
//이렇게 하면 코드는 더 짧아진다.
export function parseRegion(address) {
  const region = address.state || address.providence || '';
  return region.toUpperCase();
}

export function parseStreet({ street }) {
  return street.split(' ')
    .map(part => capitalize(part))
    .join(' ');
}

export default function normalize(address) {
  const street = parseStreet(address);
  const city = address.city;
  const region = parseRegion(address);
  return `${street} ${city}, ${region}`;
}
//내보내기 기본값은 export default키워드를 function 앞에 작성해주고
//가져올때 중괄호를 사용하지 않고 원하는 변수명으로 가져올 수 있다. 하지만 가독성을 위해 같은 이름으로 가져오도록 하자
//day_21's_example.js 파일의 24번줄 부터를 참고하자

//내보내기 기본값으로 정해진 함수와 다른 함수도 가져와야 한다면 import문을 혼합할 수 있다.
//day_21's_example.js 파일의 30번줄 부터를 참고하자

//가져오기 기본값은 클래스를 불러올 때 유용하다.
//한개의 파일에 한개의 클래스만 두는 거이 좋으므로 다른 코드를 내보낼 만한 이유가 없기 때문이다.
export default class Address {
  constructor(address) {
    this.address = address;
  }

  normalize() {
    const street = this.parseStreet(this.address);
    const city = this.address.city;
    const region = this.parseRegion(this.address);
    return `${street} ${city}, ${region}`;
  }

  parseStreet({ street }) {
    return street.split(' ')
      .map(part => capitalize(part))
      .join(' ');
  }

  parseRegion(address) {
    const region = address.state || address.providence || '';
    return region.toUpperCase();
  }
}

//가져오기와 내보내기는 매우 직관적이다.
//다만 문제가 있다.
//코드를 쉽게 분리할 수 있기에 프로젝트가 성장하기 시작함
//하지만 코드를 서로 다른 여러 파일로 분리할 수 있기에 코드를 더 효율적이고 논리적으로 정리할 수 있다.