import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

const Edit = () => {
  useEffect(() => {
    setPageTitle(`수정하기`);
  });
  //삭제 구현하기 위해 id 가지고 오기
  const { id } = useParams();
  //id에 맞는 data 가져오기
  const data = useDiary(id);

  //뒤로가기 구현
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  //글 삭제하기 구현
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    //사용자가 confirm의 yes를 누른다면 true겠지?
    if (
      window.confirm("일기를 삭제하시겠습니까? 삭제한 일기는 복구되지 않습니다")
    ) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    if (window.confirm("일기를 수정하시겠습니까?")) {
      //data 구조분해 할당 해서 onUpdate 인자로 보냄
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", { replace: true });
    }
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다</div>;
  } else {
    console.log("edit페이지 데이터", data);

    return (
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
          rightChild={
            <Button text={"삭제하기"} type="negative" onClick={onClickDelete} />
          }
        ></Header>
        {/* id에맞는 일기 가져온 data 변수를 Editor에 넘겨주기 */}
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
