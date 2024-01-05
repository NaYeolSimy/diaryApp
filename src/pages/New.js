import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext,useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

/* 작성완료 버튼 누르면 데이터가 추가 되어야함 
App.js에 있는 onCreate를 가져와야하니 DiaryDispatchContext를 가져옴 

사용자가 작성 완료 버튼을 누르면  onSubmit  -> onCreate 호출

*/

const New = () => {

  useEffect(()=>{
    setPageTitle("새 일기 쓰기")
  },[])

  const { onCreate } = useContext(DiaryDispatchContext);
  console.log(onCreate); // 함수를 가져옴
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // Editor.js 파일에 있는 작성완료버튼을 누르면 현재 작성한 내용이 state에 담겨
  // onSubmit 함수에 전달 됨
  const onSubmit = (state) => {
    const { date, content, emotionId } = state;
    onCreate(date, content, emotionId);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
