import { createContext, useContext } from "react";

export const GameDurationContext = createContext('ready');

export function UseGameDurationContext(){
  return useContext(GameDurationContext);
}