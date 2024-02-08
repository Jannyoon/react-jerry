import React from 'react';
import { FaArrowRotateRight } from "react-icons/fa6";
import styles from './PopUp.module.css';
import startImgUrl from './PopupImg/tomCopy.png';
import FailImgUrl from './PopupImg/jerryEatingCheeseCopy.png';
import SuccessImgUrl from './PopupImg/tomCopy.png';
import { useGameStateContext } from '../context/gameStateContext';

export default function PopUp({result, onClick}) {
  const nowState = useGameStateContext();
  return (
    <div>
      {nowState==='ready' && <StartPopup result={result} onClick={onClick}  />}
      {nowState==='end' && <RefreshPopup result={result} onClick={onClick}/>}  
    </div>
  );
}

function StartPopup({result, onClick}){
  return(
    <div className={`${styles.popUp} ${styles.start}`}>
      <img src={startImgUrl} alt='startImg'/>
      <button className={styles.startBtn} onClick={()=>{
        onClick();
      }}>
        START
      </button>
    </div>
  )
}

function RefreshPopup({result, onClick}){
  return (
    <div className={`${styles.popUp} ${styles.refresh}`}>
      <img src={
        result==='success'?
        SuccessImgUrl :
        FailImgUrl} 
        alt='refreshImg'/>
      <span className={styles.refreshText}>{`${String(result).toUpperCase()}! `}RESTART?</span> 
      <button className={styles.refreshBtn} onClick={()=>{
        onClick();
      }}>
        <FaArrowRotateRight />
      </button>
    </div>
  )
}

