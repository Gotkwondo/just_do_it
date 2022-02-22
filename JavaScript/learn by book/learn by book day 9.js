//tip 27 for-in문과 for-of문으로 반복문 정리
//이번에는 반복문의 명료성을 유지하는 법을 배워보자
//필요한 결과와 일치하지 않을 때는 반복문의 사용의 이점이 없다.

const firm = new Map()
  .set(10, `Ivie Group`)
  .set(23, `Soundscaping Source`)
  .set(31, `Big 6`);
console.log(firm);
//컬랙션은 배열이 아니므로 for문을 사용할 수 없다. ❗❗그러므로 펼침 연산자를 이용해 맵을 배열로 변환하면 해결할 수 있다.
const entries = [...firm];
for (let i = 0; i < entries.length; i++){
  const [id, name] = entries[i];
  if (!isAvailable(id)) {
    return `${name}는 사용할 수 없습니다.`;
  }
}
// // return `모든 회사는 사용할 수 있습니다.`;
// //위의 코드는 간단하다. 실행에 필요한 정보를 알기 쉽게 가져온다.
// //하지만 반복문을 더 효율적으로 작성하는 방법을 알고 있고, 배열 메서드를 사용할 수 있다.

const unavailable = [...firm].find(firm => {
  const [id] = firm;
  return !isAvailable(id);
});
if (unavailable) {
  return `${unavailable[1]}은 사용할 수 없습니다`;
}
// return `All firms are available`;
//위의 코드는 코드 작성을 위해 주석 처리를 했지만 반환되는 기본 값이 All firms are available로 할 수 있다

//그렇다면 위의 코드를 reduce()를 이용해 작성 해보자.
const message = [...firm].reduce((availability, firm) => {
  const [id, name] = firm;
  if (!isAvailable(id)) {
    return `${name}는 사용할 수 없습니다`;
  }
  return availability;
}, `모든 회사를 사용할 수 있습니다.`);
//return message;
//위에서 return message;를 통해 초기값이 모든회사를 사용할 수 있다는 메세지를 전달하게 하는 코드를 reduce()를 이용해 작성했다.
//위의 코드는 코드의 동작을 이해하려면 두번을 읽어야한다.

//find()는 이용할 수 없는 회사가 있는지 확인하고 반환하는 두 단계를 거쳐야 하고, 이용이 불가능한 회사중 첫번째만 찾는다
//reduce()는 코드를 이해하기 어렵고, 마지막 회사만 찾을 수 있다.

//이러한 문제를 해결하려면 filter()와 map()을 사용해서 만들어야한다. 아직은 아니다...ㅠ
//해봤는데 filter와 map을 어떻게 연결해야 할지 감이 안온다. 
const test = [...firm]
  .map(([id, name]) => {
    const arry = [];
    if (id > 20) {
      arry.push(`${name}은 사용 가능합니다.`);
    }
    return arry;
  })
  .filter(name => {
    const arry = [];
  for (let i = 0; i < name.length; i++){
    if (name[i]) {
      console.log(name[i])
      arry.push(`${name[i]}은 사용 가능합니다.`);
    }
    return arry;
  }
})
console.log(test);
//되긴 했다. 근데 너무 난잡하다. 일단 다음 진도를 위해 뒤로 미루자... 이걸 1시간 동안 했다니...

//위에서 같은 결과를 얻는 3가지 방법을 알아봤다.
//3가지 방법에 공통적으로 사용되는 기술은 맵을 배열로 변환하는 것이다.
//맵이터레이터를 이용하면 펼침 연산자를 이용해 맵을 직접 순환 시킬 수 있다. 맵이터레이터는 맵, 배열, 세트에 존재한다.
//또한 특별한 점은 반복문인 for-of문을 사용가능하다는 것이다. for-of문은 색인(let i=0;...)이 필요가 없고 색인 대신 컬렉션의 멤버를 직접 순환한다.
//반복문 매개변수에서 개별 항목의 이름을 선언하고 내부에서 사용
//앞서 작성한 코드를 for-of문을 이용해 작성해 보자.
for (const firm of firms) {
  const [id, name] = firm;
  if (!isAvailable(id)) {
    return `${name}은 사용할 수 없습니다.`;
  }
  return `모두 사용할 수 있습니다.`;
}
//for-of문에서 주의 해야 할 점은 위에서 firm을 const로 선언해주어 블록유효범위로 인해 반복문 밖에 영향을 안준다는 것,
//컬렉션 전체를 참조하던 방식(arry[i])을 벗어난 것, 이터러블의 순회를 위해 배열번화가 없으므로 약간의 최적화가 이루어졌다는 것이다.

//하지만 단점도 있다. 반복문으로 무엇이든 할 수 있기에 예측 가능성이 떯어진다.
//배열 메서드를 사용할 때 컬렉션을 조작할 가능성이 있다는 것이다. 컬렉션을 순회할 때 컬렉션 조작만 없다면 예측 가능성이 떯어지는게 유일한 단점이라 할 수 있다.

//항상 바로 반복문을 사용하지 않고 배열 메서드가 명확하고 적합할때는 배열메서드를 우선 사용해야한다.
//예를 들어, 맵에서 배열로 변환시 map(), 데이터를 걸러낼 때 filter()를 사용하는 것처럼 for-of문이 필요한 경우에만 사용을 해야한다.

