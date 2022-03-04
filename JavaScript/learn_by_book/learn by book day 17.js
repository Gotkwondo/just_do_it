//tip 40 get과 set으로 인터페이스를 단순하게 만들어라
//get과 set을 이용해 단순한 인터페이스 뒤로 로직을 숨기는 방법을 알아보자

//자바 스크립트는 비공개 속성을 지원하지 않아 클래스를 사용하는 쪽에서 메서드나 속성을 어떻게 사용하느지 제어할 수 없다.
//클래스 사용자가 인스턴스의 속성에 점표기법으로 속성에 접근할지, 단순한 객체에 coupon.price = 11 같이 접근할 수 도 있다.
//이런것은 큰 문제는 아니지만, 다른 개발자나 코드 작성자의 의도하지 않게 코드의 다른 부분에 값을설정하는 경우가 있을 수 있다.
//예를 들어 정수값을 할당해야 하는 속성에 문자열이 들어가는 것처럼 작은 변화가 클래스에 퍼지면 예상치 못한 버그가 발생한다.
class Coupon {
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`
  }
  getPriceText() {
    return `$${this.price}`;
  }
  getExpirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon = new Coupon(5);
coupon.price = `$10`;
console.log(coupon.getPriceText()); //  $$10

//이 상황에서의 해결책 중 한가지는 게터와 세터를 이요해 로직을 추가하고 속성을 뒤로 숨기는 것이다.
//게터 또는 세터는 함수를 속성처럼 보이게 해서 복잡성을 숨기는 방법이다.

//게터로 메서드를 리팩토링하는 것은 쉽다. 메서드 앞에 get 키워드를 추가하면 된다.
//함수 이름을 동작 대신 명사로 수정할 수도 있다.
class Coupon2{
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`
  }
  get priceText() {
    return `$${this.price}`;
  }
  get expirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon2 = new Coupon2(5);
coupon2.price = 10;
console.log(coupon2.priceText);
console.log(coupon2.expirationMessage);
//리팩토링 이후 간단한 점표기법으로 메서드를 호출할 수 있고 괄호를 사용하지 않는다.
//메서드가 마치 속성처럼 작동한다.

//위의 방법대로 한다면 정보를 가져오기는 쉽지만 잘못된 값을 설정할 수 도 있다.
//그러므로 세터도 생성해 줘야한다.

