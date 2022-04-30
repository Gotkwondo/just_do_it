//history를 사용할 때
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();

//v6이후 useHistory가 useNavigate로 변경 되었다.
import { useNavigate } from 'react-router';

//v6이후 Propmt가 사라졌기에 Propmt를 구현한 로직
import usePrompt from './Blocker';

const HistorySample = () => {
  const navigate = useNavigate();

  //  뒤로가기. 인덱스로 처리, 두번 뒤로 가려면 -2
  const goBack = () => {
    navigate(-1);
  };

  //  홈으로 가기
  const goHome = () => {
    navigate('/');
  }

  //v6이후 Prompt가 사자져서 사용하는 컴포넌트 (로직 구현)
  usePrompt('현재 페이지를 벗어나겠습니까?', true);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  )
}

export default HistorySample;