import {useState, useEffect} from 'react';
import './App.css';
import NavbarComp from './NavbarComp';
import CardList from './CardList';
import baseDatas from './data';
import { Navbar, Button } from 'react-bootstrap';


function App() {

  let [cardDatas, setCardDatas] = useState(baseDatas);


  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <div className="main-bg">
        <CardList cardDatas={cardDatas}></CardList>
        {/* class는 className으로 걸고, bootstrap이랑 동일하게 쓰면 된다! */}
      <Button variant="primary" className="mt-3">Primary</Button>
      </div>
    </div>
  );
}

export default App;
