import GameFieldTop from "./GameFieldTop";
import GameFieldBottom from "./GameFieldBottom";
import styles from './GameField.module.css';
export default function Gamefield(){
  return (
    <div className={styles.gameField}>
      <GameFieldTop/>
      <GameFieldBottom/>
    </div>
  )
}