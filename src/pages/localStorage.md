
클라이언트 측에서 데이터를 저장/수정하는 데 사용할 수 있게
웹 브라우저에선 웹 스토리지 옵션을 제공함 

두가지 방법이 있다 
1. 로컬스토리지 
2. 세션

--------
로컬스토리지 사용법

로컬 스토리지: 로컬 스토리지에 저장된 데이터는 브라우저 세션이 종료되더라도 계속 유지됩니다. 사용자가 직접 브라우저에서 해당 데이터를 삭제하지 않는 한, 로컬 스토리지에 저장된 정보는 계속 남아있습니다.

객체 localStorage 에서 setItem 호출해 key&value 전달
localStorage.setItem("key",value)

우리가 사용하는 data는 json 객체이기에 문자열로 데이터 변환하여 사용해야함 
localStorage.setItem("key",JSON.stringify(value))

다시 객체 상태로 변환 원하면 

const data = JSON.parse(localStorage.getItem("key"))

데이터 삭제 원하면 

localStorage.removeItem("key")

삭제하고픈 데이터의 key 값을 인풋으로 넘기면 됨 

---------
세션 사용법

세션 스토리지: 세션 스토리지에 저장된 데이터는 브라우저 세션 동안 유지됩니다. 즉, 사용자가 브라우저를 닫으면 세션 스토리지에 저장된 데이터가 삭제됩니다.

sessionStorage.setItem("key",value)

sessionStorage.setItem("key",JSON.stringify(value))

sessionStorage.removeItem("key")