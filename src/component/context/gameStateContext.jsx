import { createContext, useContext } from "react";

export const GameStateContext = createContext();

export function useGameStateContext(){
  return useContext(GameStateContext);
}