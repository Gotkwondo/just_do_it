import { useState } from 'react';

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);  //  새로운 값을 설정할 때의 Id값

  const onChange = e => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  }
  const onRemove = id => {
    const nextNames = names.filter(name => name.id !== id);
    setNames(nextNames);
  }

  const namesList = names.map(name =>
    <li
      key={name.id}
      onDoubleClick={() => onRemove(name.id)}>{name.text}</li>);
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>
    </>
  )
}

export default IterationSample;

//key설정 X
// const IterationSample = () => {
//   const names = [`눈사람`, `얼음`, `눈`, `바람`];
//   const nameList = names.map(name => <li>{name}</li>);
//   return <ul>{nameList}</ul>;
// }

//key설정 O
// const IterationSample = () => {
//   const names = [`눈사람`, `얼음`, `눈`, `바람`];
//   const nameList = names.map((name, index) => <li key={index}>{name}</li>);

//   return <ul>{nameList} </ul>;
// }

//filter함수를 이용한 데이터 제거 기능 예시
// const number = [1, 2, 3, 4, 5, 6];
// const biggerThanThree = number.filter(number => number > 3);  //  결과 : [4, 5, 6]
// const withOutThree = number.filter(number => number !== 3);   //  결과 : [1, 2, 4, 5, 6]