import React, { useEffect, useState, useRef } from 'react';
import {v4 as uuid4} from 'uuid';
import styles from './GameField.module.css';
import { useGameStateContext } from '../context/gameStateContext';
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';
import jerryImg from './Field-Img/jerry.png';
import cheeseImg from './Field-Img/cheese.png';

export default function GameFieldBottom({score}) {
  const gameState = useGameStateContext();
  let areaRef = useRef(0); //bottom 영역 산출

  const [MOUSE_COUNT, CHEESE_COUNT] = [UseMouseContext(),UseCheeseContext()];  
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);


  useEffect(()=>{
    setMaxWidth( areaRef.current.offsetWidth);
    setMaxHeight(areaRef.current.offsetHeight);
  },[])

  console.log(maxWidth, maxHeight);



  function addItem(item, count){
    let itemList = [];
    for (let i=0; i<count; i++){    
      let randomWidth = getRandomNumber(0, maxWidth-70);
      let randomHeight = getRandomNumber(0, maxHeight-70);
      itemList.push(
        {
          className : `item ${item}`,
          src : item==='jerry'? jerryImg : cheeseImg,
          left : randomWidth,
          top : randomHeight
        }
      )
    }
    return itemList;  
  }

  const jerryList = maxWidth!==0 ? addItem('jerry', MOUSE_COUNT) : [];
  const cheeseList = maxWidth!==0 ? addItem('cheese', CHEESE_COUNT) : [];

  console.log(jerryList);
  return (
    <section ref={areaRef} className={`bottom ${styles.bottom} ${gameState!=='gaming' && styles.hide}`}>
      { //제리 배치 
        jerryList.length!==0 && jerryList.map((item)=>{      
          return (
          <img
            key={uuid4()}
            className={item.className}
            src={item.src}
            style={{left:`${item.left}px`, top:`${item.top}px`, position : 'absolute'}}
          />) 
          })
      }
      { //치즈 배치
        cheeseList.length!==0 && cheeseList.map((item)=>{      
          return (
          <img
            key={uuid4()}
            className={item.className}
            src={item.src}
            style={{left:`${item.left}px`, top:`${item.top}px`, position : 'absolute'}}
          />) 
          })
      }
    </section>
  );
}


function getRandomNumber(min, max){
  return Math.random()*(max-min)+min
}
