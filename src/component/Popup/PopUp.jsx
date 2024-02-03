import React from 'react';
import { FaArrowRotateRight } from "react-icons/fa6";
import styles from './PopUp.module.css';
import startImgUrl from './PopupImg/tomCopy.png';
import refreshImgUrl from './PopupImg/jerryEatingCheeseCopy.png';
import { useGameStateContext } from '../context/gameStateContext';

export default function PopUp({onClick}) {
  const handleClick = ()=>{onClick()};
  const nowState = useGameStateContext();
  return (
    <div>
      {nowState==='ready' && <StartPopup onClick={handleClick}/>}
      {nowState==='end' && <RefreshPopup onClick={handleClick}/>}  
    </div>
  );
}

function StartPopup({onClick}){
  return(
    <div className={`${styles.popUp} ${styles.start}`}>
      <img src={startImgUrl} alt='startImg'/>
      <button className={styles.startBtn} onClick={onClick}>
        START
      </button>
    </div>
  )
}

function RefreshPopup({onClick}){
  return (
    <div className={`${styles.popUp} ${styles.refresh}`}>
      <img src={refreshImgUrl} alt='refreshImg'/>
      <span className={styles.refreshText}>RESTART?</span> 
      <button className={styles.refreshBtn} onClick={onClick}>
        <FaArrowRotateRight />
      </button>
    </div>
  )
}

