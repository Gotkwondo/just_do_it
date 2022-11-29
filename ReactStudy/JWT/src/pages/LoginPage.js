import AuthTemplate from '../components/auth/AuthTemplate.js';
import AuthForm from '../components/auth/AuthForm.js'
import StyledButton from '../components/common/StyledButton.js';

const LoginPage = () => {
  return (
    <div>
      <StyledButton props={"버튼"} />
      <AuthTemplate>
        <AuthForm/>
      </AuthTemplate>
    </div>
  );
}
export default LoginPage;