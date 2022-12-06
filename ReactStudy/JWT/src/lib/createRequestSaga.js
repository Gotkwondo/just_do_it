import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';

//  코드 중복을 방지하기 위해 외부에서 함수 선언
export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));  //  로딩 시작
    try {
      // console.log(request);
      // console.log(action.payload)
      const response = yield call(request, action.payload); //  json형식으로 쏴주면 에러 해결
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    }
    catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //  로딩 끝
  };
}