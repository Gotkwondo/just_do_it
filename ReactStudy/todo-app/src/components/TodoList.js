import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className="TodoList"
      width={512}   //  전체 크기
      height={513}  //  전체 높이
      rowCount={todos.length} //  항목 개수
      rowHeight={57}  //  항목 높이
      rowRenderer={rowRenderer} //  항목을 렌더링할 때 쓰는 함수
      list={todos}  //  배열
      style={{ outline: 'none' }} //  List에 기본 적용되는 outline 스타일 제거
    />
  );
};

//React.memo를 통한 최적화
export default React.memo(TodoList);

//리스트에 관련괸 컴포넌트를 최적화시 리스트 내부에서 사용하는 컴포넌트도 최적화 해준다.
//리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋다.
//부모 컴포넌트인 App.js에서 todos배열이 업데이트될 때 리렌더링 되기에 지금 당장은 최적화 효과는 없다.
//하지만, App컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 불필요한 리렌더링이 있을 수 있기에 미리한것이다.