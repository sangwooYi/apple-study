import { createSlice } from '@reduxjs/toolkit';

// createSlice를 통해 slice를 생성하며 그 내부에는 name, initialState, reducers에 대한 내용이 있어야 한다.
// 이런 구조로 작성해야한다!! (doc 참고) <= reduxjs/toolkit 으로 설치할때의 구조임.
export const cartItems = createSlice({
  name: 'cartItems',
  initialState: {
    value: [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ] 
  },
  reducers: {
    increment: (state, action) => {
      state.value.forEach((el, idx) => {
        // 내가 payload로 뭘 넘겼는지 내 코드를 잘 보자..
        if (el.id === action.payload) {
          state.value[idx].count++;
        }
      })
    },
    decrement: (state, action) => {
      state.value.forEach((el, idx) => {
        if (el.id === action.payload) {
          state.value[idx].count--;
        }
      })
    },
    addItem: (state, action) => {
      let flag = true;
      state.value.forEach((el, idx) => {
        if (el.id === action.payload.id) {
          flag = false;
          state.value[idx].count++;
        }
      })
      if (flag) {
        state.value = [...state.value, action.payload];
      }
    },
    deleteItem: (state, action) => {
      /*
        1. forEach는 단순 반복
        2. map은 현재 array를 사용 단순반복한 결과를 array로 새로 만들고 싶을 때
        3. filter는 현재 array에서 특정 조건에만 해당하는 array를 새로 만들고 싶을 때
        4. reduce는 현재 array에서 특정 작업을 한 후 '누적' 결과를 반환 (값이 될수도있고, 새로운 누적 배열, 오브젝트가 될 수도 있다.)
        리액트에서 리듀서가 사실 자바스크립트 reduce를 이용한거임
      */ 
      state.value = state.value.filter((el) => {
        return (el.id !== action.payload);
      })
    }
  }
  
})

export const { increment, decrement, addItem, deleteItem } = cartItems.actions;
// 슬라이스.reducer를 반드시 export default 해주어야 함
export default cartItems.reducer;