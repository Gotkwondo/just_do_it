import React from 'react';
import { Component } from 'react';

class ScrollBox extends Component{
  //스크롤을 맨 아래로 내리는 함수 (scrollTop, scrollHeight, clientHeight를 이용한다.)
  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    this.box.scrollTop = scrollHeight - clientHeight;
  };

  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative',
    }

    const innerStyle = {
      width: '100%',
      height: '650px',
      backgroun: 'linear-gradient(wite, black)',
    }

    return (
      <div
        style={style}
        ref={(ref) => { this.box = ref }}>
          <div style={innerStyle} />
      </div>
    )
  }
}

export default ScrollBox;