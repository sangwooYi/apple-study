import { configureStore } from '@reduxjs/toolkit'
// counterSlice.reducer 로 export default 를 해주었으며, 작명은 이렇게 자유롭게 할 수 있다.
// 어차피 export default는 하나밖에 없으므로, 이렇게 import할때 자유롭게 이름을 바꿀 수 있다!
// 그냥 counterSlice.reducer로 해도 됨
// export default 의 경우는 어차피 파일당 한개이므로, import할 떄 원하는대로 이름 변경 가능
import counterReducer from './features/counterSlice';
// 얘는사실 user.reducer 임
import userReducer from './features/user';
import cartItemsReducer from './features/cartItems';

// store를 이렇게 만들어 주어야 함

/*
    Redux를 사용하기 위한 기본 세팅
    1. 원하는 위치에 store.js 파일을 생성해 줌
    2. index.js에서 만든 store.js를 import 해주고, Provider태그로 App 태그를 감싸줌 
    3. store={store} 를 Provider 태그에 작성해준다. 이래야 redux의 store를 쓰겠다는 선언! 

    그 후 실제 사용법
    1. 공유할 state를 별도의 파일로 선언해서 만들어준다. (features 하위 폴더의 파일들 참고)
      기본적으로 들어가야 할것이 name(state명) , initialState(초깃값), reducers{}
      Redux에서 선언한 state들은 선언한 곳에서 만든 reducer를 통해서만 변경하도록 작성해야한다! 
    
    2. 작성한 1번의 파일을 store.js 에 import 해주고 reducer 안에 선언해 준다 
    3. 사용할 곳에서 useSelector, useDispatch, 사용할 state의 reducer들을 import 해줌
    4. useSelector는 state 값을 읽어오는 것, useDispatch는 reducer를 사용할 수 있도록 하는 것임. 
      각각 변수로 등록해주고, 쓸 곳에 useSelector로 뽑아온 state를 배치해 주면 된다.
      useSelector(state => state.내가 name에 선언한 이름.value) 로 뽑아내면 됨
      그리고 값을 변경할 이벤트에 dispatch변수명(내가 사용할 reducer) 이런식으로 쓰면 된다!
      ex) onClick{() => dispatch(increment())}


    기본적으로 Redux store에 저장할 state는 모든 컴퍼넌트가 공유해야하는 state들만 저장하는게 효율적임
    이런 효율부분에 대해서는 기획 단계에서 고민을 잘 해야한다!
 */
export default configureStore({
  reducer: {

    counter: counterReducer,
    user: userReducer,
    cartItems: cartItemsReducer,
  }
})