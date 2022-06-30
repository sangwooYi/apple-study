import {useState, createContext} from 'react';
import './App.css';
import NavbarComp from './NavbarComp';
import CardList from './CardList';
import About from './components/About';
import Event from './components/Event';
import Detail from './components/Detail';
import Cart from './components/Cart';
import baseDatas from './data';
import { Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';


// state를 보관할 수 있는 Context를 만드는것!
/**
 *  Conext API 쓰는 방법 4 step
 *  1. createContext()를 이용하여 context를 하나 선언해 준다. 
 * (export 해주어야 함, export let 변수명 = createContext(); 이렇게 해주면 됨)
 *  2. 컨텍스트를 공유할 하위 컴퍼넌트를 컨텍스트명.Provider 태그로 감싸준다
 *  3. 공유할 State들을 .Porvider 태그에 value={{ 공유할 state1, state2 ..}} 
 *  value 속성에 위와 같이 넣어 준다
 *  4. 하위 컴퍼넌트에서 import 해준후 useContext(컨텍스트명) 를 선언해주면 끝!
 */
export let context1 = createContext();

function App() {

  let [cardDatas, setCardDatas] = useState(baseDatas);
  let [detailData, setDetailData] = useState({});
  let [btnCount, setBtnCount] = useState(0);
  // Context API 테스트용! (props 없이 하위 컴퍼넌트와 데이터를 공유할 수 있게 해주는 
  // 리액트의 기본 문법!! 성능 이슈 + 그닥 편하지 않아서 실제로 잘 쓰지는 않는다. (보통은 Redux를 씀))
  let [contextTest, setContextTest] = useState([10, 11, 12]);

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
        newArr = [...cardDatas, ...newArr];
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
        newArr = [...cardDatas, ...newArr];
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
          {/* Context를 공유할 컴퍼넌트를 이렇게 컨텍스트명.Provider 태그로 감싸주어야 한다! */}
          <context1.Provider value={{contextTest, btnCount}}>
            <Detail detailData={detailData}></Detail>
          </context1.Provider>
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

        <Route path='/cart' element={<Cart></Cart>}>
        </Route>
      </Routes>
    
    </div>
  );
}

export default App;
