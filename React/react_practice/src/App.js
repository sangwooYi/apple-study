// useState, useEffect같은거 쓰려면 import해와야함
import { useState } from 'react'; 
import './App.css';
import Modal from './Modal';
import Search from './Search';
import ClassComponent from './ClassComponent';

function App() {
  // let post = '강남 우동 맛집'
  
  // 리액트에서는 사실 위에처럼 변수를 쓰는게아니라 state에 저장해서 꺼내쓴다!
  // [a, b]에서 a는 state 변수명, b는 a의 setter, state를 변경해주는 함수임

  // state의 경우는 변수와 다르게, 변경되면 자동으로 재렌더링을 해준다.(그래서 쓰는것!)
  let [post, setPost] = useState('기본값');
  let [datas, setDatas] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [dates, setDates] = useState(['2월 17일 발행', '2월 18일 발행', '2월 19일 발행'])
  let [likes, setLikes] = useState([0, 0, 0]);
  let [modalData, setModalData] = useState('');
  let [modalDate, setModalDate] = useState('');
  let [modal, setModal] = useState(false);
  let [addTitle, setAddTitle] = useState('');
  let [text, setText] = useState('');

  // function으로 명시적 선언을 해주면 사용하는곳 뒤에 써도 되지만
  // 얘처럼 표현식으로 쓴경우는 무조건 쓰는곳 이전에 써줘야한다!!! (반드시 기억)
  // JS 호이스팅!!!, 명시적 선언을 한 함수는 전체를 호이스팅해주지만
  // 아래처럼 표현식같은 경우는 undefined상태로 선언만 해주는 상태로 호이스팅해주기 때문!
  const moveDetail = (idx) => {
    setModalData(datas[idx]);
    setModalDate(dates[idx]);
    setModal(true);
  }

  const closeDetail = () => {
    setModal(false);
  }

  const changeData = () => {
    setModalData('여자 코트 추천');
  }

  const findBoard = (value) => {
    // console.log(data);
    datas.forEach((data, idx) => {
      // .indexOf()의 경우는 문자열을 인자로 전달 가능하다!
      // 그럼 전체 문자열에 그 subString이 포함되어있는지 체크 가능! 
      // (있다면 subString이 시작하는 인덱스위치를 반환, 없으면 -1)
      if (data.indexOf(value) !== -1) {
        setModalData(data);
        setModalDate(dates[idx])
        setModal(true);
      }
    })
  }
  
  const saveText = (value) => {
    setText(value);
  }
  
  const addBoard = (event) => {
    event.preventDefault();
    // 일반적으로 빈칸 입력 방지하는 방법! .trim() 사용!
    if (text.trim() !== '') {      
      // 1. 새로운 배열, Object를 만든다. 2. 그걸 setState 메서드에 인자로 넘겨준다 끝!
      const newDatas = [text, ...datas];
      // 이러면 현재 시간이 입력된다, 현재시간 뽑아내는법 기억하기!
      const now = new Date();
      const month = now.getMonth();
      const day = now.getDate();
      const nowDate = `${month}월 ${day}일 발행`
      const newDates = [nowDate, ...dates];
      setDatas(newDatas);
      setDates(newDates);
      // 리액트에서는 input태그 초기화 이렇게 한다!
      // input 태그에 value={} 형태로 선언하고
      // {} 안에는 input.value 값을 state로 선언하여 입력해 주면 bind 된다!
      setText('');
    }
    // JS로는 이렇게 input태그 초기화 한다. input태그의 값은
    // input.value 에 bind 되어 있음
    // const input = document.getElementById('search');
    // input.value = '';
  }
  
  const deleteBoard = (idx) => {
    // 항상 이 step대로 진행!
    let newDatas = [...datas]
    // .splice(a, b, item1, item2 ...) a 인덱스 위치부터 b만큼 삭제 
    // 필요시 itme만큼 인자로 넘겨주면 그만큼 a 인덱스 위치에서 부터 추가 됨)
    newDatas.splice(idx, 1);
    setDatas(newDatas);

    // 비교! .slice는 잘라주는애임 .slice(a, b) a인덱스부터 b인덱스 직전까지를 잘라줌
  }

  // 이렇게 return 안에 html 코드 짜는것을 JSX라고 한다.
  return (
    <div className="App">
      {/* class 가아니라 className으로 적어줘야함 */}
      <div className='black-bg'>
        <h4>블로그임</h4>

        <Search findBoard={findBoard}></Search>
      </div>
      {/* 태그 반복하는 방법!! 
        {} 중괄호 안에다가 array변수.map()을 사용해서 return으로 태그를 return 해준다!
      */}
      {/* v-for 리액트에서 구현하는방법! 그냥 자바스크립트 + JSX 문법인것 */}
      { datas.map((el, idx) => {
        // 주의할 사항! 태그 반복해서 생성할때 반드시 태그에 유니크한 key값을 부여해주어야한다!
        return <div className='list' key={idx}> 
          <h4>{ el }</h4>
          <p>{ dates[idx] }</p>
          {/* map으로 작성한 태그에서, 이벤트 핸들러 다는방법!
            익명함수로 작성 + 호출할 함수를 return하는 형태로 작성 
            보통은 그냥 return 생략해서 (return이 한줄짜리면 return 생략 가능)
            onClick{() => 함수(인자)} 이런식으로 작성한다! 
          */}
          {/* onClick={() => clickBtn(idx)} 랑 똑같다 */}
          <span className='like-btn' onClick={() => {
            return clickBtn(idx)
          }}>
            좋아요👍{likes[idx]}
          </span>
          {/* 일반적으로는 이렇게 이벤트핸들러 달때 return 생략하고 쓴다 (한줄이니까) */}
          <span className='like-btn' onClick={() => moveDetail(idx)}>
            자세히 보기
          </span>       
          <span 
            className='like-btn'
            onClick={() => deleteBoard(idx)}
          >
            글 삭제
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
      <div>
        <form onSubmit={(e) => {addBoard(e)}}>
          <input 
            type='text' 
            className='input-form'
            value={text} 
            onChange={(e) => saveText(e.target.value)}>  
          </input>
          <button>추가추가</button>
        </form>
      </div>
      {/* 이벤트는 아래와 같이 등록한다. */}

      {/* 작명={prop으로 보낼 데이터}  이런 형태로 전달해주며, 여러 prop데이터가 필요한 경우
         아래 처럼 그냥 쭉 쓰면 된다!
         
         리액트에서는 모달창 같은 display block / none 이 필요한경우
         아래처럼 t/f 변수를 이용하여 구현한다! 
         (document.태그.style = 'block'이렇게 직접 써도 당연히 되긴 함)
         */}

      {
        modal == true 
        ? <Modal 
            data={modalData} 
            date={modalDate}
            close={closeDetail} 
            change={changeData}>
          </Modal> 
        : null
      }
      {/* 그냥 <Modal/> 이렇게만 써도 완전 동일하다 */}
      <ClassComponent></ClassComponent>
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

// 컴퍼넌트 문법! (자바스크립트에서 WebComponent랑 같은 역할이다!)
// 3step  
// 1. function을 만든다.(다른 함수 바깥에다가 만들어야 한다.)
// 2. return() 안에다가 html 태그 담기
// 3. 배치할 곳에 <함수명></함수명> 쓰기
/*
  컴퍼넌트 만들면 편한 대표적인 3가지 경우
  1. 반복적인 html을 축약할 때
  2. 큰 페이지들 (특히 리액트에서는 이걸 많이한다)
  3. 자주 변경되는 html UI
*/

// 또한 리액트에서는 이렇게 일반적으로 컴퍼넌트를 별도의 파일로 만들고 
// export, import 사용해서 적용한다!
// function Modal(props) {
//   const closePage = () => {
//     // 하위 컴퍼넌트 => 상위 컴퍼넌트 방향으로 데이터 전달 or 조작하는방법
//     // 1. 상위 컴퍼넌트에서 필요한 함수를 prop해준다
//     // 2. 하위컴퍼넌트에서 필요한 상황에 해당 함수를 props.프랍명 으로 호출해주면 끝!;
//     props.close();
//   }
//   const changeData = () => {
//     props.change();
//   }
//   return (
//     <div className='modal'>
//       <h4>제목: {props.data}</h4>
//       <p>날짜: </p>
//       <p>상세내용: </p>
//       <span className='like-btn' onClick={changeData}>변경변경!</span>
//       <span className='like-btn' onClick={closePage}>닫기</span>
//     </div>
//   )
// }

export default App;
