import { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component{
  state = {
    password: '',
    clicked: false,
    validated: false,
  }
  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000',
    });
    this.input.focus();
  }

  render() {
    return (
      <div>
        <input
          ref={(ref) => this.input=ref}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
      </div>
    );
  }
}

export default ValidationSample;


//콜백함수를 통한 ref 설정
//ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달
//콜백함수는 ref값을 파라미터로 받고 컴포넌트의 멤버 변수로 설정함
//ref의 이름은 자유롭게 지정가능
//<input ref={(ref) => {this.input=ref}} />

//createRef를 통한 ref 설정
//creatRef를 사용해 ref를 만들기 위해 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아주고
//해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어주면 설정 완료
//설정한 뒤 ref를 설정한 DOM에 접근하려면 this.input.current를 조회하면 된다.
//class RefSample extends Component {
//  input = React.createRef();
// handleFocus = () => {
//   this.input.current.focus();
// }
// render(){
//   return (
//     <div>
//       <input ref={this.input} />
//     </div>
//   );
//  }
//}

