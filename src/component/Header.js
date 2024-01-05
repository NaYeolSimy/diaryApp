import "./Header.css";

//leftChild 전 글 / 뒤로가기
//rightChild 다음 글 / 수정하기
const Header = ({ title, leftChild, rightChild }) => {
  return (
    <div className="Header">
      <div className="Header_left">{leftChild}</div>
      <div className="Header_title">{title}</div>
      <div className="Header_right">{rightChild}</div>
    </div>
  );
};

export default Header;
