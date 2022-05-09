import ColorBox from './component/ColorBox';
import ColorContext from './context/color';

const App = () => {
  return (
    <ColorContext.Provider value={{ color: 'red' }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
    
  )
}

export default App;
