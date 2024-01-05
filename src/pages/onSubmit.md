Editor.js 에 있는

작성 완료 버튼을 누르면 onSubmit 함수가 실행 된다

새 일기를 구현 하고 싶은 New.js에서는

onSubmit 함수를 만들어 onCreate를 실행 하도록 하고

수정을 구현하고 싶은 Edit.js에서는

onSubmit 함수를 만들어 onCreate을 실행하도록 한다

즉 함수 컴포넌트 안에 변수가 한정되어있어

두개의 컴포넌트에 같은 onSubmit 함수를 만들어 Editor.js에 전달하는 것
