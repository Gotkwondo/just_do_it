import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';


const RegisterForm = () => {
  const dispatch = useDispatch();

  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));
  console.log(form)
  
  //  여기 문제는 아닌듯 하다 작가가 작성한 코드를 그대로 사용해도 문제는 계속됬다
  //  그렇다면 다른 파일에서 문제가 있는 것 같다.
  //  12-01 참.... 욕나오는 하루다....
  //  인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    console.log(e.target.value, e.target.name)
    console.log(form)
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value: value
      })
    );
  };

  //  폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      //  TODO: 오류처리
      return;
    }
    console.log(dispatch)
    return () => dispatch(register({username, password}))
  };

  //  컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    return () => dispatch(initializeForm('register'))
  }, [dispatch]);

  //  회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError, dispatch])

  return (
    <AuthForm
      type='register'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;