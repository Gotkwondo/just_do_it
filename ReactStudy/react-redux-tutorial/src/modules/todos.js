import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';  //  인풋 값을 변경
const INSERT = 'todos/INSERT';  //  새로운 todo값을 등록
const TOGGLE = 'todos/TOGGLE';  //  todo를 체크/체크 해제
const REMOVE = 'todos/REMOVE';  //  todo를 제거

//  액션 생성 함수 만들기
// export const changeInput = input => ({
//   type: CHANGE_INPUT,
//   input
// });

// let id = 3; //  insert가 호출될 때마다 1씩 더해짐
// export const insert = text => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false
//   }
// });

// export const toggle = id => ({
//   type: TOGGLE,
//   id
// });

// export const remove = id => ({
//   type: REMOVE,
//   id
// });

//createActions를 이용한 액션 생성 함수 만들기
export const changeInput = createAction(CHANGE_INPUT, input => input);

let i = 3;
export const insert = createAction(INSERT, text => ({
  id: i++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

//  초기 상태 및 리듀서 함수 만들기 (불변성 유지)
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: false
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false
    }
  ]
};

//handleActions로 작성한 리듀서
const todos = handleActions(
  { //기존 방식에 immer 적용
    [CHANGE_INPUT]: (state, action) => 
      produce(state, draft => {
        draft.input = action.payload;
      })
    ,
    //객체 비구조화 할당 문법으로 코드에 immer적용
    [INSERT]: (state, { payload: todo }) => 
      produce(state, draft => {
        draft.todos.push(todo);
      })
    ,
    [TOGGLE]: (state, { payload: id }) => 
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.it === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) => 
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
)

// const todos = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo)
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         )
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }

export default todos;