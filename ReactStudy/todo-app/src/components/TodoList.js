import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

//React.memo를 통한 최적화
export default React.memo(TodoList);

//리스트에 관련괸 컴포넌트를 최적화시 리스트 내부에서 사용하는 컴포넌트도 최적화 해준다.
//리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋다.
//부모 컴포넌트인 App.js에서 todos배열이 업데이트될 때 리렌더링 되기에 지금 당장은 최적화 효과는 없다.
//하지만, App컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 불필요한 리렌더링이 있을 수 있기에 미리한것이다.