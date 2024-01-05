import "./DiaryList.css";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된순",
  },
];

const DiaryList = ({ data }) => {
  //sortOptionList를 이용해 분류기준 state 업데이트 설정
  const [sortType, setSortType] = useState("latest");
  //분류기준에 따라 업데이트될 data state
  const [sortedData, setSortedData] = useState([]);

  /*
  
    // 비교 함수
    function compare(a, b) {
    return a - b;
    }

    // 배열 생성 및 정렬
    const data = [3, 1, 4, 1, 5, 9,S 2, 6, 5, 3, 5];
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);

    console.log(copyList); // [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
*/

  useEffect(() => {
    const compare = (a, b) => {
      console.log("a :", a);
      console.log("b :", b);
      if (sortType === "latest") {
        //분류기준이 최근이라면 형 변환 후 내림차순으로 정렬
        console.log("b.date:", b.date, " a.date:", a.date);
        return Number(b.date) - Number(a.date);
      } else {
        //오래된 순이라면 오름차순으로 정렬
        console.log(" a.date:", a.date, "b.date:", b.date);
        return Number(a.date) - Number(b.date);
      }
    };
    //데이터 형식은 json이므로 정렬한 데이터를 json 형식으로 변환
    const copyList = JSON.parse(JSON.stringify(data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);

  //분류기준 state로 가져오기
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const navigate = useNavigate();

  const onClickNew = () => {
    navigate("/new");
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            type="positive"
            text={"새 일기 쓰기"}
            onClick={onClickNew}
          ></Button>
        </div>
      </div>
      <div className="list_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
