import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

// 선택할 경우(case) 마다 이모션 이미지 변경

const getEmotionImgById = (emotionId) => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1":
      return emotion1;
    case "2":
      return emotion2;
    case "3":
      return emotion3;
    case "4":
      return emotion4;
    case "5":
      return emotion5;
    default:
      return null;
  }
};

const getFormmattedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1; // 1부터 시작해야하니까
  let date = targetDate.getDate();

  //01,02...,09월 표시
  if (month < 10) {
    month = `0${month}`;
  }
  //01,02...,09일 표시
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

const emotionList = [
  {
    id: 1,
    name: "완전 좋음",
    img: getEmotionImgById(1),
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImgById(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImgById(4),
  },
  {
    id: 5,
    name: "완전 나쁨",
    img: getEmotionImgById(5),
  },
];

const getMonthRangeByDate = (date) => {
  //new Date(year, month, day) 아래에서 1은 day 1을 설정하는것
  const beginTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getTime();
  //  0시 23시 59분 59초 , date.getMonth()가 4월이라면 date.getMonth() + 1을해 5월이 되기전 날을 구하는 것  
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return { beginTimeStamp, endTimeStamp };
};



// 페이지 제목을 설정하기
//<head>의 <title> 태그를 불러옴
// public 폴더 안 index.js 파일안 <title>React App</title>
//setPageTitle을 다른 컴포넌트에 쓰일때 title 넘겨줌

const setPageTitle = (title)=>{
  const titleElement = document.getElementsByTagName("title")[0]
  titleElement.innerText = title;

}







export {
  getEmotionImgById,
  getFormmattedDate,
  emotionList,
  getMonthRangeByDate,
  setPageTitle
};
