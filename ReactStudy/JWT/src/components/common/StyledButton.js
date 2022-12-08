import { Link, useNavigate } from 'react-router-dom';
import '../../styles/component/common/button.scss';

const StyledButton = ({ text, to, ...rest }) => {
  const navigate = useNavigate()
  console.log(to)

  const onClick = (e) => {
    console.log(to)
    if (to) {
      navigate(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  }

  return (
    <button className={['styledButtonLink', 'cyan', 'fullwidth'].join(' ')} onClick={onClick} {...rest} >{text}</button>
  )
};

export default StyledButton;