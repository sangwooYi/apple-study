import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { increment, decrement, deleteItem } from '../features/cartItems';
import { useSelector, useDispatch } from 'react-redux';

function Cart() {

  const cartItems = useSelector(state => state.cartItems.value)
  const dispatch = useDispatch();
  // 얘는 걍 data 체크용
  useEffect(() => {
    console.log(cartItems);
  }, [])

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
    </div>
  )
}


export default Cart;