import { useState, useContext } from 'react';
import './App.css';
import Gamefield from './component/Gamefield/Gamefield';
import PopUp from './component/Popup/PopUp';
import { GameStateContext } from './component/context/gameStateContext';
function App() {
  //state : 'ready', 'pause', 'gaming', 'success', 'fail'
  const [state, setState] = useState('ready'); 

  const handleChangeState = (gameResult)=>{
    setState(gameResult); //success or fail
  }
  const handleClick = ()=>{
    setState('gaming');
    console.log('gaming');
  };

  return (
   <div className='container'>
      <GameStateContext.Provider value={state}>
        <Gamefield onStateChange={handleChangeState}/>
        <PopUp 
          onClick={handleClick}
        />   
      </GameStateContext.Provider>
   </div>

  );
}

export default App;
