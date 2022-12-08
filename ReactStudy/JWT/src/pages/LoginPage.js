import AuthTemplate from '../components/auth/AuthTemplate.js';
import Header from '../components/common/Header.js';
import LoginForm from '../containers/auth/LoginForm.js';

const LoginPage = () => {
  return (
    <div>
      <Header />
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </div>
  );
}
export default LoginPage;