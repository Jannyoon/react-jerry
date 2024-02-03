import { createContext, useContext} from "react";

export const GameScoreContext = createContext(0);

export const UseGameScoreContext = ()=>{
  return useContext(GameScoreContext);
}