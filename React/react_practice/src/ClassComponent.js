// 예전에는 클래스 컴퍼넌트로 작성했다. 그 예시
import React from 'react';

// 그냥 이렇게 클래스 구조에, contsructor에 props, state
// render에다가 JSX return 해주는 구조를 잡는 것처럼 형태가 다를 뿐!
class ClassComponent extends React.Component {
  constructor() {
    super();
    // 클래스 컴퍼넌트에서는 useState대신 this.state를 constructor 내부에서 선언
    this.state = {
      value: 'Kim',
    };
    // 클래스 컴퍼넌트에서는 this.setState를 메서드에서 쓰려면 이렇게 바인드를 해주던지,
    // 메서드를 화살표 함수로 선언해주어야 함! (this의 바인딩 때문에 발생하는 문제! JS 문법문제임!)
    this.changeValue = this.changeValue.bind(this);
  }
  //  말그래도 클래스 문법에서의 메서드 선언임!
  // 메서드를 이렇게가 아니라 화살표 문법으로 선언해야함!
  /*
    이렇게 작성하면 constructor에서 .bind(this); 로 바인딩 안해주어도 됨!
    changeValue = () => {
      // arrow function은 this를 그냥 가장 바깥의 this를 그대로 쓰기 때문
    }
    아래처럼 function 형태로 선언하면 this가 새로 정의되어버려
    의도된 this.state, this.setState를 쓸 수 없게 되어버리는것!
    (따라서 이떄는 위 15줄 처럼 .bind(this)를 일일히 써줘야함)
  */
  changeValue() {
    if (this.state.value === 'Kim') {
      this.setState( { value: 'Park' } );
    } else {
      this.setState( { value: 'Kim' } );
    }
  }

  render() {
    return (
      <div>
        {this.state.value}
        {/* function 문법과 다르게 이벤트핸들러 메서드도 그냥 this.메서드 이렇게 달아주어야 함!
          () => this.메서드 이러면 오히려 this가 이상한델 가르키므로 안된다!
        */}
        <button onClick={ this.changeValue }>바꿔 바꿔~</button>
      </div>
    )
  }
}

export default ClassComponent;