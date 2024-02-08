import { useContext, useState } from "react";
import GameFieldTop from "./GameFieldTop";
import GameFieldBottom from "./GameFieldBottom";
import styles from './GameField.module.css';
import { MouseCountContext, CheeseCountContext } from '../context/itemCountContext';
import { UseGameScoreContext } from "../context/gameScoreContext";

const MOUSE_COUNT = 5;
const CHEESE_COUNT = 5;

export default function Gamefield({timer, result, onStateChange, onUpdateScore, onFinish, onInitScore}){
  const score = UseGameScoreContext();

  //마우스, 치즈 개수 context로 전달
  return (
    <MouseCountContext.Provider value={MOUSE_COUNT}> 
      <CheeseCountContext.Provider value={CHEESE_COUNT}>
        <div className={styles.gameField}>
          <GameFieldTop 
            timer={timer}
            result={result}
            score={score} 
            onGameStateClick = {onStateChange}
            onInitScore = {onInitScore}
            
          />
          <GameFieldBottom 
            result = {result}
            score={score}
            onGameStateClick = {onStateChange}
            onClick={onUpdateScore}
            onFinish = {onFinish}
          />
        </div>
      </CheeseCountContext.Provider>
    </MouseCountContext.Provider>
  )
}