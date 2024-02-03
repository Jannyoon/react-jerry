import { useState, useContext } from 'react';
import './App.css';
import Gamefield from './component/Gamefield/Gamefield';
import PopUp from './component/Popup/PopUp';
import { GameStateContext } from './component/context/gameStateContext';
import { GameDurationContext } from './component/context/gameDurationContext';
function App() {
  //state : 'ready','gaming', end.('success', 'fail')
  const [gamestate, setGameState] = useState('ready'); 
  const [gameDuration, setGameDuration] = useState(10);

  const handleChangeState = (gameResult)=>{
    setGameState(gameResult); //success or fail
  }
  const handleClick = ()=>{
    setGameState('gaming');
    console.log('gaming');
  };

  const handleGameDuration = (time)=>{
    setGameDuration(time)    
  }

  return (
   <div className='container'>
      <GameStateContext.Provider value={gamestate}>
        <GameDurationContext.Provider value={gameDuration}>
          <Gamefield 
            onStateChange={handleChangeState}
            onDurationChange={handleGameDuration}
          />
          <PopUp 
            onClick={handleClick}
          />   
        </GameDurationContext.Provider>
      </GameStateContext.Provider>
   </div>

  );
}

export default App;
