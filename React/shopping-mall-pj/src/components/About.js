import { useState, useTransition, useDeferredValue } from 'react';
import { Outlet } from "react-router-dom";

/**
 *  useTransition
 *  아래처럼, 렌더링하는데 시간이 오래걸리는데, 태그를 줄일 수 없는경우 사용한다.
 *  (기본적으로는 너무 태그가 많은 페이지를 만드는것 자체를 지양해야한다.)
 * 
 *  사용법
 *  1. 아래처럼 useTransition 선언 [isPending, startTransition] 로 관습적으로 선언함
 *  2. 재렌더링을 자주 유발하는 부분을 startTranstion의 콜백함수로 작성해준다.
 *    
 *  원리는
 *  startTransition에 작성한 콜백함수는 주요 작업이 끝난 이후에 실행해준다. (실행 시점을 미뤄주는것)
 *  isPending은 startTranstion에 작성한 콜백함수가 실행 중인 동안은 True를 반환해주는 변수값 (이걸 통해 UI적 설계가 가능함!)
 */

function About() {
  let [name, setName] = useState('kim');
  let [isPending, startTransition] = useTransition();

  // 얘도 useTransition이랑 비슷한 원리, 대신 변수나 state를 넣어서 선언할 수 있다.
  // useDeferredValue에 명시해준 값은 주요 작업이 마친 이후에 처리가 된다. (늦게 처리해 준다.)
  let deferVar = useDeferredValue(name);

  // JS에서 array를 디폴트값을 부여해서 선언하는 방법 new Array(갯수).fill(디폴트값)
  let test = new Array(8000).fill(0);

  return (
    <div style={{ height: '120vh'}} className='d-flex flex-wrap'>
      <input onChange={(e) =>
        // 재렌더링을 자주 유발시키는 부분을 startTransition의 콜백함수로 작성해주면 된다.
        startTransition(() => {
          {console.log(e.target.value)}
        }) 
      }>
      </input>
      <h3>히히히히히히</h3>
      <Outlet></Outlet>
      {test.map((arr, idx) => {
        return <div style={{fontSize: '6px'}} key={idx}>{name}</div>
      })}
    </div>
  )
}

export default About;