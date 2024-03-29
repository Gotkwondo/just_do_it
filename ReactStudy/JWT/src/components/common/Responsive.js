import '../../styles/component/common/responsive.scss'

const Responsive = ({ children, addition_className, ...rest }) => {
  //  style, className, onClick, onMouseMove 등의 props를 사용할 수 있게
  //  ...rest를 사용해 ResponsiveBlock에 전달한다.
  return (
    <div className={`${addition_className}`}>
      <div className={`responsiveBlock`} {...rest}>{children}</div>
    </div>
  );
};

export default Responsive;