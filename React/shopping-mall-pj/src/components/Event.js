import { Outlet } from "react-router-dom";


/**
 * 참고! 
 * localStorage 사용법
 * 
 * localStorage.setItem(key, value)
 * localStorage.getItem(key)
 * localStorage.removeItem(key)
 * localStorage.clear()
 * 
 * 만약 Array/Object 를 저장하려면 JSON 형태로 바꾸어주어야함 (읽을때는 반대로 파싱)
 * 따라서 원래 => JSON 으로는 JSON.stringify(데이터)
 *        JSON => 원래는 JSON.parse(JSON데이터)
 * 
 */

function Event() {
  return (
    <div>
      {/* nest nevigate로 구현시에는 이렇게 Outlet을 통해 같이 보여주는게 가능한것! */}
      <h3>오늘의 이벤트!!@</h3>
      <Outlet></Outlet>
    </div>
  )
}


export default Event;