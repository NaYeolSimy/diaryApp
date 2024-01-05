import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormmattedDate } from "../util";
import Viewer from "../component/Viewer";
import { setPageTitle } from "../util";
import { useEffect } from "react";

/*

내가 원하는 데이터를 만들기 위해서 짠 useDiary를 가져와
사용자가 diary 경로로 들어오면 받는 id를 사용해 
<Route path="/diary/:id" element={<Diary />}></Route>
 useDiary로 넘긴다 
 useDiary는 id에 맞는 data 일기를 받을 수 있는 훅
 id에 맞는 일기를 data에 담는다  

const data = useContext(DiaryStateContext); 를 통해
useDiary에 있는 로직을 여기에서 사용할 수 도 있지만 
따로 로직을 분리한 것 
 
*/

const Diary = () => {
  //동적 컨텐츠 라우팅 주소에 대한 컴포넌트를 부여하기
  const { id } = useParams();

  useEffect(() => {
    setPageTitle(`일기`);
  });
  //useDiary에서
  const data = useDiary(id);
  console.log("diary에서의 data:", data);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!data) {
    return <div>일기 데이터를 불러오고 있습니다</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormmattedDate(new Date(Number(date)))} 기록`;

    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"뒤로가기"} onClick={goBack}></Button>}
          rightChild={
            <Button text={"수정하기"} type="positive" onClick={goEdit}></Button>
          }
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};

export default Diary;
