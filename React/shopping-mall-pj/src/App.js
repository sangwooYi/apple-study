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
import axios from 'axios';

function App() {

  let [cardDatas, setCardDatas] = useState(baseDatas);
  let [detailData, setDetailData] = useState({});
  let [btnCount, setBtnCount] = useState(0);
  let [btnStatus, setBtnStatus] = useState(true);
  let [dState, setDState] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setDState('end');
    }, 100)
    return () => {
      setDState('');
    }
  }, [detailData])

  // state 상위 컴퍼넌트 보내는 것은 Vue에서 prop, emit한것처럼 하면 된다.
  const moveToDetail = (value) => {
    setDetailData(value);
  }

  async function sendAxios(url) {
    const result = await axios.get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    return result;
  }


  const getDataFromServer = () => {
    if (btnCount == 0) {
      const test = sendAxios(`https://codingapple1.github.io/shop/data2.json`); 
      setBtnCount(btnCount+1);
      test.then((res) => {
        // console.log(res);
        const resData = res;
        let newArr = resData.map((obj) => {
          const newObj = {}
          newObj.id = obj.id;
          newObj.title = obj.title;
          newObj.cost = obj.price;
          newObj.img = `https://codingapple1.github.io/shop/shoes3.jpg`;
          return newObj;
        })
        newArr = [...newArr, ...cardDatas];
        setCardDatas(newArr);
      })
      .catch((err) => {
        console.log(err);
      })
    } else if (btnCount == 1) {
      setBtnCount(btnCount+1);
      axios.get(`https://codingapple1.github.io/shop/data3.json`)
      .then((res) => {
        // console.log(res);
        const resData = res.data;
        let newArr = resData.map((obj) => {
          const newObj = {}
          newObj.id = obj.id;
          newObj.title = obj.title;
          newObj.cost = obj.price;
          newObj.img = `https://codingapple1.github.io/shop/shoes3.jpg`;
          return newObj;
        })
        newArr = [...newArr, ...cardDatas];
        setCardDatas(newArr);
      })
      .catch((err) => {
        console.log(err);
      })   
      setBtnStatus(false);   
    }
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
        
          { 
            btnStatus ? 
            <Button 
              variant="primary" 
              className="mt-3"
              onClick={() => getDataFromServer()}
            >
              데이터 추가
            </Button>
            :
            <Button 
              variant="primary" 
              className="mt-3"
              disabled
            >
              데이터 추가
            </Button>            
          }
          </div>
          }>
        </Route>
        <Route path='/detail/:id'
         element={
         <div className='main-bg'>
          <Detail detailData={detailData} dState={dState}></Detail>
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
