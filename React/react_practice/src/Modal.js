// 또한 리액트에서는 이렇게 일반적으로 컴퍼넌트를 별도의 파일로 만들고 
// export, import 사용해서 적용한다!
function Modal(props) {
  const closePage = () => {
    // 하위 컴퍼넌트 => 상위 컴퍼넌트 방향으로 데이터 전달 or 조작하는방법
    // 1. 상위 컴퍼넌트에서 필요한 함수를 prop해준다
    // 2. 하위컴퍼넌트에서 필요한 상황에 해당 함수를 props.프랍명 으로 호출해주면 끝!;
    props.close();
  }
  const changeData = () => {
    props.change();
  }
  return (
    <div className='modal'>
      <h4>제목: {props.data}</h4>
      <p>날짜: {props.date} </p>
      <p>상세내용: </p>
      <span className='like-btn' onClick={changeData}>변경변경!</span>
      <span className='like-btn' onClick={closePage}>닫기</span>
    </div>
  )
}

export default Modal;