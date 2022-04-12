import { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);  //  useState 함수의 파라미터에 상태의 기본값을 넣어줌
  //  함수는 배열을 반환하는데 배열의 첫 번째 원소는 상태값, 두 번째 원소는 상태를 설정하는 함수

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;