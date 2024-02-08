import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './GameField.module.css';
import { FaPause, FaPlay } from "react-icons/fa";
import { useGameStateContext } from '../context/gameStateContext';
import { UseGameDurationContext } from '../context/gameDurationContext'
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';

export default function GameFieldTop({timer, result, score, onGameStateClick, onInitScore, onFinish}) {
  const gameState = useGameStateContext();

  return (
    <section className={`${styles.top} 
    ${(gameState==='end' || gameState==='ready') && styles.hide}`}>
      <GameTimer 
        timer = {timer}
        result = {result}
        score={score} 
        onGSClick={onGameStateClick} 
        onInitScore={onInitScore}
        onFinish={onFinish}
      />
      <GameScore 
      score={score}
      onGSClick={onGameStateClick} 
      onFinish={onFinish}
      />
    </section>
  );
}


function GameTimer({timer, result, score, onGSClick,  onInitScore, onFinish}){
  const gameState = useGameStateContext();
  const DURATION = UseGameDurationContext();
  const MOUSE_COUNT = UseMouseContext();
  let intervalRef = useRef(DURATION); //렌더링에 무관한 setIntervalID 저장용
  
  //let timer = undefined; //매 시작마다 초기화되어야 하므로
  const [showRemainingTime, setShowRemainingTime] = useState(DURATION);
  const [nowState, setNowState] = useState('gaming'); //렌더링을 일으켜, 버튼을 바꾸기 위함


  useEffect(()=>{ //팝업 제거 후 GameField 마운트 되자마자 보여져야 하는 파트. 
    console.log("현재 게임상태:", gameState);

    intervalRef.current = setInterval(()=>{
      if (gameState==='ready'|| gameState==='end'){
        clearInterval(intervalRef.current);
        intervalRef.current = undefined; 
        onInitScore(0);
        setShowRemainingTime(DURATION);
        return;
      }
      else if (gameState==='pause'){
        clearInterval(intervalRef.current);
        return;
      }
      else if (showRemainingTime<=0){ //#
        clearInterval(intervalRef.current);
        //결과를 확인한다
        onGSClick('end');
        score<MOUSE_COUNT && onFinish('fail');
        setShowRemainingTime(DURATION);
        onInitScore(0);
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
      {`${String(Math.floor(showRemainingTime/60)).padStart(2,'0')}:${String(showRemainingTime%60).padStart(2,'0')}`}</span>
    </>
  )
}

function GameScore({score, onGSClick, onFinish}){
  const MOUSE_COUNT = UseMouseContext();
  const [ScreenScore, setScreenScore] = useState(score);
  useEffect(()=>{
    setScreenScore(score); 
    if (ScreenScore===MOUSE_COUNT){
      onGSClick('end');
      onFinish("success");
    }
  }) 
  return (
    <>
      <div className={styles.gameScore}>{MOUSE_COUNT-ScreenScore}</div>
    </>
  )
}
