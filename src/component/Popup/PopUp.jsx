
import React from 'react';
import { FaArrowRotateRight } from "react-icons/fa6";
import styles from './PopUp.module.css';
import startImgUrl from './PopupImg/tomCopy.png';
import refreshImgUrl from './PopupImg/jerryEatingCheeseCopy.png';

export default function PopUp() {
  let flag = '';
  return (
    <>
      {flag===true && <StartPopup />}
      {flag===false && <RefreshPopup />}  
    </>
  );
}

function StartPopup(){
  return(
    <div className={`${styles.popUp} ${styles.start}`}>
      <img src={startImgUrl} alt='startImg'/>
      <button className={styles.startBtn}>START</button>
    </div>
  )
}

function RefreshPopup(){
  return (
    <div className={`${styles.popUp} ${styles.refresh}`}>
      <img src={refreshImgUrl} alt='refreshImg'/>
      <span className={styles.refreshText}>RESTART?</span> 
      <button className={styles.refreshBtn}>
        <FaArrowRotateRight />
      </button>
    </div>
  )
}

