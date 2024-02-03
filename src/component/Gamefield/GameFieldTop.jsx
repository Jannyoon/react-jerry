import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './GameField.module.css';
import { FaPause } from "react-icons/fa";
import { useGameStateContext } from '../context/gameStateContext';
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';

export default function GameFieldTop({score}) {
  const gameState = useGameStateContext();
  const [MOUSE, CHEESE] = [UseMouseContext(), UseCheeseContext()];
  
  return (
    <section className={`${styles.top} ${gameState!=='gaming' && styles.hide}`}>
      <GameTimer/>
      <GameScore />
    </section>
  );
}


function GameTimer(){
  const gameState = useGameStateContext();
  const DURATION = 10;
  const remaining = useRef(DURATION); 
  let remainingSec = remaining.current;
  let timer = undefined; //매 시작마다 초기화되어야 하므로
  const [forTimer, setForTimer] = useState(remainingSec);
  //let remainingSec = useRef(DURATION);

  console.log(remainingSec);
  useEffect(()=>{ //팝업 제거 후 GameField 마운트 되자마자 보여져야 하는 파트. 
    if (gameState!=='gaming') return;
    timer = setInterval(()=>{
      if (remainingSec<=0){
        clearInterval(timer);
        return;
      }
      setForTimer(--remainingSec);
      console.log("남은시간:",remainingSec);
      console.log("원래 시간 :",DURATION);
    },1000);
    return ()=>setInterval(timer);
  },[gameState,remainingSec])
 
  
  return (
    <>
      <div className={styles.pauseBtn}><FaPause /></div> 
      <span className={styles.gameTimer}>
      {`${Math.floor(forTimer/60)}:${forTimer%60}`      

      }</span>
    </>
  )
}

function GameScore(){
  return (
    <>
      <div className={styles.gameScore}>90</div>
    </>
  )
}
