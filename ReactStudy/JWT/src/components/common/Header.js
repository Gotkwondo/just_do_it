import Responsive from './Responsive';
import StyledButton from './StyledButton';
import '../../styles/component/common/header.scss'
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <>
      <div className='headerBlock'>
        <Responsive addition_className={'wrapper'} >
          <Link to='/' className='logo'>
            REACTERS
          </Link>
          {user ?
            <div className='right'>
              <div className='userInfo'>{user.username}</div>
              <StyledButton text='로그아웃' onClick={onLogout}/>
            </div>
            :
            <div className='right'>
              <StyledButton to='/login' text='로그인' />
            </div>
          }
        </Responsive>
      </div>
      <div className='spacer' />
    </>
  )
};

export default Header;