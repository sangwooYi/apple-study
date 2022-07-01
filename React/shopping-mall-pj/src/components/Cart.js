import { useState, useEffect, memo, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { increment, decrement, deleteItem } from '../features/cartItems';
import { useSelector, useDispatch } from 'react-redux';

// 이렇게 memo를 통해 컴퍼넌트를 만들어주면 
// 이 컴퍼넌트가 변할때만 제랜더링을 해준다! (useEffect랑 유사함)
// 따라서 오히려 너무 자주 남발하면 이 memo가 성능저하 요인으로 작용 (변하는지 체크해야하는 작업이 동반되므로)
// 상위 컴퍼넌트가 자주 변하나, 하위컴퍼넌트는 변할일이 거의 없는 경우 + 무거운 경우에만 이걸 사용하는걸 고려해볼 것!
let Child = memo(
  function() {
    useEffect(() => {
      console.log("다시 렌더링 되는지 체크");
    })
    return (
      <div>
        테스트용 자식임
      </div>
    )
  }
  
) 

function Cart() {
  let [tst, setTst] = useState(0);
  const cartItems = useSelector(state => state.cartItems.value)
  const dispatch = useDispatch();
  // 얘는 걍 data 체크용
  useEffect(() => {
    console.log(cartItems);
  }, [])
  
  const testFunc = () => {
    console.log("얘는 useMemo 사용")
  }

  // useEffect랑 유사하다, dependency를 []로 비워두면 이 컴퍼넌트가 로딩 될 때만 실행 해주며,
  // state를 dependency에 넣어주면, 그 state, props가 변할 때에만 실행 해 줌
  // useMemo(() => { return 함수(); }, []) 이 형태로 사용함
  // useEffect와의 차이?
  // => useMemo는 랜더링 중에 실행 되므로, 그 외의 side Effect에 대해서는 useEffect를 쓰는 것 
  useMemo(() => testFunc(), []);

  const reRender = () => {
    setTst(tst+1);
  }

  return(
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제?</th>
          </tr>
        </thead>
        <tbody>
          {/* React에서 태그 반복은 {} 안에다가 변수명.map(() => return 태그들) 
          이 방법을 사용해서 구현한다!*/}
          {cartItems.map((cartItem, idx) => {
            return <tr key={idx}>
              <td>{idx+1}</td>
              <td>{cartItem.name}</td>
              <td>{cartItem.count}</td>
              <td>
                <Button variant='success' style={{fontSize: '10px', marginRight: '5px'}} onClick={() => dispatch(increment(cartItem.id))}>+</Button>
                <Button style={{fontSize: '10px'}} onClick={() => dispatch(decrement(cartItem.id))}>-</Button>
              </td>
              <td>
                <Button variant='warning' style={{ fontSize: '10px' }} onClick={() => dispatch(deleteItem(cartItem.id))}>X</Button>
              </td>
            </tr>
          })}
     
        </tbody>
      </Table>
      <div>
        {tst}
        <button onClick={() => reRender()}>재렌더링용</button>
      </div>
      <Child></Child>
    </div>
  )
}


export default Cart;