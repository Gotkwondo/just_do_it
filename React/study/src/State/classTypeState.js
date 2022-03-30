import { Component } from 'react';

class Counter extends Component {
  // constructor메서드를 사용하여 state의 초깃값 설정
  // constructor(props) {
  //   super(props);
  //   //state의 초깃값 설정
  //   this.state = {
  //     number: 0,
  //     fixedNumber:0,
  //   };
  //  }
  //state를 이용한 state의 초깃값 설정(앞으로 이렇게 사용할 예정)
  state = {
    number: 0,
    fixedNumber: 0,
  };
  render() {
    const { number, fixedNumber } = this.state;  //  state를 조회할 때는 this.state로 조회한다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : { fixedNumber }</h2>
        <button onClick={() => {
          this.setState(
            {
              number: number + 1
            },
            //업데이트 이후 특정 잡업을 하고싶다면 setState의 두번째 파라미터로 콜백함수를 등록해 작업 처리가능
            () => {
              console.log('방금 setState가 호출되었습니다');
              console.log(this.state);
            }
          );
        }}> +1 </button>
        
        
        {/*setState가 비동기적으로 업데이트되어 state값이 바뀌지 않는 문제 해결은 아래와 같다
          <button onClick={() => {
          this.setState(prevState => {
            //업데이트 과정에 props가 필요하면 함수의 인자로 props를 사용
            return {
              number: prevState.number + 1,
            };
          });
          //위 코드와 아래 코드는 같은 기능을 함
          //아래코드는 함수에서 객체를 반환한다는 의미
          this.setState(prevState => ({
            number: prevState.number + 1
          }));
        }}>
          +1
        </button> */}
      
      </div>
    )
  }
}

export default Counter;