//이제 for-in문을 알아보자. 키-값 객체에만 작동을 하는 for-in문이다.
//for-in문과 for-of문은 유사하다. 객체에 필요한 작업을 직접 실행하기에 Object.keys()를 실행시켜 키를 배열로 반환할 필요가 없다.
//객체 속성에 있는 문제 - 1️⃣객체는 프로토타입 체인에 있는 다른 객체에서 속성을 상송받는다.(프로토타입이란❓ 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례로 검색하는 것)
//                      2️⃣객체에는 열거할 수 없는 속성이 있어 순회에서 제외되기도 한다.
//객체에서는 key가 문자열이 되어야 하므로 숫자에서 문자열로 바꿔야한다.(객체의 문제점이다)
const firms = {
  '10': 'Ivie Group',
  '23': 'Soundscaping Source',
  '31': 'Big 6',
};
//for-in문은 for-of문과 다르지 않게 매번 키를 사용해 전체 컬렉션을 참조, 각 항목을 한번에 하나씩 받는다.
//앞서 작성한 for-of문을 for-in문으로 작성해 보자.
for (const id in firms) {
  if (!isAvailable(parseInt(id, 10))) {
    return `${firms[id]}는 사용할 수 없습니다.`;
  }
}
//return `모든 회사를 사용할 수 있습니다.`;
//키-값 쌍이 아니라 속성을 가져오기 때문에 이름, 값을 따로 추출할 필요가 없다
//값이 필요한 경우 배열 표기법으로 개별 항목의 값을 가져올 수 있다.
//키를 정수로 사용하려면 parseInt()를 사용해 변환해야한다.

//for-of문과 마찬가지로 for-in문도 무분별하게 사용하지 말고 상황에 맞게 사용해라.
//키만 필요한 경우 Object.keys()로 추출하여 사용하고, 값만 필요하면 Object.values()를 사용해서 배열로 반환할 수 있다.
//그리고 마지막으로 객체를 순회하며 객체를 조작하지 말자. 조작은 매우 위험하며 반복중인 속성 이외의 속성 추가시 버그가 확산될 가능성이 높다.



//tip 28 매개변수 기본값을 생성하라 (매개변수가 채워져 있지 않을 때 매개변수 기본값을 설정하는 법)
//파운드를 킬로그램으로 변환하는 예제를 보자
function convertWeight(weight) {
  return weight / 2.2;
}
//매개변수를 늘려야 할 경우, 함수 호출을 바꿀순 있지만 실수할 가능성이 있다.
//다행히도 JS에서는 함수에 모든 매개변수를 전달할 필요가 없다. 매개변수를 선택적으로 적용할 수 있기때문이다.(매개변수 누락시 값이 undefined됨)

//그렇다면 실수할 가능성을 배재하고 삼항 조건 연산자를 이용해 매개변수가 없을때의 경우도 추가해보자
function convertWeight2(weight, ounces) {
  const oz = ounces ? ounces / 16 : 0;
  const total = weight + oz;
  return total / 2.2;
}
//대부분의 결과 값이 소숫점 아래로 길게 이어진 값이 반환된다.
//거기다 3이 나와야하는 값에 2.99999... 같은 값이 나온다. 이유는 부동 소수점 연산 때문이다.
//그렇다면 이제 반올림을 통해 보완해보자. 그리고 반올림을 하기에 소수점 자릿수를 지정할 수 있도록 만들어 보자.
function roundToDecimalPlace(number, decimalPlaces) { //부동 소수점을 해결하기 위한 함수
  const round = 10 ** decimalPlaces;  //거듭제곱 할당 **
  return Math.round(number * round) / round;
}
//여기서 잠시, 소수점 두번째 자리까지 나오게 하려면 지정할 매개변수가 참인지 확인하는 것으로는 부족하다.
//0이 반환되면 거짓이 되기에 undifined가 되지 않는지 확인해야한다.
function convertWeight3(weight, ounces, roundTo) {
  const oz = ounces / 16 || 0;
  const total = weight + oz;
  const conversion = total / 2.2;
  const round = roundTo === undefined ? 2 : roundTo;
  return roundToDecimalPlace(conversion, round);
}
//함수가 어려워지고 있다...
//매개변수를 추가할 때마다 기본값을 설정하기 위해 삼항 연산자나 단락 펼가를 추가해야한다...

//하지만 매개변수의 기본값을 사용한다면 변수 검증을 위한 코드를 최소화할 수 있다.
//❗매개변수 기본값은 매개변수에 값을 전달하지 않았을 때 미리 정해둔 값을 사용하는 것이다.
//사용방법은 매개변수 기본값을 사용하려면 매개변수명 옆에 등호로 기본값을 정의한다. 이제 코드 작성을 해보자
function convertWeight4(weight, ounces = 0, roundTo = 2) {
  const total = weight + (ounces / 16);
  const conversion = total / 2.2;
  return roundToDecimalPlace(conversion, roundTo);
}
//어느정도는 해결이 된거 같지만, 온스를 추가하지 않아도 소수점 자릿수를 지정하기위해 0을 대입해 줘야한다.
//값을 전달하고 싶지 않을때는 undefined를 전달하면되지만 이는 오류발생 확률이 있기에 조심해야한다. null을 사용하면 기본값이 사용되지 않는다.
//기본값이 뭐든 상관없으면 매개변수 기본값을 사용하면 된다.

//위의 문제를 우회하는 방법중 일반적인 방법은 객체를 두번째 매개변수로 전달하는 것이다.
//객체는 여러개의 키-값 쌍을 둘 수 있기에 새옵션을 추가할 때 마다 매개변수 변경이 필요 없다.
//하지만 새옵션을 추가한 객체에서 정보를 가져와야 한다.