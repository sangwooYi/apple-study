"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = require("react");
const Profile_1 = require("./Profile");
// npx create-react-app 플젝명 --template typescript 하면 알아서 생성됨!
// 그냥 타입스크립트로 JSX 만드는게 tsx 확장자임!
// useState같은 Hook들은 tsx에서는 전부 제네릭으로 선언되어있따.
/**
 *
 *  Redux 참고
 *  https://redux.js.org/usage/usage-with-typescript#standard-redux-toolkit-project-setup-with-typescript
 *
 *  sotre.ts 에서
 *  아래처럼 state, dispatch에 대한 type을 미리 export 해준다.
 *  그리고 useSelector, useDispatch 선언할떄처럼, 말그대로 변수에 대한 type 선언만
 *  추가된것
 *  export type RootState = ReturnType<typeof store.getState>
 *  export type AppDispatch = typeof store.dispatch
 *
 *  또한 Hook의 경우 (useSelector, useDispatch)는 커스텀 해야한다.
 *
 *  export const useAppDispatch: () => AppDispatch = useDispatch
 *  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
 *
 *  위처럼 커스텀한후 (documentation에서 시킨대로 하는거임)
 *  useAppDispatch, useAppSelector를 import해서 useDispatch, useSelector 대신 쓰면 됨
 *  물론 코드애플 강의처럼 해도 됨!
 */
function App() {
    // 이렇게 JSX 태그에 대한 타입지정은 아래처럼 하면 된다.
    let box = <div></div>;
    // 더 정확한건 기본태그는 아래와같이 한다. []에 'div', 'a', 'h4' 등 태그명을 명시해 주면 됨
    let bbb = <div></div>;
    // Hook은 이렇게 컴퍼넌트 내부에 선언해야함. 주의하자
    let [name, setName] = (0, react_1.useState)('상우');
    return (<div className="App">
      <Profile_1.default name={name}></Profile_1.default>
    </div>);
}
exports.default = App;
