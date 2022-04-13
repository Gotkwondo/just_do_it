//함수 컴포넌트에서 useState 사용하기

// //배열 비구조화 할당(배열 안에 들어 있는 값을 쉽게 추출할 수 있도록 해주는 문법)
// const arry = [1, 2];
// const one = arry[0];
// const two = arry[1];
// //배열 비구조화 할당을 사용하면 다음과 같다
// const array = [1, 2];
// const [onee, twoo] = array;

import { useState } from 'react';
const Say = () => {
  const [message, setMessage] = useState('');
  //배열의 첫번째 원소는 현재상태이고, 두번째 원소는 상태를 바꾸는 세터(setter)함수이다. 이름은 배열 비구조화 할당으로 자유롭게 설정가능하다.
  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히가세요!');

  //useState는 여러번 사용해도 문제 없다.
  const [color, setColor] = useState('black');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{color}}>{message}</h1>
      <button style={ { color: 'green', } } onClick={ () => setColor('green') }>
        초록색
      </button>
      <button style={ { color: 'red', } } onClick={ () => setColor('red') }>
        빨간색
      </button>
      <button style={ { color: 'blue', } } onClick={ () => setColor('blue') }>
        파란색
      </button>
    </div>
  );
};

export default Say;