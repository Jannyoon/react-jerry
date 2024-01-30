import logo from './logo.svg';
import './App.css';
import Gamefield from './component/Gamefield/Gamefield';
import PopUp from './component/Popup/PopUp';

function App() {
  return (
   <div className='container'>
    <Gamefield/>
    <PopUp/>
   </div>
  );
}

export default App;
