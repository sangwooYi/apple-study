const content = document.getElementById('content');
// const localArr = [];
// // cart라는 이름의 [] localStorage에 저장
// localStorage.setItem('cart', JSON.stringify(localArr));

let time = 1;


let products = [
  {price: 70000, title: 'SM5'},
  {price: 50000, title: 'avante'},
  {price: 55000, title: 'sonata'}
];

// 이거 ES6 문법이긴 한데 깊은복사할때 너무 편하다 ㅠㅠ
let proto = [...products];


// price기준 오름차순

function sortPrice(arr) {

  arr.sort((a, b) => {
    // 이것 잘 기억하자. 자바에서 compare 이용해서 정렬하는것과 유사
    // 즉 정렬할때, 비교 대상을 여기에 넣어주면 된다.
    if (a.price > b.price) {
      return 1;
    } else if (a.price < b.price) {
      return -1;
    } else {
      return 0;
    }
  });
}
function sortTitle(arr) {
  arr.sort((a, b) => {
    // 이름 순으로 내림 차순, 근데 그냥하면 소문자가 더 큰값을 가지므로 
    // 같은 알파벳이라도 소문자가 더 뒤에 정렬됨. 이거 싫으면 입력된값을 가공해야함 => 전부 한쪽으로 통일 
    // .toLowerCase() 혹은 .toUpperCase() 를 통해 한쪽으로 통일시켜버린다음 비교하기!
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return -1;
    } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  })
}
// 동적 생성 .forEach 써도 된다.
for (let i = 0; i < 3; i++) {
  makeCard(products[i].title, products[i].price, i);
}
const btn = document.getElementById('more')
btn.addEventListener('click', () => {
  getMoreData(time);
  time++;
  if (time > 2) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
});
// 가격순
document.getElementById('sort').addEventListener('click', () => {
  sortPrice(products);
  // 초기화 후 다시 짜는 방식
  content.innerHTML = '';
  products.forEach((product, idx) => {
    makeCard(product.title, product.price, idx);
  });
});

// 타이틀 순
document.getElementById('sort2').addEventListener('click', () => {
  sortTitle(products);
  content.innerHTML = '';
  products.forEach((product, idx) => {
    makeCard(product.title, product.price, idx);
  });
});

// filter 
document.getElementById('form').addEventListener('submit', () => {
  const cost = document.getElementById('cost');
  const filtProduct = products.filter((product) => {
    return product.price <= Number(cost.value);
  });
  content.innerHTML = '';

  filtProduct.forEach((product) => {
    makeCard(product.title, product.price);
  });
  // 이러면 필터링 이후에도 가격순 정렬, 이름 정렬 가능해짐;
  products = filtProduct;
});

document.getElementById('return').addEventListener('click', () => {
  products = [...proto];
  content.innerHTML = '';
  products.forEach((product) => {
    makeCard(product.title, product.price);
  });
});


function getMoreData(i) {
  if (i === 1) {
    fetch('https://codingapple1.github.io/js/more1.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((element, idx) => {
        const obj = {price: element.price, title: element.title}
        makeCard(element.title, element.price, idx+3);
        products.push(obj);
        proto.push(obj);
    
      })
    });
  } else if (i === 2) {
    fetch('https://codingapple1.github.io/js/more2.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((element, idx) => {
        const obj = {price: element.price, title: element.title}
        makeCard(element.title, element.price, idx+6);
        products.push(obj);
        proto.push(obj);
      })
    });
  }
}
// 항상 단순 반복되는 코드는 이렇게 모듈화 하는 습관을 들일 것!
function makeCard(title, price, idx) {
  const div = document.createElement('div');
  div.className = "col-sm-4 custom-card";
  const img = document.createElement('img');
  img.src = "https://via.placeholder.com/600";
  img.className = "w-100";
  div.appendChild(img);

  const h5 = document.createElement('h5');
  h5.innerText = title;
  div.appendChild(h5);
  const p = document.createElement('p');
  p.innerText = `가격: ${price}`;
  div.appendChild(p);

  const btn = document.createElement('button');
  btn.className = 'buy btn btn-primary mb-2';
  btn.innerText = '구매';
  // 동적으로 생성하는 요소에 이벤트 달아야할 때는
  // 만들때 속성으로 달아야한다! 꼭 기억!
  btn.id = idx;
  // 이렇게! onscroll onsubmit oninput onchange 전부 존재!
  btn.onclick = () => {
   // 와 이게 찍히네. 기본적으로 지연이 없다면 위에서 아래로 진행되므로
   console.log(div.children[1]);
   const tit = div.children[1].innerText;
   
   let tmpArr = JSON.parse(localStorage.getItem('cart'));
   // null인 경우 [] 선언
    if (tmpArr == null) {
      tmpArr = [];
    }

    //JS에서 배열에 데이터 중복 저장 안되게 하려면 이렇게
    if (tmpArr.indexOf(tit) === -1) {
      tmpArr.push(tit);
    }
   
   localStorage.setItem('cart', JSON.stringify(tmpArr));
   console.log(localStorage.getItem('cart'));
  }
  div.appendChild(btn);

  content.appendChild(div);
}
