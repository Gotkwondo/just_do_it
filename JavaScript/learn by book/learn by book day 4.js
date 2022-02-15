//tip 14 맵과 펼침연산자로 키-값 데이터를 순회하라

//배열을 for-in으로 순회한것
const obj = {
  name: 'melon',
  weight: 4350,
  price: 16500,
  isFresh: true
}

//값에 접근 가능한 key(properties' name)이 인덱스 역할을 한다.
// for (let key in obj) {
//   const value = obj[key];
  
//   console.log(key);
//   console.log(value);
// }

// for (const v of `문자열`) {
//   console.log(v);
// }

const filters = {
  색상: `검정색`,
  견종: `래브라도레트리버`,
};
function getAppliedFilters(filters) {
  const keys = Object.keys(filters);
  const applied = [];
  for (const key of keys) {
    applied.push(`${key}:${filters[key]}`);
  }
  return `선택한 조건은 ${applied.join(`, `)} 입니다.`
}
console.log(getAppliedFilters(filters));
//for 문을 실행하는 동안 객체를 참조해 값을 꺼낸다. 또한, 객체 정렬을 할 수 없다. 정렬하려면 키를 정렬해야한다.
function getSortedAppliedFilters(filters) {
  const keys = Object.keys(filters);
  keys.sort();
  const applied = [];
  for (const key of keys) {
    applied.push(`${key}:${filters[key]}`);
  }
  return `선택한 조건은 ${applied.join(`, `)} 입니다.`;
}
console.log(getSortedAppliedFilters(filters));
//간단한 순회를 위해 관리해야 할 것이 너무 많아 안좋다....

//맵에 있는 정렬과 순회에 필요한 기능(entries() 메서드)을 이용
const filters2 = new Map()
  .set(`색상`, `검정색`)
  .set(`견종`, `래브라도레트리버`);
function checkFilters(filters) {
  for (const entry of filters) {
    console.log(entry);
  }
}
checkFilters(filters2);
//이터레이터는 키-갑 쌍을 넘겨줌
//하지만 set()을 이용하면 여전히 배열로 변환하여 넘겨줌
//entries()메서드를 이용하면 키-값 쌍을 묶은 맵이터레이터를 반환함.
filters2.entries();
console.log(filters2.entries());

//for문으로 키-값을 문자열로 변환하는 메서드로 돌아가면, 맵을 직접 순회할 수 있기에 키를 먼저 꺼낼 필요❌
//맵을 순회할 때 키-값 쌍을 받아 해체 할당 문버ㅏㅂ으로 즉시 변수로 할당 가능. ✅for문으로 훨신 단순하고 원래의 데이터 구조를 유지하는 코드 작성✅
function getAppliedFilters2(filters) {
  const applied = [];
  for (const [key, value] of filters) {
    applied.push(`${key}:${value}`);
  }
  return `선택한 조건은 ${applied.join(`, `)} 입니다.`;
}
console.log(getAppliedFilters2(filters2));
//맵은 순서를 저장한다는 장점이 있다는 것을 확인 했지만, 맵은 정렬 메서드를 내장되어 있지 않다.
// 하지만 펼침 연산자를 이용하면 정렬할 수 있다.
console.log(...filters2);
//또한 맵 객체를 다른곳에 펼처 넣을 수 도 있다.
const arry1 = [...filters2];
console.log(arry1);

//
function sortByKey(a, b) {
  return a[0] > b[0] ? 1 : -1;
}
function getSortedAppliedFilters2(filters) {
  const applied = [];
  for (const [key, value] of [...filters].sort(sortByKey)) {
    applied.push(`${key}:${value}`);
  }
  console.log(applied.join(`, `));
  return `선택한 조건은 ${applied.join(`, `)} 입니다.`;
}
console.log(getSortedAppliedFilters2(filters2));

//앞서 작성했던 함수를 map() 메서드를 이용하여 다시 작성
function getAppliedFilters3(filters) {
  const applied = [...filters].map(([key, value]) => {
    return `${key}:${value}`;
  });
  return `선택한 조건은 ${applied.join(`, `)} 입니다.`;
}
console.log(getAppliedFilters3(filters2));
//위의 코드를 체이닝을 통해 정렬도 가능한 코드 작성
function getAppliedFilters4(filters) {
  const applied = [...filters]
    .sort(sortByKey)
    .map(([key, value]) => {
      return `${key}:${value}`;
    });
  return `선택하신 조건은 ${applied.join(`, `)} 입니다.`;
}