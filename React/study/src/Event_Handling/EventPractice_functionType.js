//함수형 컴포넌트
import { useState } from 'react';

const EventPractice = () => {
  // const [message, setMessage] = useState('');
  // const [username, setUsername] = useState('');
  
  // const onChangeMessage = e => setMessage(e.target.value);
  // const onChangeUsername = e => setUsername(e.target.value);
  
  // const onClick = () => {
  //   alert(`${username} : ${message}`);
  //   setMessage(``);
  //   setUsername(``);
  // };
  
  // const onKeyPress = e => {
  //   if (e.key === `Enter`) {
  //     onClick();
  //   }
  // };
  // return (
  //   <div>
  //     <h1>이벤트 연습</h1>
  //     <input
  //       type="text"
  //       name="username"
  //       placeholder="사용자명"
  //       value={username}
  //       onChange={onChangeUsername}
  //     />
  //     <input
  //       type="text"
  //       name="message"
  //       placeholder="메세지 입력"
  //       value={message}
  //       onChange={onChangeMessage}
  //       onKeyPress={onKeyPress}
  //     />
  //     <button onClick={onClick}>확인</button>
  //   </div>
  // )

  //e.target.name을 사용하려면 useState를 사용하는 상태에서 문자열이 아닌 객체를 사용하면 된다.
  //인풋의 갯수가 많아질 수록 e.target.name을 사용하는 것이 좋다.
  const [form, setForm] = useState({
    username: ``,
    message: ``,
  });
  const { username, message } = form;
  const onChange = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(nextForm);
  };
  const onClick = () => {
    alert(`${username} : ${message}`);
    setForm({
      username: ``,
      message: ``,
    });
  };
  const onKeyPress = e => {
    if (e.key === `Enter`) {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        placeholder="메세지 입력"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  )
}

export default EventPractice;