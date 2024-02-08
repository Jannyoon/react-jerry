import { useState, useContext, useRef } from 'react';
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
  const [gameResult, setGameResult] = useState("success");
  const timer = useRef();

  const handleChangeState = (gameResult)=>{
    setGameState(gameResult); //success or fail
  }
  const handleClick = ()=>{
    setGameState('gaming');
    console.log('gaming');
  };


  const handleUpdateScore = ()=>{
    setGameScore(prev => prev+1);
  }

  const handleGameResult = (text)=>{
    setGameResult(text);
  }

  const handleInitScore = ()=>{
    setGameScore(0);
  }
  
  return (
   <div className='container'>
      <GameStateContext.Provider value={gamestate}>
        <GameDurationContext.Provider value={gameDuration}>
          <GameScoreContext.Provider value={gameScore}>
            <Gamefield 
              timer = {timer}
              result = {gameResult}
              onStateChange={handleChangeState}
              onUpdateScore={handleUpdateScore}
              onFinish = {handleGameResult}
              onInitScore = {handleInitScore}
            />
            <PopUp 
              result = {gameResult}
              onClick={handleClick}
            />
          </GameScoreContext.Provider>   
        </GameDurationContext.Provider>
      </GameStateContext.Provider>
   </div>

  );
}

export default App;
