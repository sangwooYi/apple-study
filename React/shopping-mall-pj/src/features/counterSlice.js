import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  // 공유하려는 state를 이렇게 각각 파일로 선언해 주어야 함
  name: 'counter',
  // 하나의 Slice안에 이렇게 여러 state를 선언 할 수 있다!
  initialState: {
    value: 0,
    dat: 0
  },
  // 변경은 reducer를 통해서만 진행되어야 함!
  reducers: {
    increment: state => {
      state.value += 1;
      state.dat += 2;
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload
    }
  }
})

// reducer를 다른 컴퍼넌트에서 쓰도록 하려면 Slice변수명.actions 형태로 export 해주어야 함
export const { increment, decrement, incrementByAmount, decrementByAmount } = counterSlice.actions;
// Slice변수명.reducer 형태로 반드시 선언해 주어야 한다.
export default counterSlice.reducer;