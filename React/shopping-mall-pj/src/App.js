import {useState, useEffect} from 'react';
import './App.css';
import NavbarComp from './NavbarComp';
import CardList from './CardList';
import { Navbar, Button } from 'react-bootstrap';


function App() {

  let [cardDatas, setCardDatas] = useState([{title: '청소기', cost: 10000}, {title: '컴퓨터', cost: 20000}]);


  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <CardList cardDatas={cardDatas}></CardList>
      {/* class는 className으로 걸고, bootstrap이랑 동일하게 쓰면 된다! */}
      <Button variant="primary" className="mt-3">Primary</Button>
    </div>
  );
}

export default App;
