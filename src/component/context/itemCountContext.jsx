import { createContext, useContext } from "react";

export const MouseCountContext = createContext(5)
export const CheeseCountContext = createContext(5);

export const UseMouseContext = ()=>{
  return useContext(MouseCountContext);
}

export const UseCheeseContext = ()=>{
  return useContext(CheeseCountContext);
}