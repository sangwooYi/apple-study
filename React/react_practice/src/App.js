// useState, useEffect같은거 쓰려면 import해와야함
import { useState } from 'react'; 
import './App.css';

function App() {
  // let post = '강남 우동 맛집'
  
  // 리액트에서는 사실 위에처럼 변수를 쓰는게아니라 state에 저장해서 꺼내쓴다!
  // [a, b]에서 a는 state 변수명, b는 a의 setter, state를 변경해주는 함수임

  // state의 경우는 변수와 다르게, 변경되면 자동으로 재렌더링을 해준다.(그래서 쓰는것!)
  let [post, setPost] = useState('기본값');
  let [datas, setDatas] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [likes, setLikes] = useState([0, 0, 0]);
  // 이렇게 return 안에 html 코드 짜는것을 JSX라고 한다.
  return (
    <div className="App">
      {/* class 가아니라 className으로 적어줘야함 */}
      <div className='black-bg'>
        <h4>블로그임</h4>
      </div>
      {/* 태그 반복하는 방법!! 
        {} 중괄호 안에다가 array변수.map()을 사용해서 return으로 태그를 return 해준다!
      */}
      {/* v-for 리액트에서 구현하는방법! 그냥 자바스크립트 + JSX 문법인것 */}
      { datas.map((el, idx) => {
        return <div className='list' key={idx}> 
          <h4>{ el }</h4>
          <p>2월 17일 발행</p>
          {/* map으로 작성한 태그에서, 이벤트 핸들러 다는방법!
            익명함수로 작성 + 호출할 함수를 return하는 형태로 작성 
            보통은 그냥 return 생략해서 (return이 한줄짜리면 return 생략 가능)
            onClick{() => 함수(인자)} 이런식으로 작성한다! 
          */}
          <span className='like-btn' onClick={() => {
            return clickBtn(idx)
          }}>
            좋아요👍{likes[idx]}
          </span>
        </div>
      })}
      {/* 태그에 변수를 넣을때는 이렇게 {}안에 변수를 넣어주어야 함 
        데이터 바인딩이라고 함 data binding
      */}
      {/* 스타일 속성은 style={ { ... } }로반드시 해야한다, 중괄호 안에 object형태로
        + camelCase로 작성해야 함
      */}
      <h4 style={ { backgroundColor: 'white', padding: '10px'} }>{ post }</h4>
      <button onClick={changeSort}>정렬하자정렬</button>
      {/* 이벤트는 아래와 같이 등록한다. */}
    </div>
  );
  function clickBtn(index) {
    // 배열 useState 수정하는법, map으로 내가 원하는 수정된 배열을 만든다.
    // or 그냥 deepCopy 해서 그 요소만변경! (이게 더 쉽지..)
    // 그걸 setState (여기선 setLikes()) 안에 넣어준다! 끝

    // object, array 변경하는방법 => 변경될 애를 새로 만든다. => 그걸 setState에 넣어준다! 
    // 항상 투 스텝으로 해야 된다는걸 기억하자!!
    // const newLikes = likes.map((num, idx) => {
    //   if (idx === parseInt(index)) {
    //     return (num+=1);
    //   } else {
    //     return num;
    //   }
    // })
    let newLikes = [...likes]
    newLikes[index]++;
    setLikes(newLikes);
  }
  function changeSort() {
    // const newDatas = datas.map((data, idx) => {
    //   if (idx === 0) {
    //     return '여자 코트 추천';
    //   } else {
    //     return data
    //   }
    // })
    // array, object state 변경하는 2step
    // 1. deepCopy를해서 내가 원하는대로 변경한다.  2. setState에 해당값을 전달해준다! 끝!
    let newDatas = [...datas]
    newDatas.sort()
    // 기본적으로 JS 정렬은 문자기준 오름차순 정렬,
    // 숫자거나, 명시해서 작성하려면
    /*
      요게 오름차순,  a > b일때 -1, 반대일때 1로하면 내림차순이 됨!
      .sort((a, b) => {
        if(a > b) {
          return 1;
        } else if(a < b) {
          return -1;
        } else {
          return 0;
        }
      })
    */
    setDatas(newDatas);
  }
}




export default App;
