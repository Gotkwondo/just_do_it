import '../../styles/component/common/button.scss';

const StyledButton = ({props}) => {
  return (
    <button className={['styledButton', 'cyan', 'fullwidth'].join(' ')}>{props}</button>
  )
};

export default StyledButton;