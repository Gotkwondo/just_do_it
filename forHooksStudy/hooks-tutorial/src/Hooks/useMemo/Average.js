import { useState, useMemo } from 'react';

//평균을 구하는 함수
const getAverage = numbers => {
  console.log('평균값 계산중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumbers] = useState(``);

  const onChange = e => {
    setNumbers(e.target.value);
  };

  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumbers(``);
  };

  const avg = useMemo(() => getAverage(list), [list]);
  //useMemo는 생성 함수와 함수의 의존성 값의 배열을 전달한다.
  //배열이 없는 경우 랜더링 마다 새 값을 계산한다.
  //의존성이 변경되었을 때만 메모이제이션된 값만 다시 계산한다.

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
          //각 자식 요소들은 고유한 키 값을 가져야 하므로 index값을 key로 주었다.
        ))}
      </ul>
      <div>
        <b>평균값 : </b>{avg}
      </div>
    </div>
  );
};

export default Average;