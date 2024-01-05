개발자 도구 -> 리액트 컴포넌트를 들어가 하이라이트를 설정하면
랜더링 될때 새로고침되는 컴포넌트들을 나타내준다

이를 이용하면 어떤 컴포넌트가 랜더링에 최적화 되지 않았는지 알 수 있다

---

DiaryItem.js
최신순/ 오래된 순 누를 때마다 각 item이 리랜더링 되는 걸 막고자
React의 memo를 사용함

---

---

Editor.js
EmotionItem.js
이모티콘 누를 때마다 리랜더링되는걸 막고자 useCallback 사용함
그리고 EmotionItem.js에 가서 React.memo 사용

변하지 않는 컴포넌트엔 memo 사용
이 컴포넌트를 조작하는 함수가 있는 컴포넌트엔 useCallback 사용

---
