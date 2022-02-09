//const
// const discountable = [];
// //  코드를 몇 행 건너뜀
// for (let i = 0; i < cart.length; i++){
//   if (cart[i].discountAvailable) {
//     discountable.push(cart[i]);
//   }
//} //const로 discrountable를 선언했지만 배열에 항목을 추가할 수 있음

//tip 5
const team = [
  `joe`,
  `dyan`,
  `bea`
];
const teams = [...team];
function alphabetizeTeam(team) {
  return [...team].sort();
}
console.log(alphabetizeTeam(teams));
console.clear();

const staff = [{
  name: `Wesley`,
  position: `musician`,
},
{
  name: `Davis`,
  position: `engineer`,
},
];
function getMusicians(staff) {
  return staff.filter(member => member.position === `musician`);
}
console.log(getMusicians(staff))
console.clear();

const game1 = {
  player: `jim`,
  hits: 2,
  runs: 1,
  errors: 0,
};
const game2 = {
  player: `kim`,
  hits: 3,
  runs: 0,
  errors: 1,
};
const total = {};
const stats = Object.keys(game1);
for (let i = 0; i < stats.length; i++){
  const stat = stats[i];
  if (stat !== `player`) {
    total[stat] = game1[stat] + game2[stat];
  }
}
console.log(stats)

const dog = {
  name: `don`,
  color: `black`,
};
console.log(dog.name);

const dogPair = [
  [`name`, `tan`],
  [`color`, `black`],
];
function getName(dogPair) {
  return dogPair.find(attribute => {
    return attribute[0] === `name`;
  })[1]
}
console.log(getName(dogPair));


//tip 6
const sections1 = [`shipping`];
function displayShipping(sections1) {
  if (sections1.indexOf(`shipping`)) {
    return true;
  }
  return false;
}
console.log(displayShipping(sections1))
//숫자와 비교하는 과정을 거친 코드
const sections2 = [`contact`, `shipping`];
function displayShipping2(sections2) {
  return sections2.indexOf(`shipping`) > -1;
}
console.log(displayShipping2(sections2));
//includes를 사용한 코드
const sections3 = [`contact`, `shipping`];
function displayShipping3(sections3) {
  return sections3.includes(`shipping`);
}
console.log(displayShipping3(sections3));


//tip 7 펼침연산자
const cart = [`Naming and Necessity`, `Alick in Wonderland`];
const copyCart = [...cart];
console.log(copyCart);


const books = [`practical vim`, `moby dick`, `the dark tower`];
//배열에서 항목을 제거하는 코드1
// function removeItem(items, removable) {
//   const updated = [];
//   for (let i = 0; i < items.length; i++){
//     if (items[i] !== removable) {
//       updated.push(items[i]);
//     }
//   }
//   return updated
// }
// console.log(removeItem(items, removable));

// //배열에서 항목을 제거하는 코드2 splice사용
// function removeItem(items, removable) {
//   const index = items.indexOf(removable); //삭제할 대상의 인덱스 값
//   items.splice(index, 1);
//   return items;
// }

// const recent = removeItem(books, `moby dick`);
// const novels = removeItem(books, `practical vim`);
// console.log(novels);
//문제점 : 2개의 과정을 거치면서 대상이 2개가 없어져 전달하고자 하는 정보가 달라짐

//배열에서 항목을 제거하는 코드3 slice사용
// function removeItem3(items, removable) {
//   const index = items.indexOf(removable);
//   return items.slice(0, index).concat(items.slice(index + 1));
// }
// console.log(removeItem3(books, `moby dick`));

//배열에서 항목을 제거하는 코드4 펼침 연산자와 slice()사용
function removeItem(items, removable) {
  const index = items.indexOf(removable);
  return [...items.slice(0, index), ...items.slice(index + 1)];
}
console.log(removeItem(books, `moby dick`));

//펼침 연산자의 활용법
const book = [`Reasons and Person`, `Derek Parfit`, 19.99];
// function formatBook(title, author, price) {
//   return `${title} by ${author} $${price}`;
// }
// console.log(formatBook(book[0], book[1], book[2]));
//위의 방법을 펼침 연산자를 이용하여 바꾸면 아래와 같다
function formatBook(title, author, price) {
  return `${title} by ${author} $${price}`;
}
console.log(formatBook(...book));