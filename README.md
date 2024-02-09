# [React]클릭형 게임 만들기
https://clever-dusk-dce9c3.netlify.app/
<hr>

![image](https://github.com/Jannyoon/react-jerry/assets/149743716/9ea150d1-5f13-45ff-9e4a-07d7ce95f6b1)
![image](https://github.com/Jannyoon/react-jerry/assets/149743716/139baba5-5573-4714-9a7e-4d4f50ce32ad)
![image](https://github.com/Jannyoon/react-jerry/assets/149743716/fe9a8f96-63d8-4057-bbd4-227a7fdac68a)
![image](https://github.com/Jannyoon/react-jerry/assets/149743716/3959a0d5-112e-4956-911a-dc25bf0575f4)
![image](https://github.com/Jannyoon/react-jerry/assets/149743716/efd27fc7-181c-4191-a845-9725700b42e5)
<hr>

## 💡 Trouble Shooting
- **getBoundingClientRect()를 이용해서 컴포넌트의 크기를 구하려 했더니 렌더링 전에 함수가 실행되면서 요소가 구해지지 않음.** <br>
  useRef, useEffect를 사용해야 했음.<br>
  useRef를 컴포넌트에 전달하고 해당변수.current.offsetWidth, 해당변수.current.offsetHeight로 컴포넌트의 너비, 높이를 구함<br>
<br>

- **타이머 화면에 출력** <br>
  useState를 사용 시 원하는대로 1초마다 화면에 띄워지지 않음. <br>
  타이머 로직은 렌더링에 무관하므로 useRef와 useEffect를 적용해야 했음. <br>
<br>

- **처음에 쥐를 클릭할 때 remove() DOM API를 사용하려 했음. target.remove()** <br>
이는 React가 제어할 수 없는 DOM에서 강제 제거하는 것.<br>
오류가 발생했음 : Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.<br>
<br>

css style을 사용해 hidden으로 노드는 존재하나, 보이지는 않도록 코드를 작성했다.

```
//아이템 클릭 시 발생하는 함수
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
```

<br>

📃 <ins>__공식문서 내용__</ins>

```
포커스나 스크롤 같은 비파괴적 동작을 고수한다면 문제가 발생하지 않을 것이다.
그러나 DOM을 수동으로 수정하려고 하면, React가 수행하는 변경 사항과 충돌이 일어난다.
사용자가 DOM을 변경했고, React가 이를 계속 올바르게 관리하는 방법을 모르기 때문이다.
```

<hr>

### 🔎 아쉬운 점

프로젝트를 처음 진행할 때 useRef가 어떻게 동작하는지, 왜 사용되는지 겉핥기로 알고 있었다는 생각이 들었음.<br>
타이머를 구현할 때 막혔던 것은 useRef와 useEffect의 잘못된 사용으로 구현을 하지 못했던 것.<br>
프로젝트를 다시 진행하기 전에 리액트로 스톱워치 기능만 먼저 간단하게 구현해 본 뒤, 문제를 해결할 수 있었음.<br>
<br>
현재 아주 빠른 속도로 클릭을 누를 경우엔 재시작은 잘 이뤄지나 타이머와 점수의 초기화가 제대로 이뤄지지 않는다는 이슈가 있음.<br>
렌더링 후 발생하는 일과 마운트 즉시 발생하는 일을 구분해서 코드를 작성해야 했음.<br>
이를 정확하게 생각하지 못한 채 기능을 하나씩 구현하며 코드를 작성한 것이 지금의 오류를 발생시켰다고 생각이 듦.<br>
