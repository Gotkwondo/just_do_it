import { Component } from 'react';

//라이프사이클 메서드를 실행할 때마다 콘솔 디버거에 기록하고, 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number값을 1씩 증가
class LifeCycleSample extends Component{
  state = {
    number: 0,
    color: null,
  }

  myRef = null; //  ref를 설정할 부분
  
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  //부모로 부터 받은 color 값을 stae에 동기화 함
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  //state.number 값의 마지막 자리 수가 4이면 리렌더링을 취소할 수 있게 만듬
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextProps);
    return nextState.number % 10 !== 4;
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    })
  }

  //DOM에 변화가 이러나기 직전의 색상 속성을 snapshot 값으로 반환하여 componentDidUpdate에서 조회할 수 있게 함
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트되기 직전 색상', snapshot);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color
    };

    return (
      <div>
        {/* {this.props.missing.value} */}
        <h1 style={style} ref={ref => this.myRef = ref}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    )
  }
}

export default LifeCycleSample;