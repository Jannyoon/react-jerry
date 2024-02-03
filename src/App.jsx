import { useState, useContext } from 'react';
import './App.css';
import Gamefield from './component/Gamefield/Gamefield';
import PopUp from './component/Popup/PopUp';
import { GameStateContext } from './component/context/gameStateContext';
import { GameDurationContext } from './component/context/gameDurationContext';
import { GameScoreContext } from './component/context/gameScoreContext';
function App() {
  //state : 'ready','gaming', end.('success', 'fail')
  const [gamestate, setGameState] = useState('ready'); 
  const [gameDuration, setGameDuration] = useState(10);
  const [gameScore, setGameScore] = useState(0)


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

  const handleUpdateScore = ()=>{
    setGameScore(prev => prev+1);
  }

  return (
   <div className='container'>
      <GameStateContext.Provider value={gamestate}>
        <GameDurationContext.Provider value={gameDuration}>
          <GameScoreContext.Provider value={gameScore}>
            <Gamefield 
              onStateChange={handleChangeState}
              onDurationChange={handleGameDuration}
              onUpdateScore={handleUpdateScore}
            />
            <PopUp 
              onClick={handleClick}
            />
          </GameScoreContext.Provider>   
        </GameDurationContext.Provider>
      </GameStateContext.Provider>
   </div>

  );
}

export default App;
