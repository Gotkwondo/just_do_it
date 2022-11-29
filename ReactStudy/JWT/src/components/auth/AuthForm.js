//  스타일은 styles/component/auth 에 있는 scss 파일을 이용
import { Link } from 'react-router-dom';
import '../../styles/component/auth/authForm.scss';
import StyledButton from '../common/StyledButton';

const textMap = {
  login: '로그인',
  register: '회원가입',
};

// 회원가입 또는 로그인 폼을 보여준다.

const AuthForm = ({ type }) => {
  const text = textMap[type];
  return (
    <div className='authFormBlock'>
      <h3>{type}</h3>
      <form>
        <input className="styledInput" autoComplete='username' name='username' placeholder='아이디' />
        <input className="styledInput" autoComplete='new-password' name='password' placeholder='비밀번호' type='password' />
        {type === 'register' && (
          <input className="styledInput" autoComplete='new-password' name='passwordConfirm' placeholder='비밀번호 확인' type='password' />
        )}
        <StyledButton props={text} />
      </form>
      <div className='footer'>
        {type === 'login' ? 
          <Link to='/login'>로그인</Link> :
          <Link to='/register'>회원가입</Link>
        }
      </div>
    </div>
  )
}

export default AuthForm