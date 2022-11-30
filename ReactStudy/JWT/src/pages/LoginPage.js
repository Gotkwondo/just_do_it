import AuthTemplate from '../components/auth/AuthTemplate.js';
// import AuthForm from '../components/auth/AuthForm.js';
import LoginForm from '../containers/auth/LoginForm.js';

const LoginPage = () => {
  return (
    <div>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </div>
  );
}
export default LoginPage;