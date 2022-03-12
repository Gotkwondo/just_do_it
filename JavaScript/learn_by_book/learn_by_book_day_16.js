//tip 38 상속으로 메서드를 공유하라
//이번엔 클래스를 확장하고 부모 클래스의 메서드를 불러오는 방법을 알아보자.

//초기에 클래스 상속을 하려면 객체의 속성이 존재하는지 확인하며 순회하고 부모로부터 새로운 객체의 프로토타입을 복사하고 메서드 추가를 해야 했다.
//클래스를 사용하면 상속이 간단해진다.
//하지만 상속을 사용할 때는 주의가 필요하다. 나쁜 코드로 이어진다는 의견이 있다.

//이제 상속의 동작원리에 대해 알아보자
//새로운 클래스를 선언하고 extends 키워드를 이용해 부모 클래스를 상속받는다.
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
} //부모 클래스

class FlashCoupon extends Coupon{
};
const flash = new FlashCoupon(10);
console.log(flash.price);
console.log(flash.getPriceText());
console.log(flash.expiration);

//자식 클래스의 속성을 변경하려면 부모 클래스와 마찬가지로 속성을 받는 생성자 함수를 추가한다.
//새로운 생성자에서 부모 클래스의 생성자에 접근하려면 super()를 호출해야 한다.
//super()는 부모 클래스의 생성자를 호출하기에 부모 클래스의 생성자가 필요한 인수가 있으면 super()를 이용해 넘길 수 있다.
//새로운 속성을 추가하거나 부모 생성자가 설정한 속성을 덮어 쓸 수 있다.
class FlashCoupon2 extends Coupon{
  constructor(price, expiration) {
    super(price);
    this.expiration = expiration || `2시간`;
  }
}
const flash2 = new FlashCoupon2(5);
console.log(flash2.price);
console.log(flash2.expiration);
//위의 예제에서 부모 클래스에 있는 getExpirationMessage() 메서드를 시용하지만 expiration 속성은 자식 클래스에 있는 것을 사용한다.

//자바스크립트 엔진은 메서드를 호출할 때마다 현제 클래스에 메서드가 있는지 없는지 확인하고 없다면
//상속 연결된 상위로 올라가 각 클래스나 프로토타입을 확인한다.
//이 말은, 클래스에 같은 이름의 메서드를 새로 작성하면 부모 클래스의 상속한 메서드를 대체한다는 말이다.

//이제 두개의 메서드를 추가해보자.
//이때 주의해야 할 점은, 부모 클래스에 추가하는 모든 메서드는 자식 클래스에 추가된다는 것인데
//이는 자칫 자식 클래스가 필요하지 않는 메서드 추가 한다면 클래스가 비대해지기 쉽다.
const user = {
  rewardsEligible: true,
  active: true,
}
class Coupon2{
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
  isRewardsEligible(user) {
    return user.rewardsEligible && user.active; //임의로 rewardsEligible와 active는 true로 하겠다.
  }
  getRewards(user) {
    if (this.isRewardsEligible(user)) {
      this.price = this.price * 0.9;
      return this.price;  //항상 반환 값이 있는지 확인하고 로그를 살펴보자....
    }
  }
}
const coupon2 = new Coupon2(10);
console.log(coupon2.isRewardsEligible(user));
console.log(coupon2.getRewards(user));

//마지막으로 약간의 조건을 추가하며 자식 클래스를 만들어 보자
class FlashCoupon3 extends Coupon2{
  constructor(price, expiration) {
    super(price);
    this.expiration = expiration || `2시간`;
  }
  getExpirationMessage() {
    return `이 쿠폰은 깜짝 쿠폰이며 ${this.expiration}뒤에 소멸됩니다.`;
  }
  isRewardsEligible(user) {
    return super.isRewardsEligible(user) && this.price > 20;
  }
  getRewards(user) {
    if (this.isRewardsEligible(user)) {
      this.price = this.price * 0.8;
      return this.price;
    }
  }
}
const flash3 = new FlashCoupon3(25);
console.log(flash3.getExpirationMessage());
console.log(flash3.isRewardsEligible(user));
console.log(flash3.getRewards(user));



//tip 39 클래스로 기존의 프로토타입을 확장하라
//기존의 프로토타입과 클래스를 사용하는 법을 알아보자

