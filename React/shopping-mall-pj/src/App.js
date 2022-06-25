import {useState, useEffect} from 'react';
import './App.css';
import NavbarComp from './NavbarComp';
import CardList from './CardList';
import About from './components/About';
import Event from './components/Event';
import Detail from './components/Detail';
import baseDatas from './data';
import { Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

function App() {

  let [cardDatas, setCardDatas] = useState(baseDatas);
  let [detailData, setDetailData] = useState({});

  // state 상위 컴퍼넌트 보내는 것은 Vue에서 prop, emit한것처럼 하면 된다.
  const moveToDetail = (value) => {
    setDetailData(value);
  }

  return (
    // <Route>는 말그대로 라우팅 설정을 하는것 (이것만하면 url치고 들어가는 접근밖에 없다...)
    // <Link>는 특정 링크로 '이동'할 수 있게 해주는 것
    <div className="App">
      <NavbarComp></NavbarComp>
      <Routes>
        {/* v5까지는 component={} 였으나 v6부터는 element={}로 바뀜 */}
        <Route path='/' element={
          <div className="main-bg">
            <CardList cardDatas={cardDatas} moveToDetail={moveToDetail}></CardList>
            {/* class는 className으로 걸고, bootstrap이랑 동일하게 쓰면 된다! */}
          <Button variant="primary" className="mt-3">Primary</Button>
          </div>
          }>
        </Route>
        <Route path='/detail/:id'
         element={
         <div className='main-bg'>
          <Detail detailData={detailData}></Detail>
         </div>
          }
         >
        </Route>
        {/* nest nevigate!  아래처럼쓰면 /about/member Route를 설정한것임 */}
        <Route path='/about' element={<About></About>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
        </Route>

        <Route path='/event' element={<Event></Event>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일 기념 쿠폰 받기</div>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
