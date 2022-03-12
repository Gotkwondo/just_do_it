//tip 12 객체 펼침 연산자로 정보를 갱신하라
const book1 = {
  title: `Reasons and Persons`,
  author: `Derek Parfit`,
};
//키-값 쌍을 목록에 있는 것처럼 반환. 펼침연산자의 앞, 뒤에 자유롭게 추가 가능. 독립적으로 사용불가.
const update1 = { ...book1, year: 1984 };
console.log(update1);
  // { title: 'Reasons and Persons', author: 'Derek Parfit', year: 1984}

//맨 마지막에 선언된 값을 사용함
const update2 = { ...book1, title: `Reasons & Person` };
console.log(update2);
  // { title: 'Reasons & Persons', author: 'Derek Parfit' }

//Object.assign()을 이용하여 정보추가, 갱신하는 방법
const defaults = {
  author: ``,
  title: ``,
  year: 2017,
  rating: null,
};
const book2 = {
  author: `Joe Morgan`,
  title: `Simplifing JavaScript`,
};
const update3 = Object.assign({}, defaults, book2);
console.log(update3);

//객체 펼침 연산자를 이용한 방법(defaults를 그대로 사용)
const book3 = {
  author: `Joe Morgan`,
  title: `ES6 Tips`,
};
const update4 = { ...defaults, ...book3 };
console.log(update4);

//Object.assign()과 펼침연산자의 사용 비교
const defaults2 = {
  author: `Joe Morgan`,
  title: `Simplifying Javascript`,
  spec: {
    year: null,
  },
};
const bookSpec1 = {
  spec: {
    year: 2017,
  },
};
const bookSpec2 = {
  spec: {
    year: 2018,
  },
};
//Object.assign()을 이요한 방법
const updateByOb = Object.assign(
  {},
  defaults2,
  {
    spec: Object.assign({}, bookSpec1.spec),
  },
);
console.log(updateByOb);
//펼침 연산자를 이용한 방법
const updateBySP = {
  ...defaults2,
  spec: { ...bookSpec2.spec },
};
console.log(updateBySP);
//객체 펼침 연산자 사용의 장점 : 새로운 객체를 생성하려는 의도 명확히 전달 가능, 빈 객체로 시작해야한다는 조작에 대한 우려도 줄임


//tip 13 맵으로 명확하게 키-값 데이터를 갱신하라
  //키-값 쌍이 자주 추가되거나 삭제되는 경우
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
let filters1 = {}; //새로운 정보를 담을 빈 객체

//조건 추가 함수
function addFilters(filters, key, value) {
  filters[key] = value;
}
//필터링 조건 삭제
function deleteFilters(filters, key) {
  delete filters[key];
}
//모든 조건 제거
function vlearFilters(filters) {
  filters = {};
  return filters;
}
//3개의 코드의 단점은 기본적인 동작을 수행하는데 불구하고 서로다른 세 가지의 패러다임을 적용. 특히 마지막은 filter = new Object();한거나 다름 없음
//이렇게 키-값이 자주 변경되는 경우는 맵을 사용해주면 좋다.
//❗❗맵의 장점 - 1️⃣인터페이스가 명확하다 2️⃣메서드는 예측 가능한 이름을 갖음 3️⃣반복과 같은 동작이 내장되어 있음❗❗
//맵에서는 항상 명시적으로 새로운 인스턴스를 생성해야 한다.
let filters2 = new Map();
//set()메서드를 통해 데이터를 추가
filters2.set(`견종`, `래브라도레트리버`);
//데이터를 가져오려면 get()메서드 이용
filters2.get(`견종`);
//set(key, value)   get(key)
console.log(filters2.get(`견종`));

//체이닝(chaining)을 이용하여 새로운 인스턴스 생성후 바로 메서드 연결
let filters3 = new Map()
  .set(`견종`, `래브라도레트리버`)
  .set(`크기`, `대형견`)
  .set(`색상`, `갈색`);
console.log(filters3.get(`크기`));

//배열을 이용한 정보 추가
let filters4 = new Map(
  [
    [`견종`, `래브라도레트리버`],
    [`크기`, `대형견`],
    [`색상`, `흰색`],
  ]
)
filters3.get(`색상`);
console.log(filters4.get(`색상`));
//맵에서 값을 제거할 때는 delete()메서드 이용
filters4.delete(`색상`);
console.log(filters4.get(`색상`));  //undifined
//❗모든❗ 키-값 쌍을 제거할 때는 clear()사용
filters4.clear();
console.log(filters4.get(`견종`));

//맵의 메서드를 이용하면 객체 대신 맵을 이용 하도록 함수를 변경할 수 있다.
const petFilters = new Map();
function addFilters(filters, key, value) {
  filters.set(key, value);
}
function deleteFilters(filters, key) {
  filters.delete(key);
}
function clearFilters(filters) {
  filters.clear();
}
addFilters(petFilters, `색상`, `검정`);
addFilters(petFilters, `견종`, `말티푸`);
console.log(petFilters);
deleteFilters(petFilters, `견종`);
console.log(petFilters);
clearFilters(petFilters);
console.log(petFilters);

  //변경사항은 많지 않지만, 장점이 있다.
//1️⃣코득가 훨씬 명료하게 보인다 2️⃣맵 인스턴스에 항상 메서드를 사용
//3️⃣delete()메서드 사용이 가능하기에 인스턴스 생성후 언어수준의 연산자를 섞지 않음 4️⃣clear()메서드 사용이 가능하기에 새로운 인스턴스를 생성할 필요가 없음
//따라서, ✅정보 변경이 잦은 경우 객체보다 맵을 사용하는 것이 더 편리함.✅
//또한, 객체 사용의 경우 ❗정수❗를 ❗키❗로 사용할 수 없음(오류코드 객체를 생성 할때 모든 정수가 문자열로 변환됐기 때문)(점 표기법으로 접근불가, 배열 표기법으로는 정보 접근가능)

//Object.keys()를 이용하면 ❗배열(문자열로 바뀐)이 반환되지만, map이름.keys()를 한다면 ❗맵이터레이터(MapIterator)가 반환됨, ❗맵이터레이터를 이용하면 데이터를 순회할 수 있음.