//세터도 게터처럼 동작한다. 메서드를 속성처럼 보이게하여 메서드를 숨겨준다.
//세터는 인수를 하나만 받고, 속성을 변경한다.
//세터에 인수를 전달할 때 객체에 값을 설정하는 것처럼 등호를 사용해 값을 전달한다.
class Coupon3{
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`;
  }
  set halfPrice(price) {
    this.price = price / 2;
  }
}
const coupon3 = new Coupon3(5);
coupon3.price = 20;
console.log(coupon3.price);
coupon3.halfPrice = 20;
console.log(coupon3.price);
//하지만 세터에 상응되는 게터가 없다면 값을 가져올 수 없기에 게터와 쌍을 이루는 것이 좋다.
console.log(coupon3.halfPrice); //  undifined
//그리고 같은 이름을 갖는 것이 좋다.
//다만 게터나 세터의 이름과 같은 이름을 가진 속성은 둘 수 없다.
//그렇게 된다면 호출 스택이 무한히 쌓이기에 오류가 발생한다.

//해결책은 다른 속성을 게터와 세터 사이의 가교로 사용하는 것이다.
//가교로 만든 속성에 접근하는 것은 좋지 않고, 클래스 내부적인 용도로만 사용하려고 할 것이다.
//자바스크립트는 비공개 속성을 지원하지 않아서 코딩 컨벤션을 따를 수밖에 없다.
//이름 앞에 밑줄을 입력해 메서드나 속성이 비공개라는 점을 표시하자.
//_price와 같이 밑줄이 있다면 직접 접근하는 것은 좋지 않다.

//중간 처리를 위한 석성을  설정한 후에는 게터와 세터를 밑줄 없이 같은 이름으로 두고 값에 접근하거나 수정할 수 있다.

//이제 예제에서 this.price를 this._price로 변경하고 this._price에 접근할 수 있는 게터와 정수만 남기고 숫자가 아닌 문자는 모두 제거하는 세터를 생성한다.
class Coupon4{
  constructor(price, expiration) {
    this._price = price;
    this.expiration = expiration || `2주`;
  }
  get priceText() {
    return `$${this._price}`;
  }
  get price() {
    return this._price;
  }
  set price(price) {
    const newPrice = price
      .toString()
      .replace(/[^\d]/g, ``);
    this._price = parseInt(newPrice, 10);
  }
  get expirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon4 = new Coupon4(5);
console.log(coupon4.price);
coupon4.price = `$10`;
console.log(coupon4.price);
console.log(coupon4.priceText);
//이러한 방법의 장점은 굳이 리팩토링할 필요가 없다는 뜻이다.
//기존의 코드가 의도대로 잘 작동하기 때문이다.


//tip 41 제너레이터로 이터러블 속성을 생설하라
//이터러블은 데이터를 다룰 때 개별 데이터에 접근할 수 있도록 해서 좀 더 많은 유연성을 제공한다.
//하지만 객체에는 이터레이터가 없고 직접 순회를 할 수 없기에 일부를 배열로 변화시켜줘야한다.
//이는 객체의 구조와 이터러블의 유연성이 동시에 필요한 경우에 큰 문제가 될 수 있다.

//제너레이터라는 특별한 함수를 이용하면 데이터를 한 번에 하나씩 반환할 수 있다.
//제너레이터는 클래스에 국한되지 않는다.
//🔰제너레이터란? 함수가 호출되었을 때 그 즉시 끝까지 실행하지 않고 중간에 빠져나갔다가 다시 돌아올 수 있는 함수이다.
//완전히 실행되지만 함수를 반환하는 고차함수와는 다르다.
//즉, 제너레이터는 다음 단계 전까지 기본적으로 일시 정지하는 중단점이 있는 함수이다.

//제너레이터를 생성하려면 function 키워드 뒤에 *를 추가하면된다.
//newxt() : 함수의 일부를 반환하는 메서드로 함수를 실행할 때 함수가 내보낸 정보를 가져올 수 있다.
//yield 키워드 : 함수 몸체 안에서 정보를 반환한다.
//next()를 호출하면 두개의 키 value와 done로 구성된 객체를 가져온다.
//yield로 선언한 항목이 value이고, done은 남은 항목이 없다는 것을 알려준다.
function* getCairoTrilogy() {
  yield `궁전 샛길`;
  yield `욕망의 궁전`;
  yield `설탕 거리`;
}
const trilogy = getCairoTrilogy();
console.log(trilogy.next());
//  {value: '궁전 샛길', done: false}
console.log(trilogy.next());
//  {value: '욕망의 궁전', done: false}
console.log(trilogy.next());
//  {value: '설탕 거리', done: false}
//함수를 단계별로 조각조각 실행할 수 있다.
//정보가 매우 많고 일부만 접근해야 할 때 유용하다.
//정보의 일부만 꺼내고 다음 조각을 다른곳에 사용하기 위해 제너레이터를 전달해줄 수 있다.
//고차함수의 경우처럼 다른 곳에 사용할 수 있다.

//제너레이터가 함수를 이터러블로 바꿔준다는 점이 특이하다.
//데이터를 한번에 하나씩 접근하기에 쉽게 이터러블로 만들 수 있다.

//제너레이터를 이터러블로 사용할 때 꼭 next()메서드를 사용할 뿐 아니라 펼침연산자 처럼 이터러블이 필요한 작업은 무엇이든 가능하다.
console.log([...getCairoTrilogy()]);

//객체에 키-값을 추가하려면 for-of문을 이용하면 된다.
const readingList = {
  '깡패단의 방문': true,
  '맨허튼 비치': false,
};
for (const book of getCairoTrilogy()) {
  readingList[book] = false;
}
console.log(readingList)  //  {깡패단의 방문: true, 맨허튼 비치: false, 궁전 샛길: false, 욕망의 궁전: false, 설탕 거리: false}

//제너레이터는 게터와 세터처럼 클래스에 단순한 인터페이스를 제공할 수 있다.
//복잡한 데이터 구조를 다루는 클래스를 만들 때 단순한 배열을 다루는 것처럼 데이터에 접근할 수 있게 설계가 가능하다.

//예제로 트리 데이터 구조를 보자
//트리 데이터 구조는 검색하고 조회하는 데는 이점이 있지만, 정보를 평면화 하기가 어렵다는 특징이 있다.
//이를 위해서는 빈 배열을 생성후 정보를 담아 반환하는 메서드를 만들어야 된다.
class FamilyTree {
  constructor() {
    this.family = {
      name: `할아버지 할머니`,
      child: {
        name: `어머니 아버지`,
        child: {
          name: `나`,
          child: {
            name: `미래의 자식`,
          },
        },
      },
    };
  }
  getMembers() {
    const family = [];
    let node = this.family;
    while (node) {
      family.push(node.name);
      node = node.child;
    }
    return family;
  }
}
const family = new FamilyTree();
console.log(family.getMembers()); //['할아버지 할머니', '어머니 아버지', '나', '미래의 자식']

//제너레이터를 사용하면 배열에 담지 않고 데이터를 바로 반환할 수 있습니다.
//사용자가 메서드 이름을 찾아볼 필요도 없고, 정보를 담고 있는 속성을 마치 배열인 것처럼 바룰 수 있다.

//위의 코드에서 getMenbers() 대신 * [Symbol.iterator]() 로 작성해준다. *은 제너레이터를 생성한다는 말이고
//Symbol.iterator는 객체(제너레이터)엥 대응하는 기본(클래스의) 이터레이터를 지정한다. 맵 객체가 맥이터레이터를 가지고 있는 것과 비슷하다.
//앞서 살펴본 예제의 제너레이터와 다른 점은 특정 값을 명시적으로 반환하지 않는 부분이다.
//대신에 반복문이 매 회마다 yield로 값을 넘겨준다.

//이로서 중간 단계의 배열을 사용할 필요가 없어졌다.
//펼침 연산자나 for-of문처럼 이터러블이 필요한 작업이 있다면 클래스 인스턴스에 바로 호출해 사용 가능하다.
class FamilyTree2 {
  constructor() {
    this.family = {
      name: `할아버지 할머니`,
      child: {
        name: `어머니 아버지`,
        child: {
          name: `나`,
          child: {
            name: `미래의 자식`,
          },
        },
      },
    };
  }
  * [Symbol.iterator]() {
    let node = this.family;
    while (node) {
      yield node.name;
      node = node.child;
    }
  }
}
const family2 = new FamilyTree2();
console.log([...family2]);