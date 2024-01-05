/*

감정 이미지 선택 시 색상 변경 % 기능 

*/

import React from "react";
import "./EmotionItem.css";

//isSelected 감정이미지의 선택 여부
const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  // 감정 이미지 클릭시 동작
  const handleOnClick = () => {
    onClick(id);
  };

  return (
    // "EmotionItem EmotionItem_on_1" or "EmotionItem EmotionItem_off"
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={handleOnClick}
    >
      <img alt={`emotion${id}`} src={img} />
      <span>{name}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
