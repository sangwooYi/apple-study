import {useState, createContext, useEffect, lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import './App.css';
import NavbarComp from './NavbarComp';
import CardList from './CardList';
import About from './components/About';
import Event from './components/Event';
import Detail from './components/Detail';
import CurrnetLook from './components/CurrentLook';
import baseDatas from './data';
import { Button } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// lazy import!
/*
  스피링에서 feth.lazy 랑 유사한 개념
  lazy를 사용하여 import 요청한 컴퍼넌트는, 그 컴퍼넌트가 필요해 질 때 불러옴!
  (웹페이지 사이즈가 커지면, 성능적으로 더 효율적인 설계가 가능한것!)
  주의할것은 import에 쓸 경로에 .js 같이 확장자명을 생략하면 안된다.
  
  단점은 lazy로 import한 컴퍼넌트로 들어갈 때 로딩 시간이 발생한다는것.
  => Suspense 태그로 감싸주어 fallback={로딩중일때 보여줄 태그} 속성을 통해 UX적 보완이 가능함!!!  
  (로딩하는 동안은 fallback 속성에 설정한 태그를 보여줌)
*/
const Cart = lazy( () => import('./components/Cart.js') )



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
  let [btnStatus, setBtnStatus] = useState(true);
  // Context API 테스트용! (props 없이 하위 컴퍼넌트와 데이터를 공유할 수 있게 해주는 
  // 리액트의 기본 문법!! 성능 이슈 + 그닥 편하지 않아서 실제로 잘 쓰지는 않는다. (보통은 Redux를 씀))
  let [contextTest, setContextTest] = useState([10, 11, 12]);
  let [currentItem, setCurrentItem] = useState([]);
  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem('current'));
    if (tmp) {
      setCurrentItem(tmp);
    }
  },[localStorage.getItem('current')])

  useEffect(() => {

    axios.get('https://codingapple1.github.io/userdata.json')
    .then((res) => {
      setCurrentUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
    
  // useQuery(작명, () => { 여기서 AJAX 요청 })'
  // isLoading, error, data를 주로 쓴다 따라서 구조분해할당으로도 많이 씀!
  // let {isLoading, error, data} = useQuery( ... ) 이렇게! 
  // isLoading: 로딩중일떄 T, 완료되면 F,  error: 에러발생시 에러를, 아니면 F반환,  data: 우리가 원하는 데이터 들어있음
  // 이런게 존재한다는것만 알아 두자! (그냥 웹소켓 써두 되고, 굳이 이거 안써도 문제는 없다)
  let result = useQuery('getCurrentUser', () => 
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((res) => {
      return res.data;
    })
  )

  useEffect(() => {
    setTimeout(() => {
      console.log(result.data);
    }, 100)

  }, [])

  // state 상위 컴퍼넌트 보내는 것은 Vue에서 prop, emit한것처럼 하면 된다.
  const moveToDetail = (value) => {
    setDetailData(value);
    let current = JSON.parse(localStorage.getItem('current'));
    if (current == null) {
      let tmp = [value];
      localStorage.setItem('current', JSON.stringify(tmp));
    } else {
      let flag = true;
      
      for (let i = 0; i < current.length; i++) {
        if (current[i].id == value.id) {
          flag = false;
          break;
       }
      }
      if (flag) {
        let newArr = [...current, value];
        localStorage.setItem('current', JSON.stringify(newArr));
      }
    }

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
  const resetCurrent = () => {
    localStorage.removeItem('current');
    setCurrentItem([]);
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
      <NavbarComp currentUser={currentUser}></NavbarComp>
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

        <Route 
          path='/cart' 
          element=
          {
            // lazy로 import한 컴퍼넌트는 Suspense에 fallback 속성을 통해 로딩하는 동안 보여줄 페이지 설정 가능
            <Suspense fallback={<div>로딩중 로딩중</div>}>
              <Cart></Cart>
            </Suspense>
          }>
        </Route>
      </Routes>
      <CurrnetLook currentItem={currentItem} resetCurrent={resetCurrent}></CurrnetLook>
    </div>
  );
}

export default App;
