import Button from "../component/Button";
import Header from "../component/Header";
import DiaryList from "../component/DiaryList";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";

const Home = () => {
  //App.js에서 만들어 놓은 context 가져오기 -> data 가져오기
  const data = useContext(DiaryStateContext);
  //날짜데이터를 기준으로 일기를 필터하기 위한 state
  //월별로 일기 데이터를 구분하려면 date 객체에서 해당 월의 가장 빠른 시간과 가장 늦은 시간의 타임스탬프 값을 구해야 되됨
  const [filteredData, setFilteredData] = useState([]);

  // Header의 가운데에 날짜데이터를 받으려면 현재 날짜를 초기값으로 전달
  const [pivotDate, setPivotDate] = useState(new Date());
  const headerTitle = `${pivotDate.getFullYear()}년 ${
    pivotDate.getMonth() + 1
  }월`;

  useEffect(() => {
    setPageTitle("내 일기장");

    //게시글 data가 존재한다면
    if (data.length >= 1) {
      console.log("home.js에서 무슨 data를 가져와?", data);
      //pivotDate 현재 날짜를 가져와 getMonthRangeByDate를 통해 최신날짜와 오래된날짜를 가져온다
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      //게시글을 업데이트 한다
      //게시글 data를 필터한 data가 최신날짜 보다

      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      // 게시글이 존재하지 않다면
      // 빈 배열을 업데이트 한다
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  //Header 오른쪽 버튼 누르면 월 증가
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  //Header 왼쪽 버튼 누르면 월 감소
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <div>
        <Header
          title={headerTitle}
          leftChild={
            <Button
              text={"<"}
              onClick={() => {
                onDecreaseMonth();
              }}
            />
          }
          rightChild={
            <Button
              text={">"}
              onClick={() => {
                onIncreaseMonth();
              }}
            />
          }
        />
      </div>
      <div>
        <DiaryList data={filteredData} />
      </div>
    </div>
  );
};

export default Home;
