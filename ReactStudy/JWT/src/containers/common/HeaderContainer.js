import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header.js'
import { logout } from '../../modules/user.js';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  }
  return (
    <Header user={user} onLogout={onLogout}/>
  );
};

export default HeaderContainer;