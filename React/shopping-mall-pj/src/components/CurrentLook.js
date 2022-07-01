function CurrnetLook(props) {


  const resetCurrent = () => {
    props.resetCurrent();
  }

  return (
    <div 
      className='d-flex flex-column align-items-center' 
      style={{position: 'fixed', top: '20px', right: '10px', width: '130px', height: '700px', backgroundColor: 'white', borderRadius: '5px'}}>
      {
        props.currentItem.map((obj, idx) => {
          return <div className='m-2 d-flex' key={idx}>
            <img src={obj.img} height='50px'></img>
            <div className="d-flex flex-column ms-1">
              <span style={{ fontSize: '8px'}}>{obj.title}</span>
              <span style={{ fontSize: '8px' }}>{obj.cost}</span>
            </div>
          </div>
        })
      }
      <button className='btn btn-danger' style={{height:'40px', fontSize: '12px'}} onClick={() => resetCurrent()}>초기화</button>
    </div>
  )
}


export default CurrnetLook;