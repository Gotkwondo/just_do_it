import { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function creatBulkTodos() {
  const array = [];
  for (let i = 0; i <= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(creatBulkTodos);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;  //  nextId 1씩 더하기
    },
    [],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos => 
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),  //  불병성을 유지하면서 특정 배열 원소를 업데이트 할때 map을 사용해 쉽게 작성이 가능하다.
            //  todo.id와 파라미터 id 값이 같을 때 규칙대로 새로운 객체를 생성하지만 다를경우 받은 상태 그대로 반환한다.
            //  그래서 map을 사용해 만든 배열에서 변화가 필요한 원소만 업데이트 한 후 나머지는 그대로 남는다.
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;