import { Outlet } from "react-router-dom";

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