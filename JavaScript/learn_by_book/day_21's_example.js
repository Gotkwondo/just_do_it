//import의 예시
import { capitalize, roundToDecimalPlace } from './learn_by_book_day_21.js';
function giveTotal(name, total) {
  return `${capitalize(name)}님, 합계는 ${roundToDecimalPlace(total)}입니다.`
}
console.log(giveTotal(`sara`, 10.33333));
//  Sara님, 합계는 10.33입니다.

//*(별표)를 이용해 모든 함수를 불러오는 예시
import * as utils from './learn_by_book_day_21.js';
function greet(name) {
  return `Hello, ${utils.capitalize(name)}`;
}
console.log(greet(`Juhyeon`));
export { greet };

//내보내기 숏컷(export 키워드를 function 앞에 작성)
import { testFunction } from './learn_by_book_day_21.js';
function test1(word) {
  return testFunction(word);
}
console.log(test1(`im ohjuhyeon`));

// //내보내기 기본값(export default)사용 예시
// import normalize from './learn_by_book_day_21.js';
// function getAddress(user) {
//   return normalize(user);
// }

//import문의 혼합
import normalize, { parseRegion } from './learn_by_book_day_21.js';
function getAddress(user) {
  return normalize(user.address);
}
export function getAddressByRegion(users) {
  return users.reduce((regions, user) => {
    const { address } = user;
    const region = parseRegion(address);
    const addresses = regions[region] || [];
    regions[region] = [...addresses, normalize(address)];
    return regions;
  }, {});
}
const bars = [
  {
    name: `Saint Vitus`,
    address: {
      street: `1120 manhattan`,
      city: `Brooklyn`,
      state: `NY`,
    },
  },
];
console.log(getAddressByRegion(bars));