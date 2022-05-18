import { handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

//  액션 타입을 선언
//  한 요청당 세개를 만들어야 된다

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USER';
const GET_USERS_SUCCESS = 'sample/GET_USER_SUCCESS';  //  리듀서에서 더이상로딩 중에 대한 상태를 관리할 필요가 없다.

//  thunk함수를 생성한다.(액션 함수 작성)
//  thunk함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치한다.
export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST }); //  요청을 시작한 것을 알림
//   try {
//     const response = await api.getPost(id);
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data
//     }); //  요청 성공
//   }
//   catch (e) {
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true
//     }); //  에러 발생
//     throw e;  //  나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
//   }
// };

export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
// export const getUsers = () => async dispatch => {
//   dispatch({ type: GET_USERS }); //  요청을 시작한 것을 알림
//   try {
//     const response = await api.getUsers();
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data
//     }); //  요청 성공
//   }
//   catch (e) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true
//     }); //  에러 발생
//     throw e;
//   }
// };

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