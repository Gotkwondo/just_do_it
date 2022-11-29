//  스타일은 styles/component/auth 에 있는 scss 파일을 이용
import '../../styles/component/auth/authTemplate.scss'
import { Link } from 'react-router-dom';

// 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트

const AuthTemplate = ({children}) => {
  return (
    <div className='authTemplateBlock'>
      <div className='whiteBox'>
        <div className='logo_area'>
          <Link to='/'>REATERS</Link>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthTemplate;