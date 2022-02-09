//tip 8 push()대신 펼침연산자
const cart = [{
  name: `the Foundation Triology`,
  price: 19.99,
  discount: false,
},
{
  name: `Godel, Escher, Bach`,
  price: 15.99,
  discount: false,
},
{
  name: `Red Mars`,
  price: 5.99,
  discount: true,
},
];
const reward = {
  name: `Guide to Science Fiction`,
  discount: true,
  price: 0,
};
function addFreeGift(cart) {
  if (cart.length > 2) {
    //cart.push(reward);
    //return cart;
    //push()를 사용하여 배열에 간섭한다면 함수를 이동할 경우 에러가 발생.
    return [...cart, reward]; //펼침연산자를 통해 안정적으로 작성 가능
    //기존의 배열을 재사용하여 기존 배열을 변경하지 않아도 됨.
  }
  return cart;
}
function summarizeCart(cart) {
  const cartWithReward = addFreeGift(cart);
  const discountable = cart.filter(item => item.discount);
  if (discountable.length > 1) {
    return {
      error: `할인 상품은 하나만 주문할 수 있습니다.`,
    };
  }
  return {
    discounts: discountable.length,
    items: cartWithReward.length,
    cart: cartWithReward,
  };
}

//tip 9 펼침연산자를 정령레 의한 혼란을 피하라
const staff = [
  {
    name: `Joe`,
    years: 10,
  },
  {
    name: `Theo`,
    years: 5,
  },
  {
    name: `Dyan`,
    years: 10,
  },
];
function sortByYears(a, b) {
  if (a.years === b.years) {
    return 0;
  }
  return a.years - b.years;
}
const sortByName = (a, b) => {
  if (a.name === b.name) {
    return 0;
  }
  return a.name > b.name ? 1 : -1;
}


// console.log(staff.sort(sortByYears));
// [
//   {
//     name: 'Theo',
//     years: 5
//   },
//   {
//     name: 'Joe',
//     years: 10
//   },
//   {
//     name: 'Dyan',
//     years: 10
//   },
// ];

// console.log(staff.sort(sortByName));
// [
//   {
//     name: 'Dyan',
//     years: 10
//   },
//   {
//     name: 'Joe',
//     years: 10
//   },
//   {
//     name: 'Theo',
//     years: 5
//   },
// ];
// console.log(staff.sort(sortByYears));
//위의 코드들을 연속적으로 보여주게 되면 변경된 배열의 상태는 저장되어진다.
//또한 다시 정렬시 배열의 인덱스가 뒤섞여서 사용자가 혼란스럽기도 하다.
//고로 위와 같은 방법이 아닌 펼침연산자를 이용하여 사용하면 변경된 값이 저장되어 나타나는 오류를 막을 수 있다.
console.log([...staff].sort(sortByYears));
// [
//   {
//     name: 'Theo',
//     years: 5
//   },
//   {
//     name: 'Joe',
//     years: 10
//   },
//   {
//     name: 'Dyan',
//     years: 10
//   },
// ];
console.log([...staff].sort(sortByName));
// [
//   {
//     name: 'Dyan',
//     years: 10
//   },
//   {
//     name: 'Joe',
//     years: 10
//   },
//   {
//     name: 'Theo',
//     years: 5
//   },
// ];

//tip 10 객체를 이용하여 정적인 키-값을 탐색하라
// function getBill(item) {
//   return {
//     name: item.name,
//     due: twoWeeksFromNow(),
//     total: calculateTotal(item.price),
//   };
// }
// const bill = getBill({
//   name: `객실 청소`,
//   price: 30
// });
// function displayBill(bill) {
//   return `${bill.name} 비용은 ${bill.price} 달려이며 납부일은 ${bill.due}입니다.`;
// }

//tip 11 Object.assign()으로 조작 없이 객체를 생성하라
const defaults = {
  author: ``,
  title: ``,
  year: 2017,
  rating: null,
};
const book = {
  author: `Joe Morgan`,
  title: `Smpifying Javascript,`
};
// function addBookDefaults(book, defaults) {
//   const fields = Object.keys(defaults);
//   const updated = {};
//   for (let i = 0; i < fields.length; i++){
//     const field = fields[i];
//     updated[field] = book[field] || defaults[field];
//   }
//   return updated;
// } 이 함수를 Object.assign()으로 대체하면 아래와 같다
// Object.assign(defaults, book);
console.log(Object.assign(defaults, book));
// {
//   author: 'Joe Morgan',
//   title: 'Simplifying JavaScript',
//   year: 2017,
//   rating: null,
// }
//하지만 기본값 객체를 갱신하면 원본 객체를 조작하게 된다.
const anotherBook = {
  title: `Another Book`,
  year: 2016,
};
// Object.assign(defaults, anotherBook);
console.log(Object.assign(defaults, anotherBook));
// {
//   author: 'Joe Morgan',
//   title: 'Another book',
//   year: 2016,
//   rating: null,
// }
//해결책은 객체에 빈 객체를 사용하는 것이다. 그러면 빈 객체에 새로운 값이 갱신되어 반환된다.
const updated = Object.assign({}, defaults, book);
console.log(updated);
//하지만 위의 코드처럼 속성을 복사하면 값만 복사를 한다.
//또한 Object.assign()은 깊은 복사, 깊은 병합은 안된다.
//즉, 객체안에 있는 객체의 속성은 복사가 안된다. 그저 객체에 대한 참조만 복사되고, 중첩된 객체의 값을
//변경하면 원본 객체와 복사한 객체 모두 변경된다.
//이 경우, 중첩된 객체도 복사해주면 된다.
// const employee2 = Object.assign(
//1   {},
//2  defaultEmployee,
//3   {
//     name: Object.assign({}, defaultEmployee.name),
//   },
// ); 이런 형식으로....
