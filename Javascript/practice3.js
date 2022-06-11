const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const itemList = document.getElementById('item-list');
const tempItemList = itemList.innerHTML;
const cards = document.querySelectorAll('.card-frame');
const wishBox = document.getElementById('wish-box');
const finalCost = document.getElementById('final-cost');
const buyBtn = document.getElementById('buy-btn');
let totalCost = 0;

search.addEventListener('keydown', (event) => {
  // console.log(search.value);
  // 자바스크립트로 엔터 이벤트 거는 방법 ,keyup, keydown 이벤트는 엔터 말고도 다른 키에서도 발생!
  // 따라서 e.key === 'Enter' 일때만 체크해야 내가 원하는 엔터이벤트 쓸 수 있다.
  if (event.key === 'Enter') {
    const keyword = search.value;
    
    const ansArr = resultSearch(keyword);
    // console.log(ansArr);
    itemList.innerHTML = ''
    if (ansArr.length == 0) {
      console.log("??");
      const h4 = document.createElement('h4');
      h4.innerText = '검색결과가 없습니다.';
      itemList.appendChild(h4);
    } else {
      ansArr.forEach((d) => {
        makeCard(d);
      })
    }
  }
});

searchBtn.addEventListener('click', () => {
  const keyword = search.value;
    
  const ansArr = resultSearch(keyword);
  // console.log(ansArr);
  itemList.innerHTML = ''
  ansArr.forEach((d) => {
    makeCard(d);
  })
})


// 다시 검색하면 원래대로
search.addEventListener('input', () => {
  itemList.innerHTML = tempItemList;
})

function resultSearch(word) {
  result = [];
  

  cards.forEach((frame) => {
    temp = {}
    const img = frame.children[0]
    const card = frame.children[1]
    const title = card.children[0].innerText;
    const brand = card.children[1].innerText;
    const cost = card.children[2].innerText;
    // console.log(title, brand);
    // 문자열.indexOf('찾을char 혹은 string') 해당 인자 값이 포함되어있는 애가 있다면
    // 그 문자가 처음 등장하는 index 값을 반환해 준다. 없으면 -1 
    if (title.indexOf(word) !== -1 || brand.indexOf(word) !== -1) {
      temp['imgSrc'] = img.src;
      temp['title'] = title;
      temp['brand'] = brand;
      temp['cost'] = cost;
      temp['word'] = word;
      result.push(temp);
    }
  })
  return result;
}


function makeCard(data) {
  const div = document.createElement('div');
  div.className = 'card-frame';

  // 이미지 추가
  const img = document.createElement('img');
  img.src = data.imgSrc;
  div.appendChild(img);

  // 내용 추가
  const div2 = document.createElement('div2');
  div2.className = 'card-content'

  const span1 = document.createElement('span');
  span1.className = 'fs-20 fw-bold';
  // 하이라이팅! (이것도 모듈화 가능할 듯)
  if (data.title.indexOf(data.word) !== -1) {
    const startIdx = data.title.indexOf(data.word);
    const endIdx = startIdx + data.word.length - 1;
    let prefix = ""
    let postfix = ""
    // 앞부분이 존재할 때
    if (startIdx > 0) {
      for (let i = 0; i < startIdx; i++){
        prefix += data.title[i];
      }
    }
    // 뒷부분이 존재할 때
    if (endIdx < data.title.length-1) {
      for (let i = endIdx+1; i < data.title.length; i++) {
        postfix += data.title[i];
      }
    }
    span1.innerHTML = `${prefix}<span class="highlight">${data.word}</span>${postfix}`

  } else {
    span1.innerText = data.title;
  }

  const span2 = document.createElement('span');
  if (data.brand.indexOf(data.word) !== -1) {
    const startIdx = data.brand.indexOf(data.word);
    const endIdx = startIdx + data.word.length - 1;

    let prefix = ""
    let postfix = ""
    // 앞부분이 존재할 때
    if (startIdx > 0) {
      for (let i = 0; i < startIdx; i++){
        prefix += data.brand[i];
      }
    }
    // 뒷부분이 존재할 때
    if (endIdx < data.brand.length-1) {
      for (let i = endIdx+1; i < data.brand.length; i++) {
        postfix += data.brand[i];
      }
    }
    span2.innerHTML = `${prefix}<span class="highlight">${data.word}</span>${postfix}`
  } else {
    span2.innerText = data.brand;
  }

  const span3 = document.createElement('span');
  span3.innerText = data.cost;

  div2.appendChild(span1);
  div2.appendChild(span2);
  div2.appendChild(span3);
  div.appendChild(div2);

  // 버튼 추가
  const btn = document.createElement('button');
  btn.innerText = '담기';
  btn.className = 'wish-btn';

  div.appendChild(btn);
  div.draggable = 'true';

  // 최종 카드 itemList에 추가
  itemList.appendChild(div);
}


