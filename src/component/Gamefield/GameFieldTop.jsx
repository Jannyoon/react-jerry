import React from 'react';
import styles from './GameField.module.css';

import { FaPause } from "react-icons/fa";

export default function GameFieldTop() {
  return (
    <section className={styles.top}>
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
