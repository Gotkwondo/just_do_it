import { createAction, handleActions } from 'redux-actions';

//  액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수 만들기
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

//redux-action을 이용한 액션 생성 함수 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//초기 상태 및 리듀서 함수 만들기
const initialState = {
  number: 0
};

// const counter = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1
//       };
//     default:
//       return state;
//   }
// }

//handleActions를 이용한 방법
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;