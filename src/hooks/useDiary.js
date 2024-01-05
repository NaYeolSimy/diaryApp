/*

직접 짠 리액트 훅스라는 것을 나타내기위해 use 사용 
고유 데이터 구분위해 id를 인풋값으로 받음 

useDiary를 통해 일기 데이터를 불러오는 기능을 구현
useContext를 통해 전체 일기데이터를 불러온 후 데이터 페이지 이동을 처리

id와 일치하지 않는 일기를 불러오려고 시도 한다면
useNavigate를 통해 home 화면으로 사용자를 보내는 기능인 리다이렉트를 구현





*/

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  // App에 있는 DiaryStateContext는 일기 data를 가지고 있음
  // 이를 data 변수에 담아 내가 원하는 결과를 만들기 위한 코드를 작성 후 export하면 내 맞춤 데이터를 여러 컴포넌트(Diary.js)에  사용 가능
  const data = useContext(DiaryStateContext);
  const [diary, setDiary] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // Diary.js에서 넘겨준 id를 이용해 data에 해당 id에 맞는 일기가 있는지 확인
    const matchDiary = data.find((it) => String(it.id) === String(id));
    //만약에 있다면
    if (matchDiary) {
      //그 다이어리를 업데이트
      setDiary(matchDiary);
    } else {
      //만약에 매치되는 일기가 없다면
      alert("일기가 존재하지 않습니다");
      //home으로 이동시키기
      navigate("/", { replace: true });
    }
  }, [id, data]);

  //setDiary 업데이트하고 난뒤엔 diary를 리턴해줘야 diary를 다른곳에서 사용할 수 있음
  return diary;
};

export default useDiary;
