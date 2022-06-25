import { Card, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom'

function CardComp(props) {
  const moveToDetail = (value) => {
    props.moveToDetail(value);
  }

  return(
    <div className="mx-3">
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.data.img} />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.cost}원
        </Card.Text>
        {/* Link에서 to="경로" 이 경로대로 이동한다.  */}
        <Link to={`/detail/${props.data.id}`}>
          <Button variant="primary" onClick={() => moveToDetail(props.data)}>Detail</Button>
        </Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default CardComp;