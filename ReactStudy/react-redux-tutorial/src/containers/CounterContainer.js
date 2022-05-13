import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../component/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

const mapStateToProps = state => ({
  number: state.counter.number,
});

const mapDispatchToProps = dispatch => ({
  //임시함수
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

//bindActionCreators 유틸 함수를 이용한 액션함수 dispatch로 감싸기
//connect 함수 내부에 익명 함수 형태로 넣어도 된다.
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       increase,
//       decrease,
//     },
//     dispatch,
//   )


//mapDispatchToProps의 파라미터를 액션 생성함수로 이루어진 객체 형태로 넣어 사용하는 방법
// export default connect(
//   state => ({
//     number: state.counter.number
//   }),
//   {  //이렇게 해주면 connect함수가 내부적으로 bindActionCreators 작업을 해준다.
//     increase,
//     decrease
//   }
// )(CounterContainer);


//아래와 같이 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않는다.
// export default connect(
//   state => ({
//     number: state.counter.number
//   }),
//   dispatch => ({
//     increase: () => {
//       dispatch(increase());
//     },
//     decrease: () => {
//       dispatch(decrease());
//     },
//   })
// )(CounterContainer);

export default connect(mapStateToProps, mapDispatchToProps,)(CounterContainer);