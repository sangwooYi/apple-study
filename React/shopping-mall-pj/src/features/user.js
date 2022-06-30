import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  // 그냥 이렇게 값을 넣을 수도 있고, array 형태, object형태를 넣을수도 있다.
  // 왠만하면 이렇게 initialState 를 obj형태로 해서 변수를 추가로 부여하자 (바꿀때 편하네)'
  // 그게 아니라 그냥 initialState에 단일값만 부여된다면 reducer에서 return 형태로 작성이 되어야 적용됨!
  // ex) initialState: 'kim' 그냥 이렇게 되었다면 아래 changeUser는 (state,action) => { return action.payload } 이렇게 되어야 하는것
  // 오브젝트 or array 형태로 선언한다면 return 문 없이 바로 직접 바꿀수 있다!
  initialState: {
    name: 'kim',
    age: 20,
  },
  reducers: {
    changeUser: (state, action) => {
      // dispatch로 부터 넘어온 인자는 action.payload 에 담겨져서 온다.
      state.name = action.payload;
    },
    increaseAge: state => {
      state.age += 1;
    }
  }
})

export const { changeUser, increaseAge } = user.actions;
export default user.reducer;