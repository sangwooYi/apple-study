import { Card, Button } from 'react-bootstrap';


function CardComp(props) {
  return(
    <div className="mx-3">
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.data.img} />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.cost}원
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default CardComp;