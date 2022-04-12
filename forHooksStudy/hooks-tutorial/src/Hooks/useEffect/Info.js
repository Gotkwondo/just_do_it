import { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  //기본 렌더링될 때 실행
  // useEffect(() => {
  //   console.log(`랜더링이 완료되었습니다.`);
  //   console.log({
  //     name,
  //     nickname
  //   });
  // })

  //마운트될 때만 실행
  // useEffect(() => {
  //   console.log(`마운트될 때만 실행됩니다`);
  // }, [])

  //특정 값이 업데이트될 때만 실행
  // useEffect(() => {
  //   console.log(`${name}이 업데이트될 때만 실행`)
  // }, [name]); //useState로 관리되는 상태, props로 전달받은 값일 사용해도 됨

  //뒷정리하기
  useEffect(() => {
    console.log(`effect`);
    console.log(name);
    return () => {
      console.log(`cleanup`);
      console.log(name);
    };
  }, [name]);

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름 : </b>{name}
        </div>
        <div>
          <b>닉네임 : </b>{nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;