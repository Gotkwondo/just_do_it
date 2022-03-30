//state 사용시 주의 사항
//state값을 바꿔야 할 때는 setState 혹은 useState를 통해 전달 받은 세터함수를 사용해야 한다.
//잘못된 예시
// this.state.number = this.state.number + 1;
// this.state.arry = this.arry.push(2);
// this.state.object = 5;

// const [object, setObject] = useState({ a: 1, b: 2 });
// object.b = 3;

//배열이나 객체를 업데이트 할 때는 사본을 만든 뒤 사본의 상태를 setState 혹은 세터함수를 사용해 업데이트 한다.
//객체 다루기
const object = { a: 1, b: 2, c: 3 };
const nextObject = { ...object, b: 2 };

//배열 다루기
const arry = [
  { id: 1, value: true },
  { id: 2, value: true },
  { id: 3, value: false },
];
let nextArry = arry.concat({ id: 4 });  //  새 항목 추가
nextArry.filter(item => item.id !== 2); //id가 2인 항목 제거
nextArry.map(item => (item.id === 1 ? { ...item, value: false } : item)); //id가 1인 항목의 value를 false로 설정