import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

/*

BrowserRouter는 브라우저의 주소 변경을 감지하는 기능
이를 사용해 페이지 이동하는데 필요 기능 제공 
-> 동적 컨텐츠 변경으로 페이지 이동을 하는 것처럼 흉내냄
-> 실제 브라우저 url에선 변경이 없으나 UI를 변경해 페이지 이동을 하는 것처럼 흉내낸다는 뜻
-> 그래서 브라우저가 이걸 캐치할 수 있게 도와주는게 BrowserRouter 인 듯 



*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
