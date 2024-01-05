//3개의 버튼을 리액트 컴포넌트로 구현
/*
버튼에 표시할 내용 = text
버튼의 색상에 결정 = type
버튼 클릭 시 발생하는 이벤트 핸들러 = onClick

-> 버튼에 전달되는 props에 따라 버튼을 바꿀거야 
*/

import "./Button.css";

const Button = ({ text, type, onClick }) => {
  // 스타일 1 = positive, 스타일 2 = negative 지정해 스타일 변경할 거야
  // props로 전달된 type이 둘 중에 하나면 해당 스타일로 변경하고 없으면 default 스타일로 변경해
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      // 복수의 데이터가 들어가니 중괄호 처리 -> {["Button", `Button_${btnType}`].join(" ")}
      // 데이터 배열 처리 위해 대괄호 -> ["Button", `Button_${btnType}`].join(" ")
      // join 사용해 한칸 띄어서 [a,b].join(" ") => "a b"
      // className = "Button Button_positive" or className = "Button Button_negative" or className = "Button Button_default"
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// 아무런 props가 전달 되지 않았을 때 설정하는 default
// type 지정이 실패하면 아래의 코드가 기본값으로 설정됨
Button.defaultProps = {
  type: "default",
};

export default Button;
