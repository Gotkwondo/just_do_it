import { createAction, handleActions } from 'redux-actions';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

const initialState = 0; //  상태는 객체일 필요가 없고 숫자로도 동작 가능하다.

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState
);

export default counter;