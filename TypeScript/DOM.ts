// DOM ts로 조작하기

const title = document.getElementById('title');
// title.innerText = '바바바';  // 그냥 하면 null 가능성이 있어서 에러를 발생시킨다.

// 따라서 이렇게 null 체크를 반드시 해주어야 한다.
// if (title !== null) {
//   title.innerText = '봐봐'
// }

// 근데 이방법을 더 권장함, document 자체가 HTMLElement의 인스턴스이므로 가능한것
// 타입스크립트를 사용해서 DOM 조작시에는 반드시 type narrowing 해주어야 한다는것이 핵심!
if (title instanceof HTMLElement) {
  title.innerText = '하하하';
}

/**
 * a 태그는 HTMLAnchorElement
   img 태그는 HTMLImageElement
   h4 태그는 HTMLHeadingElemen 이렇게 정확하게 지정해야 태그의 속성을 변경할 수 있다.
   button 태그는 HTMLButtonElement  
   이름 읽어보면 대충 어떤 태그 속성을 위한 클래스인지 알 수 있음.
 * 
 */
// querySelector 안에는 css 선택자를 써서 지정해준다.
let link = document.querySelector('#link');
if (link instanceof HTMLAnchorElement) {
  link.href = 'https://kakao.com';
}

const btn = document.getElementById('btn');
// ?. 이것도 유용하게 쓸 수 있다. 
// a?.ㅁ 에서 a 안에 ㅁ라는 속성 or 메서드가 없다면 undefined를 자동으로 뱉어 주는 역할
// a has ㅁ ? a.ㅁ : undefined 요런 느낌의 로직이라 생각하면 됨
btn?.addEventListener('click', () => {
  console.log("클릭클릭");
})

// 숙제
const img = document.getElementById('image');
// innerText나 innerHTML이 아닌, 태그의 속성을 건드리고 싶으면 이렇게 구체적인 클래스를 써주어야 함
if (img instanceof HTMLImageElement) {
  img.src = 'new.jpg';
}


const navers = document.querySelectorAll('.naver');

// 그냥 forEach 써..
navers.forEach((tag :Element, idx :number) => {
  if (tag instanceof HTMLAnchorElement) {
    tag.href = 'https://kakao.com';
  }
})