function makeWishCard(data) {

  const div = document.createElement('div');
  div.className = 'wish-card';

  // 이미지 추가
  const img = document.createElement('img');
  img.src = data.imgSrc;
  div.appendChild(img);

  // 내용 추가
  const div2 = document.createElement('div');
  div2.className = 'wish-content';

  const titleSpan = document.createElement('span');
  const brandSpan = document.createElement('span');
  const costSpan = document.createElement('span');
  const countSpan = document.createElement('span');

  titleSpan.innerText = data.title;
  titleSpan.className = 'fw-bold';

  brandSpan.innerText = data.brand;
  brandSpan.className = 'fs-12';

  costSpan.innerText = `가격: ${data.cost}원`;
  costSpan.className = 'fs-12';

  // 이렇게 중간에 태그 끼는거말고는 innerHTML 쓰지말자 ㅠ;
  countSpan.innerHTML = `수량: <input type="number" value=${data.count} min=${0}>개`;
  countSpan.className = 'wish-count';
  
  div2.appendChild(titleSpan);
  div2.appendChild(brandSpan);
  div2.appendChild(costSpan);
  div2.appendChild(countSpan);

  div.appendChild(div2);

  // 장바구니에 추가
  wishBox.appendChild(div);
}

let dragItem;
// wishList에서의 데이터 위치를 rawList의 인덱스를 통해 체크
let rawList = [];
let wishList = [];


// 장바구니에 담는 함수
function checkData(dragItem) {
  if (rawList.indexOf(dragItem) !== -1) {
    const index = rawList.indexOf(dragItem);
    // 해당 물품에서의 수량만 증가 시킴
    wishList[index].count++;

  // 처음 들어온 경우
  } else {
    rawList.push(dragItem);
    // 초기 데이터 세팅
    let tmp = {}
    tmp.imgSrc = dragItem.children[0].src
    const content = dragItem.children[1];
    tmp.title = content.children[0].innerText;
    tmp.brand = content.children[1].innerText;
    tmp.cost = content.children[2].innerText.slice(4, -1);
    tmp.count = 1;

    wishList.push(tmp);
  }
  // console.log(wishList);
}

function changeCount() {
  console.log("제발제발");
}

// 어떤 대상을 드래그했는지 지정
cards.forEach((card) => {
  card.addEventListener('dragstart', (event) => {
    dragItem = event.target;
  });


  // 클릭해도 장바구니에 담기고
  const buyBtn = card.children[2];
  buyBtn.addEventListener('click', () => {
   checkData(card);
   if (wishList.length > 0) {
    wishBox.innerHTML = '';
    let tmpSum = 0;
    wishList.forEach((val) => {
      makeWishCard(val);
      tmpSum += (parseInt(val.cost)*parseInt(val.count));
    })
    const final = tmpSum.toLocaleString();
    finalCost.innerText = `총 ${final}원`;
   }
  })
});

// 목표한 영역에 들어왔을때 발생하는 이벤트
// 해당 영역에 드래그 & 드랍 시켜도 장바구니에 담김

// 우선 dragover로 신호를 보내줘야 drop이 가능해짐
wishBox.addEventListener('dragover', (e) => {
  e.preventDefault(); // 이걸 해줘야, drop 이벤트 사용이 가능해진다.

});
// dragover -> drop 순서로 이벤트 핸들러를 달아주어야 한다. (포함관계가 아니라는 부분에서 주의!)
// dragover 신호가 들어와야 사용 가능한 이벤트, 해당 영역에서 드래그한 객체를 놓았을 때 발생 됨
wishBox.addEventListener('drop', () => {
  checkData(dragItem);
  let tmpSum = 0;
  if (wishList.length > 0) {
    wishBox.innerHTML = '';
    wishList.forEach((val) => {
      makeWishCard(val);
      tmpSum += (parseInt(val.cost)*parseInt(val.count));
    }) 
    const final = tmpSum.toLocaleString();
    finalCost.innerText = `총 ${final}원`;
  }
});

wishBox.addEventListener('input', (event) => {
  
  // 이건 너무 주먹구구식 아니냐 ㅡㅡ
  const title = event.target.parentNode.previousSibling.previousSibling.previousSibling.innerText;
  let tmpSum = 0;
  for (let i = 0; i < wishList.length; i++) {
    if (wishList[i].title === title) {
      wishList[i].count = event.target.value;
    }
    tmpSum += (parseInt(wishList[i].count)*parseInt(wishList[i].cost));
  }
  const final = tmpSum.toLocaleString();
  finalCost.innerText = `총 ${final}원`;
})