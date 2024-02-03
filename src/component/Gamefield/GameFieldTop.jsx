import React from 'react';
import styles from './GameField.module.css';
import { FaPause } from "react-icons/fa";
import { useGameStateContext } from '../context/gameStateContext';
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';

export default function GameFieldTop() {
  const gameState = useGameStateContext();
  const [MOUSE, CHEESE] = [UseMouseContext(), UseCheeseContext()];
  
  return (
    <section className={`${styles.top} ${gameState!=='gaming' && styles.hide}`}>
      <PauseBtn />
      <GameTimer/>
      <GameScore />
    </section>
  );
}

function PauseBtn(){
  return(
    <div className={styles.pauseBtn}><FaPause /></div>
  )
}

function GameTimer(){
  return (
    <>
      <span className={styles.gameTimer}>00:00</span>
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
