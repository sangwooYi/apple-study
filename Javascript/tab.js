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
const test = document.getElementById('test');
const size = document.getElementById('size');


// html 생성법1 (이게 더 빠르긴 함, 근데 요새 속도에서는 큰 의미 X)
const opt = document.createElement('option');
opt.value = 'pants';
opt.innerText = '바지';
test.appendChild(opt);

// html 생성법2
const opt2 = '<option value="cardigan">가디건</option>'
// beforebegin 요소 앞에
// afterbegin 요소 안의 첫번쨰 child로 
// beforeend 요소 안의 마지막 child로 
// afterend 요소 뒤에
test.insertAdjacentHTML('beforeend', opt2);

// 보통 select 옵션에서 이벤트는 change로 잡는다, input 태그는 'input' 이벤트 사용!
test.addEventListener('change', (event) => {
  // select에서 선택한 option이 뭔지 체크하는 방법
  console.log(event.target.value)
  if (event.target.value === 'shirt') {
    size.classList.add('show');
    size.classList.remove("hide");
    
    size.children[0].innerText = '95';
    size.children[0].value = '95';
    size.children[1].innerText = '100';
    size.children[1].value = '100';
    size.children[2].innerText = '105';
    size.children[2].value = '105';

  } else if (event.target.value === 'hat') {
    size.classList.add('show');
    size.classList.remove("hide");
    size.children[0].innerText = '소';
    size.children[0].value = '소';
    size.children[1].innerText = '중';
    size.children[1].value = '중';
    size.children[2].innerText = '대';
    size.children[2].value = '대';
  } else if (event.target.value === 'pants') {
    size.classList.add('show');
    size.classList.remove("hide");
    size.children[0].innerText = 'S';
    size.children[0].value = 'S';
    size.children[1].innerText = 'M';
    size.children[1].value = 'M';
    size.children[2].innerText = 'L';
    size.children[2].value = 'L';

  } else {
    size.classList.add('hide');
    size.classList.remove('show');

  }
});

var pants = ['28', '30', '32'];
var shirts = ['95', '100', '105'];
const sendSelect = document.getElementById('send');
const sSize = document.getElementById('s-size');
sendSelect.addEventListener('change', (event) => {
  // 초기화 필요!
  sSize.innerHTML = '';
  if (event.target.value === 'pants') {
    pants.forEach((pant, idx) => {
      console.log(pant, idx);
      const opt = document.createElement('option');
      opt.value = pant;
      opt.innerText = pant;
      sSize.appendChild(opt);
    });
    sSize.classList.add('show');
    sSize.classList.remove('hide');
  } else if (event.target.value === 'shirt') {
    shirts.forEach((shirt) => {
      const opt = document.createElement('option');
      opt.value = shirt;
      opt.innerText = shirt;
      sSize.appendChild(opt);
    });
    sSize.classList.add('show');
    sSize.classList.remove('hide');
  } else {
    sSize.classList.add('hide');
    sSize.classList.remove('show');
  }
});

// 참고, forEach는 단순 반복, map은 반복을 통해 새로운 배열을 반환
const newPants = pants.map((pant) => {
  // 숫자 => 문자 변환은 숫자.toString() 혹은 String(숫자); 사용
  // 반대는 Number(문자) 혹은 정수면 parseInt(문자)//실수면 parseFloat(문자) 사용
  return(parseInt(pant) + 30).toString();
})
console.log(newPants);

const ttt = {'name': '상우', 'girlfreind': '유정'};

// for in 반복문을 통해서 object도 반복할 수 있다!
for (let key in ttt) {
  // key값을 순회함, 이걸 통해 value값도 끄집어 낼 수 있다.
  console.log(key);
}
// iterable한 array같은 객체들은 for of를 사용 가능
for (let shirt of shirts) {
  console.log(shirt);
}

// 즉 단순 반복의 종류 
// for, for in (non-iterable) ,  for of (iterable), forEach 이렇게가 존재
// 편한거 쓰면 된다! 