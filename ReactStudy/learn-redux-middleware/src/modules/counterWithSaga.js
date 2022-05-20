//  비동기 카운터 만들기
import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
//  마우스 클릭 이벤트가 payload 안에 들어가지 않도록
//  () => undefined를 두번째 파라미터로 넣어 준다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined)
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined)

//Thunk생성 함수 만들기
//1초 뒤에 increase 혹은 decrease 함수를 디스패치함
function* increaseSaga() {
  yield delay(1000);      //  1초 기다린다.
  yield put(increase());  //  특정 액션을 디스패치한다.
  const number = yield select(state => state.counter);  //  select을 이용하여 내부 현제 상태를 조회, state는 스토어 상태를 의미
  console.log(`현재 값은 ${number}입니다.`)
};

function* decreaseSaga() {
  yield delay(1000);      //  1초 기다린다.
  yield put(decrease());  //  특정 액션을 디스패치한다.
};

export function* counterSaga() {
  //  takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리한다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  //  takeLast는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  //  가장 마지막으로 실행된 작업만 수행한다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0; //  상태는 객체일 필요가 없고 숫자로도 동작 가능하다.

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState
);

export default counter;