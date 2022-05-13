import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'; //connect대신 useSelector와 useDispatch를 사용
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../component/Todos';

const TodosContainer = () => {
  //비구조화 할당 문법을 사용
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));
  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)),
    [dispatch]
  );
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default TodosContainer;