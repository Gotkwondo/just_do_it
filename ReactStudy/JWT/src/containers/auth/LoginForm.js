import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
// import { withRouter } from 'react-router-dom'; 이건 더 이상 사용하지 않는다...
//  v6 부터는 useParams, useLocation, useNavigate를 컴포넌트 내부에 변수 선언 형식을 사용해 각각 객체를 접근해야한다.
import { useNavigate } from "react-router-dom";
import { check } from '../../modules/user';

const LoginForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));
  //  인풋 변셩 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value
      })
    );
  };

  //  폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  //  컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    return () => dispatch(initializeForm('login'))
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생 authError');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type='login'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;