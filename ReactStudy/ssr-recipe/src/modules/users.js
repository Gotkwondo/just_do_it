import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

//  액션 타입
const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

//  특정 유저 정보를 가져오는 액션 타입
const GET_USER = 'users/GET_USER';
const GET_USER_SUCCESS = 'users/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'users/GET_USER_FAILURE';

//  액션 생성 함수
const getUsersPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = payload => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = payload => ({
  type: GET_USERS_FAILURE,
  error: true,
  payload
});

//  특정 유저 정보를 가져오는 액션 생성 함수
export const GET_USER = id => ({ type: GET_USER, payload: id });
const GET_USER_SUCCESS = data => ({ type: GET_USER_SUCCESS, payload: data });
const GET_USER_FAILURE = error => ({
  type: GET_USER_FAILURE,
  payload: error,
  error: true
});

//  thunk 함수
//  액션 생성 함수를 이용해 상태를 관리한다.
export const getUsers = () => async dispatch => {
  try {
    dispatch(getUsersPending());  //  요청 시작과 보류중
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(getUsersSuccess(response));  //  성공
  } catch (e) {
    dispatch(getUsersFailure(e)); //  에러 발생
    throw e;  //  에러
  }
};

//  특정 유저의 정보를 가져오도록 API 설정
const getUserById = id => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

//  특정 유저 정보를 가져오는 saga함수
function* getUserSaga(action) {
  try {
    const response = yield call(getUserById, action.payload);
    yield put(getUsersSuccess(response.data));
  } catch (e) {
    yield put(getUsersFailure(e));
  }
}

export function* usersSaga() {
  yield takeEvery(GET_USER, getUserSaga);
}

//  초기 상태
//  loading과 error를 객체 형태로 만든 이유는 redux-saga를 이용한 SSR방법을 연습할 때 하나의 정보를 가져오는 다른 API를 호출할 것이기 때문
//  사용하는 API가 한가지 이상이므로 각 값에 대하여 이름을 지어주기보다는 객체에 넣어준것이다.
const initialState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false
  },
  error: {
    users: null,
    user: null
  }
};

//  리듀서 함수
function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_PENDING:
      return { ...state, loading: { ...state.loading, users: true } };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        users: action.payload.data
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, users: false },
        error: { ...state.error, users: action.payload }
      };
    case GET_USER:
      return {
        ...state,
        loading: { ...state.loading, user: true },
        error: { ...state.error, user: null },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        user: action.payload
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, user: false },
        error: { ...state.error, user: action.payload },
      };
    default:
      return state;
  }
}

export default users;

//  JSONPlaceholder에서 제공되는 API를 호출하여 얻는 데이터
// [
//   {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPharase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markers"
//     }
//   },
//   (...)
// ]