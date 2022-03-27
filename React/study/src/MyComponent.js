// const MyComponent = props => {
//   //비구조화 할당 문법 사용 X
//   // return <div>안녕하세요, 제 이름은 {props.name}입니다. 컴포넌트 사용시 props 값 지정<br />
//   // children값은 {props.children}입니다.
//   // </div>

//   //비구조화 할당 문법 사용O
//   const { name, children } = props;
//   return <div>
//     안녕하세요, 제 이름은 {name}입니다. 컴포넌트 사용시 props 값 지정<br />
//     children값은 {children}입니다.
//   </div>
// };

//함수의 파라미터가 객체일 때
const MyComponent = ({ name, children }) => {
  return <div>
    안녕하세요, 제 이름은 {name}입니다. 컴포넌트 사용시 props 값 지정<br />
    children값은 {children}입니다.
  </div>
}

MyComponent.defaultProps = {
  name: "기본이름",
};

export default MyComponent;