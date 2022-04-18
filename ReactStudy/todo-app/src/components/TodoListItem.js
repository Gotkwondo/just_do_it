import React from 'react';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle, style}) => {
  const {id, text, checked} = todo;

  return (
    <div className='TodoListItem-virtualized' style={style}>
      <div className="TodoListItem">
      <div className={cn('checkbox', { checked })} onClick={() => { onToggle(id) }}>
        {checked ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={()=>onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
    </div>
  );
};

//React.memo 함수를 사용해서 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링 하지 않게 했다.
export default React.memo(TodoListItem);
//하지만 todos배열이 업데이트 되면 onRemove와 onToggle 함수도 새롭게 바뀌면 최신 상태의 todos를
//참조하기에 새로운 배열이 만들어진다.
//useState 혹은 usrReducer를 이용해 새로운 배여 생성을 막을 수 있다.(App.js 참고)