import ColorBox from './component/ColorBox';
import { ColorProvider } from './context/color';
import SelectColors from './component/SelectColors';

const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
    
  )
}

export default App;
