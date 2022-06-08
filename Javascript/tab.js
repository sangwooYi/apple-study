// 요소 추가하기
const ul = document.getElementById('list');
const li = document.createElement('li');
li.innerText = 'TestTest';
li.className = 'tab-button';
ul.appendChild(li);

const container = document.getElementById('container');

const div = document.createElement('div');
div.innerHTML = '<p>안녕</p>';
div.className = 'tab-content';
container.appendChild(div);

const lists = document.querySelectorAll('.tab-button');
const tabs = document.querySelectorAll('.tab-content');


// 오 이렇게 이벤트 걸면 각각 걸리네!! (이거 사실 ES6 문법이긴 함)
// 이렇게 코드 짜면 위처럼 요소가 추가 되도 동일하게 기능이 적용된다(이런게 확장성 좋은 코드!)
lists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    showContent(idx); 
  })
});

function showContent(n) {
  for (let i = 0; i < tabs.length; i++) {
    if (n == i) {
      // show, orange 처리  
      lists[i].classList.add('orange');
      tabs[i].classList.add('show');
    } else {
      // show, orange 삭제
      lists[i].classList.remove('orange');
      tabs[i].classList.remove('show');
    }
  }
}

