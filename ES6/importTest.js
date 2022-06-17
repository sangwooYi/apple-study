// export 해주어야, import를 해 줄 수 있다. React에서 이거 그냥 그대로 쓰는 것
const a = 3;
const c = 10;
function exportTest() {
  console.log("히히 테스트테스트");
}

// 함수를 실행할 때는 () 로 끝맺어줘야하고, 단순히 인자로 넘길때는 이렇게 그냥 입력!
// 여러개 넘길때는 그냥 export {export할 리스트들..};
// default export는 한 모듈당 하나씩만 export 가능!
// 리액트에서는 따라서, function이나 class형태로 컴퍼넌트를 작성한 후, 
// 그걸 export defalut 해서 사용하는 식으로 구현하는것

// 따라서 export default {내보낼것}는 export할 것을 하나만 규정하는것, 그게 아니면 그냥 export {내보낼것들} 사용
export {a as change, exportTest}; //Named exports , as를 사용해서 alias(별칭) 지정 가능! 반드시 export 단계에서 해주어야 함
 
// default, 그냥 export 병행해서 선언 가능 
export default c;   //Default exports