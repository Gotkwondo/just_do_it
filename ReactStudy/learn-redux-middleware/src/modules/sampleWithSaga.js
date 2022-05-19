import { call, put, takeLatest } from '@redux-saga/core/effects';
import { createAction } from '@reduxjs/toolkit';
import { handleActions } from 'redux-actions';
import * as api from '../lib/api';
import { finishLoading, startLoading } from './loading';

//  액션 타입을 선언
//  한 요청당 세개를 만들어야 된다

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USER';
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS';  //  리듀서에서 더이상로딩 중에 대한 상태를 관리할 필요가 없다.
const GET_USERS_FAILURE = 'sample/GET_USER_FAILURE';

//  액션 함수 작성
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS, id => id);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST));  //  로딩시작
  //  파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있다.
  try {
    //  call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다.
    //  첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
    const post = yield call(api.getPost, action.payload); //  api.getPost(action.pay-load)를 의미
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data
    });
  } catch (e) {
    //  try/catch문을 사용하여 에러도 잡을 수 있다.
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true
    });
  }
  yield put(finishLoading(GET_POST)); //  로딩 완료
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));
  try {
    const users = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

//  초기 상태를 선언한다
//  요청의 로딩 중 상태는 loading이라는 객체에서 관리한다.

const initialState = {
  // loading: {
  //   GET_POST: false,
  //   GET_USERS: false
  // },
  post: null,
  users: null
};

//  리듀서 함수 작성
const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;