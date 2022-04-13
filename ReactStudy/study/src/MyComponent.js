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
import PropTypes from 'prop-types'; //  propTypes를 설정하기 위한 import

// //함수의 파라미터가 객체일 때
const MyComponent = ({ name, favoriteNumber, children }) => {
  return <div>
    안녕하세요, 제 이름은 {name}입니다. 컴포넌트 사용시 props 값 지정<br />
    children값은 {children}입니다.<br />
    제가 좋아하는 숫자는 {favoriteNumber}입니다.
  </div>
}

MyComponent.defaultProps = {
  name: "기본이름",
};

//propTypes설정
MyComponent.propTypes = {
  name: PropTypes.string,  //  name값은 무조건 string 타입으로 전달해야 한다
  favoriteNumber: PropTypes.number.isRequired,
};
//propTypes설정 가능한 타입은 1️⃣arry배열, 2️⃣arryOf(다른 propType)특정 propType으로 이뤄진 배열, bool, func, number, object,
//string, symbol, node(렌더링할 수 있는 모든 것(숫자, 문자열, 혹은 JSX코드, children도 node ProType이다.)), instanceOf(class)특정 클래스의 인스턴스
//oneOf(['arry1', 'arry2'])주어진 배열 요소 중 값 하나, oneOfType([React.PropTypes.string, PropTypes.number])주어진 배열안의 종류 중 하나
//objectOf(React.PropTypes.number)객체의 모든 키 값이 인자로 주어진 PropType인 객체, shape({name: PropTypes.string, num: PropTypes.number})주어진 스키마를 가진 객체
//any아무 종류

//클래스형 컴포넌트에서의 props사용
// import { Component } from 'react';
// import PropTypes from 'prop-type';
// class MyComponent extends Component{
//   render() {
//     const { name, favoriteNumber, children } = this.props;  //  비구조화 할당
//     return (
//       <div>
//         안녕하세요, 제 이름은 {name}입니다. 컴포넌트 사용시 props 값 지정<br />
//         children값은 {children}입니다.<br />
//         제가 좋아하는 숫자는 {favoriteNumber}입니다.
//       </div>
//     );
//   }
// }
// MyComponent.defaultProps = {
//   name: "기본이름",
// };
// MyComponent.propTypes = {
//   name: PropTypes.string,  //  name값은 무조건 string 타입으로 전달해야 한다
//   favoriteNumber: PropTypes.number.isRequired,
// };

//클래스형 컴포넌트에서 defaultProps와 propTypes를 class내부에 설정
// import { Component } from 'react';
// import PropTypes from 'prop-type';
// class MyComponent extends Component{
//    static defaultProps = {
//      name: "기본이름",
//    };
//    static propTypes = {
//      name: PropTypes.string,  //  name값은 무조건 string 타입으로 전달해야 한다
//      favoriteNumber: PropTypes.number.isRequired,
//    };
//    render() {
//      const { name, favoriteNumber, children } = this.props;  //  비구조화 할당
//      return (
//        <div>
//          안녕하세요, 제 이름은 {name}입니다. 컴포넌트 사용시 props 값 지정<br />
//          children값은 {children}입니다.<br />
//          제가 좋아하는 숫자는 {favoriteNumber}입니다.
//        </div>
//      );
//    }
//  }


// export default MyComponent;
