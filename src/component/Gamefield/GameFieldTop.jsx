import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './GameField.module.css';
import { FaPause, FaPlay } from "react-icons/fa";
import { useGameStateContext } from '../context/gameStateContext';
import { UseGameDurationContext } from '../context/gameDurationContext'
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';

export default function GameFieldTop({score, onGameStateClick, onGameDurationClick}) {
  const gameState = useGameStateContext();
  const [MOUSE, CHEESE] = [UseMouseContext(), UseCheeseContext()];
  
  return (
    <section className={`${styles.top} 
    ${(gameState==='end' || gameState==='ready') && styles.hide}`}>
      <GameTimer score={score} 
        onGSClick={onGameStateClick} 
        onGDClick={onGameDurationClick}
      />
      <GameScore score={score}/>
    </section>
  );
}


function GameTimer({score, onGSClick, onGDClick}){
  const gameState = useGameStateContext();
  const DURATION = UseGameDurationContext();
  let remaining = useRef(DURATION); 

  let timer = undefined; //매 시작마다 초기화되어야 하므로
  const [forTimer, setForTimer] = useState(remaining.current);
  const [nowState, setNowState] = useState('gaming'); //컨텍스트를 읽어 렌더링을 일으키기 위함


  useEffect(()=>{ //팝업 제거 후 GameField 마운트 되자마자 보여져야 하는 파트. 
    let remainingSec = remaining.current;
    if (gameState!=='gaming') return;
    timer = setInterval(()=>{
      if (remainingSec<=0 || gameState==='pause'){
        onGDClick(remainingSec);
        clearInterval(timer);
        //onGSClick('end')
        return;
      }
      setForTimer(--remaining.current);
      console.log("남은시간:",remainingSec);
      //console.log("원래 시간 :",DURATION); //현재 스냅샷의 context 정보 읽어주기
    },1000);
    return ()=>clearInterval(timer);
  },[gameState,remaining.current,DURATION])
 
  const handleEnd = ()=>{
    
    if (nowState==='gaming'){
      setNowState('pause');
      onGSClick('pause');
      onGDClick(remaining.current);
      console.log("REMAINING:",remaining.current);
      clearInterval(timer);
      //timer = undefined;
      //remainingSec = 0;
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
      {`${Math.floor(forTimer/60)}:${forTimer%60}`      

      }</span>
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