//자바스크립트의 클래스와 프로토타입은 다르지 않다.
//클래스는 단지 보통의 자바스크립트를 작성하는 간결한 방법일 뿐이다.
//자바스크립트의 클래스와 전통적인 객체 지향 언어의 차이를 이햄으로 새로운 문법과 레거시 코드를 통합할 수 있다.
//통합하는 과정에서 나타나는 버그를 방지할 수 있다.

//자바스크립트와 전통적인 객체 지향 언어의 차이점을 알아 보자.

//🔶우선 루비와 같은 전통적인 객체 지향 언어는 클래스를 사용하는 경우
//클래스가 객체를 위한 청사진이 되고, 새로운 인스턴스 생성시 개로운 객체에 모든 속성과 메서드가 복제된다.

//🔷자바스크립트는 프로토타입 언어이다.
//자바스크립트는 새로운 인스턴스를 생성할 때 메서드를 복제하지 않고 프로토타입에 대한 연결을 생성한다.
//객체의 인스턴스에 있는 메서드를 호출하면 프로토타입에 있는 메서드를 호출한다. 이는 청사진이 아니라 객체 인스턴스이다.

//또한 자바스크립트에서 class라는 단어는 새로운 기능이 아니라 프로토 타입을 사용하기위한 속기법이다.
//기존의 코드베이스와 클래스 문법을 통합할 수 있음을 알아야 한다.

//ES5이전에 자바스크립트에서는 new키워드를 이용해 새로운 객체 인스턴스를 생성하려고 할 때 함수를 사용했다.
//생성자 함수와 클래스의 constructor 메서드가 매우 비슷하다. 🔰함수와 메서드의 차이점은 객체 안에서 선언되었나로 구분된다. 객체안에서 선언됬으면 메서드이다.

//함수를 생성자로 사용하려면 코딩 컨벤션으로 함수명을 대문자로 시작한다.
//함수 내부에서 this키워드를 사용해 속성을 연결할 수 있다.
//new 키워드를 이용해 새로운 인스턴스를 생성시 함수를 생성자로 사용하고 this문맥을 바인딩 한다.
function Product(price, expiration) {
  this.price = price;
  this.expiration = expiration || `2주`;
}
const product = new Product(5, `2개월`);
console.log(product);
//이전에 클래스에서 작성했던 constructor메서드를 꺼내어 독립적으로 작동하게 한것 뿐이다.
//여기서 문제는 모든 메서드가 없어졌다는 것이다.

//new키워드로 새로운 인스턴스를 생성할 때, 생성자를 실행하고 this문맥을 바인딩하지만 메서드를 복제하지는 않는다.
//생성자에서 this에 메서드를 추가할 수 있지만, 프로토타입에 직접 추가하는 것이 훨씬 좋다.

//프로토타입은 생성자 함수의 기반이 된느 객체이다.
//모든 객체 인스턴스는 프로토타입세서 속성을 가져오고 새로운 인스턴스도 프로토타입에 있는 메서드를 사용할 수 있다.

//프로토타입에 메서드를 추가하려면 생성자 이름을 사용해 객체 인스턴스에 함수나 속성을 추가하는 것처럼
//prototype속성에 메서드를 추가하면 된다.
Product.prototype.getExpirationMessage = function () {
  return `유통기한은 제조 후 ${this.expiration} 까지입다.`;
}
console.log(product.getExpirationMessage());
//class키워드를 이용해 객체를 생성해도 프로토타입을 생성하고 문맥을 바인딩하지만 더욱 직관적인 인터페이스를 사용하는 것이다.

//생성자 함수와 프로토타입을 사용해 작성한 코드는 이전에 생성한 코드와 동일하다.
//겉으로는 다르게 보이지만, 프로토타입을 생성하는 것은 같기 때문이다.

//위의 두 방시깅 동일하므로 프로토타입을 이용해 생성한 레거시코드에 새로운 코드를 추가할 때 클래스를 사용할 수 있다.
class FreshProduct extends Product{
  constructor(price, expiration) {
    super(price);
    this.expiration = expiration || `2주`;
  }
  getExpirationMessage() {
    return `이 제품은 신선 제품으로 유통기한은 ${this.expiration} 입니다.`
  }
}