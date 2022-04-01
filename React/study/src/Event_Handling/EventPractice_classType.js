// class형 컴포넌트
import { Component } from 'react';

class EventPractice extends Component {
  state = {
    username: '',
    message: '',
  }
  //기본 방식
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleChange(e) {
  //   this.setState({
  //     message: e.target.value
  //   });
  // }

  // handleClick() {
  //   alert(this.state.message);
  //   this.setState({
  //     message: '',
  //   });
  // }

  //Property Initializer Syntax을 사용한 메서드 작성 방식(가독성이 좋아진다)
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,  //객체 안에서 key를 []로 감싸면 레퍼런스가 가리키는 실제 값이 key 값으로 사용됨
    });
  }
  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      message: '',
      username:'',
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username"
          placeholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
          onKeyPress={ this.handleKeyPress }
        />
        
        <input
          type="text"
          name="message"
          placeholder="입력해보시오"
          value={this.state.message}
          onChange={
            this.handleChange
            // (e) => {
            //   this.setState({
            //     message: e.target.value
            //   })
            // }
          }
          onKeyPress={ this.handleKeyPress }/>
        <button onClick={
          this.handleClick
          // () => {
          //   alert(this.state.message);
          //   this.setState({
          //     message: '',
          //   });
          // }
        }>확인</button>
      </div>
    )
  }
}

export default EventPractice;