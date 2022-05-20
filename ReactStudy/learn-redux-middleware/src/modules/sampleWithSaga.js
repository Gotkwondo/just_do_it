import { takeLatest } from '@redux-saga/core/effects';
import { createAction } from '@reduxjs/toolkit';
import { handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

//  액션 타입을 선언
//  한 요청당 세개를 만들어야 된다

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USER';
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS';  //  리듀서에서 더이상로딩 중에 대한 상태를 관리할 필요가 없다.

//  액션 함수 작성
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS, id => id);

//  createRequestSaga를 통해 짧은 코드 구성
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

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