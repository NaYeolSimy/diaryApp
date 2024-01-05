import "./App.css";
//routes 여러 route 컴포넌트를 감싸고 현재 url 경로에 맞게 적절한 route 컴포넌트를 페이지에 렌더링함
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import New from "./pages/New";
import React, { useReducer, useRef, useEffect, useState } from "react";

/* 


클라이언트 렌더링을 위해 리액트 라우터 설치
npm install react-router-dom
------
index.js 파일에서 아래 코드 추가 
import {BrowserRouter} from 'react-router-dom'
App 컴포넌트를 <BrowserRouter> 로 감싸기
------
mockData를 사용할 때 문제점은 
새로운 글을 업데이트 할때마다 mockData까지 같이 랜더링을 해버린다
그래서 useEffect를 이용해 mockData를 디폴트값으로 두고 
새로운 글만 랜더링하게 끔 할거야 -> 랜더링 최적화 

즉 useEffect는 이전 글을 제외하고 새로운 상태만 업데이트해 랜더링 할때 필요한 훅


*/

//자식과 자손을 그룹으로 묶기 위해 context 만들기
// state만 관리하는 context
export const DiaryStateContext = React.createContext();
//context 사용시 지나친 페이지 리렌더링 이슈를 막기위해 dispatch 만들기
// 이벤트 함수만 관리하는 context
// 둘을 분리해 관리하면 지나친 페이지 리렌더링 이슈를 막을 수 있음
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      const newState = [action.data, ...state];
      //localStorage에 저장하고
      localStorage.setItem("diary", JSON.stringify(newState));
      //newState 보여줘
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    //targetId가 아닌 것들만 필터해서 리턴 -> 지울 targetId 빼고 보여주겠다
    case "DELETE": {
      const newState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }

    default: {
      return state;
    }
  }
}

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //초기값 0 설정
  const idRef = useRef(0);

  useEffect(() => {
    // 아래의 mockData가 실행되면 localstorage를 사용하는 코드는 무효화 된다
    // 즉 mockData가 불러와지고 화면에 데이터가 떠버림
    // dispatch({

    //   type: "INIT",
    //   data: mockData,

    // });

    // 로컬스토리지로 부터 diary라는 키값에 저장해 둔 데이터를 불러와 rawData 변수에 저장한다
    // 데이터가 존재하지 않는다면 setIsDataLoaded(true)를 업데이트하고 종료하고

    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    // 존재하면 데이터를 JSON 객체로 변환함
    const localData = JSON.parse(rawData);

    //localData가 존재하지 않는다면 setIsDataLoaded(true)를 업데이트하고 종료
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    // 불러온 일기 데이터를 id 기준으로 내림차순 정렬
    // 내림차순 정렬이기에 localData[0] 즉 데이터 배열의 첫번째 요소가 id 중 가장 큰 값이 된다
    // 일기 id에서 가장 큰값에 1 더한 값으로 설정한다
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    console.log("로컬데이타의 첫번째 요소의 id 값은? ", localData[0].id);
    idRef.current = localData[0].id + 1;
    dispatch({
      type: "INIT",
      data: localData,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    // 작성 완료 버튼 누르면 전달할 일기 데이터 형식 설정
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    // 설정후 id 증가 시키기-> 일기 저장할 때마다 각 id 부여 위해
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  // 변수 targetId로 삭제할 아이디를 저장 해 삭제 상태를 업데이트
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오고 있는 중입니다</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/diary/:id" element={<Diary />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
            </Routes>
            {/* reducer 사용 전 페이지 이동 구현 (a태그 역할)  */}
            {/* <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/new"}>New</Link>
          <Link to={"/diary"}>Diary</Link>
          <Link to={"/edit"}>Edit</Link>
        </div> */}
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
