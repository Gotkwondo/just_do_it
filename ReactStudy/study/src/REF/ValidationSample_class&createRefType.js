import React, { Component } from 'react';
import './ValidationSample.css';

class ScrollBox extends Component{
  state = {
    password: '',
    clicked: false,
    validated: false,
  };

  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus();
  };

  handleChange(e) {
    this.setState({
      password: e.target.value
    })
  };

  handleButtonClick() {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    })
  };

  render() {
    return (
      <div>
        <input
          ref={this.input}
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
        />
        <button onClick={this.handleButtonClick}>확인</button>
      </div>
    )
  }
}

export default ScrollBox