import { useParams } from 'react-router-dom';

function Detail(props) {
  // url에서 parameter를 사용하는 방법 useParams
  // /:id 로 선언해놓았으니 {id} 로 빼오는 것!
  let {id} = useParams();

  return (
  <div 
    style={{
      color: 'black',
      fontWeight: '800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '500px',
    }}>
    <img src={props.detailData.img} style={{height: '300px', marginTop: '50px'}}></img>
    <p>상품명: {props.detailData.title}</p>
    <p>가격: {props.detailData.cost}</p>
  </div>
  ) 
}

export default Detail;