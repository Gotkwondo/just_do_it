import { Link, useNavigate } from 'react-router-dom';
import '../../styles/component/common/button.scss';

const StyledButton = ({ text, to, ...rest }) => {
  const navigate = useNavigate()

  const onClick = (e) => {
    if (to) {
      navigate(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  }

  return to ? (
    <Link className='styledButtonLink' />
  ) : ( <button className={['styledButtonLink', 'cyan', 'fullwidth'].join(' ')} {...rest} onClick={onClick}>{text}</button>
  )
};

export default StyledButton;