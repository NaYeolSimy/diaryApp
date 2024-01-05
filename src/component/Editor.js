import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList, getFormmattedDate } from "../util";
import Button from "./Button";
import EmotionItem from "./EmotionItem";

/*

날짜 input을 오늘날짜를 기본으로 설정 하고 싶다면?
오늘 날짜를 yyyy-mm-dd 형식으로 만드려면
날짜 객체를 만들고 이 객체의 함수로 형식을 바꾸면 된다 


취소 버튼을 누르면 메인 페이지로 이동시켜야 함 
리액트에서 뒤로 이동시키려면 react-router-dom 기능중 useNavigate 훅을 사용하면 됨 
*/

/*

이모티콘 누를 때마다 리랜더링되는걸 막고자 useCallback 사용함 
그리고 EmotionItem.js에 가서 React.memo 사용 

변하지 않는 컴포넌트엔 memo 사용
이 컴포넌트를 조작하는 함수가 있는 컴포넌트엔 useCallback 사용


*/

//Edit.js 에서 Editor 해당 컴포넌트로 initdata로 data 넘김
const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();
  //useState로 안에는 default 값 설정됨\
  const [state, setState] = useState({
    date: getFormmattedDate(new Date()), // 오늘 날짜를 인자로 전달해 input 설정
    emotionId: 3, // 페이지 랜더링 될 때 포커스 되어지는 기본값 그럭저럭 이모션
    content: "",
  });

  console.log(state); // 위에 useState로 설정한 default값이 찍힘

  //날짜관련 이벤트 핸들러
  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  // 작성 완료 버튼 누르면 현재 작성한 내용이 state에 담겨 submit
  // New.js 파일에 있는 onSubmit 함수에 전달
  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleOnGoBack = () => {
    navigate(-1);
  };

  // 감정 이미지 클릭 시 호출할 이벤트
  // 클릭한 이미지 번호 emotionId를 setState에 저장
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);

  //Editor 컴포넌트에서 useEffect를 호출해 initData 업데이트
  //useEffect의 콜백 함수가 실행 될 때 initData 참 거짓 여부를 확인하여 상태 setState 업데이트
  //initData 최초 일기 존재 시
  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormmattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input
            type="date"
            value={state.date} //useState로 설정한 default값인 오늘날짜로 설정됨
            onChange={handleChangeDate}
          ></input>
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 감정</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {/* 소괄호로 img 태그를 감싼 이유는 여러 개의 요소를 감싸기 위해 사용 */}
          {emotionList.map((it) => (
            // img 태그를 사용해서 받을 땐 그냥 아래 처럼 받음
            // <img key ={it.id} src={it.img}/>
            //하지만 EmotionItem를 사용해서 받을 땐 EmotionItem 자식컴포넌트에 각 item을 줘야하기 때문에 {...it} 하고 전달
            <EmotionItem
              {...it}
              key={it.id}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </div>
      </div>
      <div className="editor_section">
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="오늘은 어땠나요?"
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성완료"} type="positive" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
