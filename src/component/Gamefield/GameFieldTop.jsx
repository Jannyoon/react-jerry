import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './GameField.module.css';
import { FaPause, FaPlay } from "react-icons/fa";
import { useGameStateContext } from '../context/gameStateContext';
import { UseGameDurationContext } from '../context/gameDurationContext'
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';

export default function GameFieldTop({timer, result, score, onGameStateClick, onGameDurationClick}) {
  const gameState = useGameStateContext();
  const [MOUSE, CHEESE] = [UseMouseContext(), UseCheeseContext()];
  
  return (
    <section className={`${styles.top} 
    ${(gameState==='end' || gameState==='ready') && styles.hide}`}>
      <GameTimer 
        timer = {timer}
        result = {result}
        score={score} 
        onGSClick={onGameStateClick} 
        onGDClick={onGameDurationClick}
      />
      <GameScore score={score}/>
    </section>
  );
}


function GameTimer({timer, result, score, onGSClick, onGDClick}){
  const gameState = useGameStateContext();
  const DURATION = UseGameDurationContext();
  let intervalRef = useRef(DURATION); //렌더링에 무관한 setIntervalID 저장용

  //let timer = undefined; //매 시작마다 초기화되어야 하므로
  const [showRemainingTime, setShowRemainingTime] = useState(DURATION);
  const [nowState, setNowState] = useState('gaming'); //렌더링을 일으켜, 버튼을 바꾸기 위함


  useEffect(()=>{ //팝업 제거 후 GameField 마운트 되자마자 보여져야 하는 파트. 
    /*
    if (gameState==='ready'|| 
    gameState==='success' || 
    gameState==='fail' || 
    gameState==='end') return;
    */
    console.log("현재 게임상태:", gameState);

    intervalRef.current = setInterval(()=>{
      if (gameState==='ready'|| 
        gameState==='success' || 
        gameState==='fail' ||
        gameState==='end'){
        clearInterval(intervalRef.current);
        onGSClick('end');
        setShowRemainingTime(DURATION);
        intervalRef.current = undefined; 
        return;
      }
      else if (gameState==='pause'){
        clearInterval(intervalRef.current);
        return;
      }
      else if (showRemainingTime<=0){ //#
        clearInterval(intervalRef.current);
        onGSClick('end');
        setShowRemainingTime(DURATION);
        intervalRef.current = undefined;
        return;
      }
      else setShowRemainingTime(prev => prev-1);
      console.log("남은시간:",showRemainingTime);
      //console.log("원래 시간 :",DURATION); //현재 스냅샷의 context 정보 읽어주기
    },1000);
    return ()=>clearInterval(intervalRef.current);
  },[gameState])//gameState
 
  const handleEnd = ()=>{
    if (nowState==='gaming'){
      setNowState('pause');
      onGSClick('pause');
      //clearInterval(intervalRef.current);
    } 
    else if (nowState==='pause'){
      setNowState('gaming');
      onGSClick('gaming');
    }
    console.log(gameState);
  }
  return (
    <>
      <button className={styles.pauseBtn} onClick={handleEnd}>
        {nowState==='gaming' && <FaPause />}
        {nowState==='pause' && <FaPlay />}
      </button> 
      <span className={styles.gameTimer}>
      {`${Math.floor(showRemainingTime/60)}:${showRemainingTime%60}`}</span>
    </>
  )
}

function GameScore({score}){
  const CHEESE_COUNT = UseCheeseContext();
  const [ScreenScore, setScreenScore] = useState(score);
  useEffect(()=>{
   setScreenScore(score); 
  }) 
  return (
    <>
      <div className={styles.gameScore}>{CHEESE_COUNT-ScreenScore}</div>
    </>
  )
}
