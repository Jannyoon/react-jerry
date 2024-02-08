import React, { useEffect, useState, useRef } from 'react';
import {v4 as uuid4} from 'uuid';
import styles from './GameField.module.css';
import { useGameStateContext } from '../context/gameStateContext';
import { UseMouseContext, UseCheeseContext } from '../context/itemCountContext';
import { UseGameScoreContext } from '../context/gameScoreContext';
import jerryImg from './Field-Img/jerry.png';
import cheeseImg from './Field-Img/cheese.png';


export default function GameFieldBottom({result, score, onGameStateClick, onClick, onFinish}) {
  const gameState = useGameStateContext();
  let areaRef = useRef(0); //bottom 영역 산출
  
  const [MOUSE_COUNT, CHEESE_COUNT] = [UseMouseContext(),UseCheeseContext()];  
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  const jerryList = useRef([]); 
  const cheeseList = useRef([]);


  useEffect(()=>{
    setMaxWidth( areaRef.current.offsetWidth);
    setMaxHeight(areaRef.current.offsetHeight);
  },[])

  useEffect(()=>{
    if (gameState==='ready' || gameState==='end'){
      jerryList.current = (addItem('jerry', MOUSE_COUNT));
      cheeseList.current = (addItem('cheese',CHEESE_COUNT));
    }
  },[maxWidth, maxHeight, gameState])

  console.log(maxWidth, maxHeight);
  console.log(jerryList);

  const ItemClick = (e)=>{
    const target = e.target;
    if (target.matches('.jerry') && target.style.visibility!=='hidden'){
      console.log(target);
      onClick();
      target.style.visibility='hidden'; //제리면 아이템을 보여지지 않도록 처리한다.
      jerryList.current= jerryList.current.filter((item)=>{
        return (item.id!==target.id)
      })     
    }
    else if (target.matches('.cheese')){
      onGameStateClick('end');
      onFinish('fail');
    }
    else return;

  }

  function addItem(item, count){
    let itemList = [];
    for (let i=0; i<count; i++){    
      let randomWidth = getRandomNumber(0, maxWidth-70);
      let randomHeight = getRandomNumber(0, maxHeight-70);
      itemList.push(
        {
          id : uuid4(),
          className : `item ${item}`,
          src : item==='jerry'? jerryImg : cheeseImg,
          left : randomWidth,
          top : randomHeight
        }
      )
    }
    return itemList;  
  }

  //const jerryList = maxWidth!==0 ? addItem('jerry', MOUSE_COUNT) : [];
  //const cheeseList = maxWidth!==0 ? addItem('cheese', CHEESE_COUNT) : [];

  console.log(jerryList);
  return (
    <section ref={areaRef} className={`bottom ${styles.bottom} ${gameState!=='gaming' && styles.hide}`}>
      { 
      //제리 배치 
        jerryList.current.length!==0 && jerryList.current.map((item)=>{      
          return (
          <img
            onClick={e=>ItemClick(e)}
            key={item.id}
            className={item.className}
            src={item.src}
            style={{left:`${item.left}px`, top:`${item.top}px`, position : 'absolute'}}
          />) 
          })
      }
      {         
        cheeseList.current.length!==0 && cheeseList.current.map((item)=>{      
          return (
          <img
            onClick={e=>ItemClick(e)}
            key={item.id}
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
