import AuthTemplate from '../components/auth/AuthTemplate.js';
import LoginForm from '../containers/auth/LoginForm.js';
import HeaderContainer from '../containers/common/HeaderContainer.js';

const LoginPage = () => {
  return (
    <div>
      <HeaderContainer />
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </div>
  );
}
export default LoginPage;