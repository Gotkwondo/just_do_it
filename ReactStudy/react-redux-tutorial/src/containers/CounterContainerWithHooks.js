import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../component/Counter'
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  //  useSelector로 상태 조회
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();

  //useCallback을 이용한 컴포넌트 최적화
  const onIncrease = useCallback(() => dispatch(increase), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease), [dispatch]);
  return (
    <Counter
      number={number}
      // onIncrease={() => dispatch(increase)}
      // onDecrease={() => dispatch(decrease)}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  );
};

export default CounterContainer;