/*
  게임 만드는 법
  1. 화면에 네모, 원 그릴 수 있어야 함 (canvas 태그)
  2. 프레임마다 코드 실행이 가능해야 함 (애니메이션)
  3. collision check (충돌 체크) 가능해야 함
*/

const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d');
const img1 = new Image();
const dinoImg = new Image();
dinoImg.src = './dinosaur/dinosaur.png'
img1.src = './dinosaur/cactus.png'
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // 색상
    ctx.fillStyle = 'green';
    // 사각형을 해당 위치에, 해당 크기로 (x, y, width, height)
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(dinoImg, this.x, this.y);
  }
}
dino.draw();


class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 30;
    this.height = 80;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(img1, this.x, this.y);
  }
}
const cactus = new Cactus();
cactus.draw();

let jumping = false;
let timer = 0;
let num = 0;
let count = 0;
const cactuses = [];
function frameWork() {
  // 인자로 넘긴 함수를 1초에 60번 지속적으로 실행해줌
  const animation = requestAnimationFrame(frameWork);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 매번 clear를 해줘야 잔상이 남지 않는다.
  if (timer % 80 === 0) {
    let cactus = new Cactus();
    cactuses.push(cactus);
  }
  cactuses.forEach((cact, idx) => {
    cact.x -= 4;
    cact.draw();
    if(isCollision(dino, cact)) {
      // 애니메이션 중단하는 법
      cancelAnimationFrame(animation);
    }
    if (cact.x < 0) {
      // 자바스크립트에서, 요소삭제하는법! splice에서 세번쨰인자(추가할 요소)는 선택사항!
      // 세번째 인자 없으면 그냥 삭제만한다.
      cactuses.splice(idx, 1);
      
    }
  })
  if (timer % 8 === 0) {
    num++;
  }
  score.innerText = num;
  
  if (jumping) {
    count++;
    if (count <= 35) {
      dino.y -= 4;
    } else if (count <= 70) {
      dino.y += 4;
    } else {
      jumping = false;
      count = 0;
    }

    
  }
  dino.draw();
}
frameWork();

document.addEventListener('keydown', (e) => {
  // 직접 e.code에 어떤 값이 오는지 확인하고 조건 걸면 된다.
  if (e.code === 'Space') {
    jumping = true;
  }
})

function isCollision(dino, cactus) {
  let delX = cactus.x - (dino.x + dino.width);
  let delY = cactus.y - (dino.y + dino.height);

  if (delX < 0 && delY < 0) {
    return true;
  }
  return false;
}
