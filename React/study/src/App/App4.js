import React, { Component } from 'react';
import ScrollBox from '../REF/ScrollBox_class&callbackType';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={ref => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }

}
export default App;

//왜 안되는지 모르겠
// import React from 'react';
// import ScrollBox from '../REF/ScrollBox_class&callbackType';

// const App = () => {
//   return (
//     <div>
//       <ScrollBox ref={(ref) => this.scrollBox = ref} />
//       <button onClick={() => this.scrollBox.scrollToBottom()}>
//         맨 밑으로
//       </button>
//     </div>
//   )
// };

// export default App;