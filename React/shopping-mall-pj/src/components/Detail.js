import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import TabComponent from './TabComponent';
import '../App.css'

function Detail(props) {
  let [tabComp, setTabComp] = useState([<div>탭1</div>, <div>탭2</div>, <div> 탭3</div>]);
  let [sendTab, setSendTab] = useState(<div>탭1</div>);
  let [tabState, setTabState] = useState('');
  // url에서 parameter를 사용하는 방법 useParams
  // /:id 로 선언해놓았으니 {id} 로 빼오는 것!
  let {id} = useParams();

  // styled-components => 컴퍼넌트 스타일을 주입해서 만들게 해주는 라이브러리! 
  // style 태그로 들어가기때문에 CSS 오염을 방지하나, 자칫 JS 코드가 더러워질 염려가 있다. 취향에 따라 선택!
  // let Btn = styled.button`background: ${ props => props.bg }; color: black; padding: 10px; border-radius: 5px;`;

  // 대문자로 시작해서 작명해 줘야 함!
  // let BlueBox = styled.div`background-color: white; padding: 10px;`;
  const changeTab = (idx) => {
    setSendTab(tabComp[idx]);
  }

  useEffect(() => {
    setTimeout(() => {
      setTabState('end');
    }, 150)
    return () => {
      setTabState('');
    }
  }, [sendTab])
  return (
  <div 
    style={{
      color: 'black',
      fontWeight: '800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '800px',
    }}>
    <img src={props.detailData.img} style={{height: '300px', marginTop: '50px'}}></img>
    <p>상품명: {props.detailData.title}</p>
    <p>가격: {props.detailData.cost}</p>
    {/* <Btn bg="purple">??</Btn> */}

    <Nav variant="tabs"  defaultActiveKey="link0" className='mt-3 col-6'>
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={() => changeTab(0)}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1" onClick={() => changeTab(1)}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={() => changeTab(2)}>버튼2</Nav.Link>
      </Nav.Item> 
    </Nav>
    <TabComponent content={sendTab} tabState={tabState}></TabComponent>
  </div>
  ) 
}

export default Detail;