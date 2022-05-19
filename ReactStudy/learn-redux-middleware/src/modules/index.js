//  루트 리듀서
import { combineReducers } from 'redux';
import counter from './counter';
import { counterSaga } from './counterWithSaga';
import sample from './sample';
import loading from './loading';
import { all } from '@redux-saga/core/effects';

const rootReducer = combineReducers({
  counter,
  sample,
  loading
});

//  비동기 카운터 만들기
export function* rootSaga() {
  //  all함수는 여러 사가를 합쳐주는 역활을 한다.
  yield all([counterSaga()]);
}

export default rootReducer;