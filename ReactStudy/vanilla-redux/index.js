import { createStore } from 'redux';

//UI를 관리할 때 별도의 라이브러리를 사용하지 않기에 DOM을 직접 수정해야한다.
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btIncrease = document.querySelector('#increase');
const btDecrease = document.querySelector('#decrease');

//프로젝트의 상태에 변화를 일으키는 것을 액션이라고 한다. 액션의 이름은 고유해야 하며 대문자로 이루어짐
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//다음으로 액션 객체를 만드는 액션 생성 함수를 작성한다.
//액션객체는 type값을 가져야 하며, 필요한 값은 추가 가능하다.
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = () => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

//초깃값을 설정할 때는 초깃값의 형태를 자유롭게 설정해 줄 수 있다.
const initialState = {
  toggle: false,
  counter: 0
};

//리듀서는 변화를 일으키는 함수이며, 파라미터로는 state와 action값을 받아온다.
//state가 undefined일 때는 initialState를 기본값으로 사용
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, //불변성 유지
        toggle: !state.toggle
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

//스토어 만들기
const store = createStore(reducer);

//render 함수작성. 상태가 업데이트될 때마다 호출되며, 리액트의 render함수와는 다르게 
//html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경
const render = () => {
  const state = store.getState(); //현재 상태를 불러온다.
  //토글처리
  if (state.toggle) {
    divToggle.classList.add('active');
  } else {
    divToggle.classList.remove('active');
  }
  //카운터 처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render);

//액션 발생시키기
divToggle.onClick = () => {
  store.dispatch(toggleSwitch());
};
btIncrease.onClick = () => {
  store.dispatch(increase(1));
};
btDecrease.onClick = () => {
  store.dispatch(decrease());
};