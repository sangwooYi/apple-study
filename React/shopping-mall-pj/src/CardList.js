import { useState } from 'react';
import CardComp from './components/CardComp';

function CardList(props) {

  return (
    <div className="d-flex justify-content-center pt-5">
      {
        props.cardDatas.map((data, idx) => {
          return <CardComp data={data} key={idx}></CardComp>
        })
      }
    </div>
  )

}

export default CardList;

