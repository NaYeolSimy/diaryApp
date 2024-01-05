import "./Viewer.css";
import { emotionList } from "../util";

const Viewer = ({ content, emotionId }) => {
  const emotionItem = emotionList.find((it) => it.id === emotionId);
  //객체로 id,img,name 들어옴
  console.log("이모션아이템 객체: ", emotionItem);
  console.log("뷰어 콘텐츠", content);
  return (
    <div className="Viewer">
      <section>
        <h1>오늘의 감정</h1>
        <div
          className={[
            "emotion_ing_wrapper",
            `emotion_img_wrapper_${emotionId}`,
          ].join(" ")}
        >
          <img alt={emotionItem.name} src={emotionItem.img} />
          <div className="emotion_descript">{emotionItem.name}</div>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
