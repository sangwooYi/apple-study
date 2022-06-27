import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

// 참고 과거에 useEffect 없던 시절 아래와 같이 LifeCycle 코드를 작성했었음

/*  
  class Detail extends React.component {
    componentDidMount(){
      // 컴퍼넌트 mount 될 때 실행 (해당 페이지로 진입하는 시점)
    }
    
    componentDidUpdate(){
      // 컴퍼넌트가 update될 때 실행
    }

    componentWillUnmount(){
      // 컴퍼넌트 unmount 될때 실행
    }
  }

*/


function Detail(props) {
  // url에서 parameter를 사용하는 방법 useParams
  // /:id 로 선언해놓았으니 {id} 로 빼오는 것!
  let {id} = useParams();
  let [count, setCount] = useState(0);
  let [btnYn, setBtnYn] = useState(true);
  let [effectTest, setEffectTest] = useState(0);
  let [text, setText] = useState('');

  const closeBtn = () => {
    setBtnYn(false);
  }

  const checkInput = (event) => {
    const inpText = event.target.value;
    setText(inpText);
  }


  useEffect(() => {
    // JS에서 숫자인지 아닌지 판별법
    // isNaN(체크할애) 사용! 숫자면 false를, 숫자가 아니면 true를 반환! (NaN은 Not a Number라는 말) 
    if (isNaN(text)) {
      console.log("아니 숫자만 입력해 ㅡㅡ");
    }
    
  }, [text])

  // useEffect 코드의 특징: 이 페이지가 렌더링이 완료 되고 나서 출력된다.
  // 이 특징을 이용하면 useEffect를 적절하게 사용 가능!~
  // 일반적으로 1)복잡한 연산, 2)서버에서 데이터 받아오는 코드  3)타이머 장착 등에 많이 쓰인다.
  useEffect(() => {
    console.log(`현재 count: ${count}`)
  }, [count])
  
  
  // [] 즉, dependecny를 그냥 [] 이렇게 설정해두면 mount 될때만 실행됨
  // [] 생략하면 모든 update 변화에 대해 전부 체크함! 따라서 코드 의도에 따라 선택!
  useEffect(() => {
    // 여기에 적은 코드는 이 페이지가 mount or update 될때 실행
    // 참고 <React.StrictMode> index.js에 설정되어있으면 
    // 진입할 때 2번씩 출력된다(실제 배포되면 1번만실행 for 개발단에서 디버깅 용)
    // setTimeout(() => {실행할 코드}, 시간term (ms 단위))
    setTimeout(() => {
      setBtnYn();
    }, 2000)
    console.log("gkgkg");

  }, [])

  useEffect(() => {
    // [] 생략하면 모든 변화요소에 대해 실행됨
    // 위처럼 []를 명시해 두면, mount 단계에서만 실행 됨!
    console.log("얘는 어떤 요소가 변하던지 출력함")
    // clean up function, 속해있는 useEffect가 실행 되기 전에 먼저 실행되는 부분!
    // + unmount 때도 1회 실행됨. 따라서 unmount될때만 실행할 코드를 작성 가능
    return () => {
      // 얘는 이 useEffect의 안에서 코드중에서 가장 먼저 출력됨
    }    
  })

  // [] 설정한다면 mount때에만 실행되며 
  // 이 안에 clean up function을 설정시에는, 이 코드는 unmount될때 실행
  useEffect(() => {

    let a = setTimeout(() => {}, 1000);
    return () => {
      // 여기에 작성한 코드는 unmount 때 실행 됨 (당연히 mount 단계에서도 
      // 이 useEffect 실행되기 직전에도 실행됨..) 
      console.log('👍');
      // 이렇게 보통 타이머 초기화 같은 코드를 작성할 때 
      // clean up function 부분에 코드를 작성함!
      clearTimeout(a);
    }
  }, [])

  // [] 에는 여러개 요소를 넣을 수 있으며, Vue에서 watch와 유사한 기능임!
  // 해당 변수가 변할 때만 실행 되도록 설정하는 dependency
  useEffect(() => {
    console.log(`effectTest가 바뀔때만 실행 될걸?? ${effectTest}`)
  }, [effectTest])


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
    <button className='btn btn-primary my-2' onClick={() => setCount(count+1)}>클릭해봐</button>
    <Link to={'/'}>
     <Button variant='primary'>돌아가기</Button>
    </Link>
    <Button variant='warning' onClick={() => setEffectTest(effectTest+1)}>이건 이펙트 테스트용</Button>
    { 
      btnYn 
      ? <button className='btn btn-warning'>2초뒤 사라짐 ㅅㄱ</button>
      : null
    }

    <input className='input-form' onChange={(e) => checkInput(e)}></input>
  </div>
  ) 
}

export default Detail;