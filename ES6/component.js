/*
  Vue나 React에서 봤던것처럼 커스텀 태그를 만드는 것!

  doc 참고!
  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

*/
// 1. HTMLElement를 extends하여 만든 class를 만든다.
// 2. customElements.define(태그명, 클래스) 로 선언한다 끝!
class WebComponentTest extends HTMLElement {
  // 내가 커스텀한 태그가 HTML에 장착될 때 적용된 코드를 적는 부분!!
  connectedCallback() {
    // 대신 React처럼 JSX가 아니라 이렇게 순수 JS코드로만 짜야한다!
    // this는 내가 커스텀한 태그를 가리킴
    // 이렇게 innerHTML로 작성하거나(비추)
    this.innerHTML = `<h4>와 개신기하네 ㅡㅡ??</h4>`


    // 정석대로 .createElement()로 생성하고 this.appendChild()로 추가
    // 요게 정석임!!
    const img = document.createElement('img')
    img.src = 'https://picsum.photos/200/200'

    this.appendChild(img);

    // 파라미터 문법도 구현 가능, 이렇게 props를 할 수 있다.
    let name = this.getAttribute('name');
    console.log(name);
    console.log(this.getAttribute('do'));

  }

  // 변화를 감지할 attribute를 설정하는 것
  static get observedAttributes() {
    return ['name'];
  }
  attributeChangedCallback() {
    // 위에서 감지 설정한 attribute 변경시 실행할 코드 
    console.log(this.getAttribute('name') + '으로 변경!');
  }
  // 위 코드대로 하면, 'name'으로 선언된 속성값이 바뀔때마다 attributeChangeCallback()을 실행
}
customElements.define('custom-input',WebComponentTest);