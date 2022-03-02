//tip 37 읽기 쉬운 클래스를 만들어라
//클래스 문법은 오래동안 자바스크립트에서 없던 문법이지만 최근에 등장했다.
//클래스 문법은 일반적인 개발 패러다임이며 다른 언어 개발자들도 익숙한 개념이라 말하는 반면,
//언어 내부의 장ㄴ스러운 부분을 왜곡하는 나쁜 습관을 조장한다고도 한다.
//허나 클래스는 앵귤러(Angular)나 리액트(React)같이 인기있는 프래임워크를 사용한다면 유용하게 사용된다.

//클래스를 선언할 때는 class 키워드 사용하고 새로운 인스턴스를 생성할 때는 new 키워드를 사용한다.
class Coupon {
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`
  }
}
const coupon = new Coupon();
console.log(coupon);

//1️⃣클래스의 인스턴스를 생성할 때는 생성자 함수를 실행한다.
//생성자 함수에서 여러가지 속성을 정의할 수 있다.
//생성자 함수를 반드시 선언해야 하지는 않지만, 대부분의 경우에 사용될 것이다.

//2️⃣생성자 함수 선언을 한 후 생성자 메서드를 생성한다.
//function키워드 없이 func() 같은 형식으로 작성해 준다.
//생성자는 함수이므로 인수를 자유롭게 전달할 수 있다.

//❗생성자의 역활중 하나는 this 문맥을 생성하는 것이다
//키-값 쌍을 추가하는 것처럼 this에 할당하는 방법으로 클래스에 속성을 추가할 수 있다.
//또한, 생성자가 인수를 전달 가능하기에 새로운 인스턴스를 생성할 때 속성을 동적으로 설정 가능하다.

//위의 코드에서 배열 문법이나 점 표기법으로 속성을 불러 올 수 있다는 것을 보여준다.

//현제 모든 속성은 공개(public)이다. 비공개필드, 즉 비공개 속성 또는 메서드는 현제 논의중이다.

//다음 단계로 두가지 간단한 메서드를 추가해 보자
class Coupon2 {
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`;
  }
}
const coupon2 = new Coupon2(5);
console.log(coupon2.price);
console.log(coupon2.expiration);
//생성자와 동일한 문법으로 클래스에 메서드를 추가할 수 있다.
//메서드는 화살표 함수가 아닌 보통 함수로 작성한다.
//화살표 함수는 바인딩이 전역 객체에 바인딩 됨으로 바뀌므로 전역 참조가 되어 에러가 발생한다.(14일차에 적어 놨다)

//클래스 메서드를 클래스의 인스턴스에서 호출하면 this문맥에 완전하게 접근이 가능하다.(다음 팁에서 알아보자)
//이 점을 용하면 다른 속성이나 메서드를 참조하는 아래와 같은 메서드를 만들 수 있다.
class Coupon3 {
  constructor(price, expiration) {
    this.price = price;
    this.expiration = expiration || `2주`;
  }
  getPriceText() {
    return `$${this.price}`;
  }
  getExpirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon3 = new Coupon3(5);
console.log(coupon3.getPriceText());
console.log(coupon3.getExpirationMessage());

//this 문맥을 연결해 주는 생성자 함수를 이용해 새로운 객체를 생성할 수 있다.
//메서드를 호출하고 속성에도 접근할 수 있다. 이 모든 것이 직관적인 인터페이스를 이용한다고 한다...
//하지만 객체를 생성하기 때문에 문맥이나 유효 범위 문제가 있을것이다...