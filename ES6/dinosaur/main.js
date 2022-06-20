var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//주인공 좌표, 사이즈정보
var dino = {
  x : 10,
  y : 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  jump(){
    //this.y -1만 하면 승천하겠죠 fall도 만드셈
    this.y -= 1;
  },
  fall(){
    if (this.y < 200){
      this.y += 1
    }
  }
}


var img1 = new Image();
img1.src = 'cactus.png';


//장애물 좌표, 사이즈정보

class Cactus {
  constructor(){
    this.x = 600; //x,y는 현재 좌표
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y); 

  }
}



var timer = 0;
cactus여러개 = [];
var animate;
var 점프timer = 0;

function 시간의흐름(){
  animate = requestAnimationFrame(시간의흐름);

  //캔버스 클리어해줘야 다시그리지
  ctx.clearRect(0,0, canvas.width, canvas.height);


  //180프레임마다 스폰
  if(timer % 180 == 0) {
    // console.log(timer)
    var cactus = new Cactus();
    cactus여러개.push(cactus);
  }
  timer++;

  //삭제기능
  cactus여러개.forEach((a, i, object)=>{
    if (a.x < 0) {
      object.splice(i, 1);
    }
  })

  

  cactus여러개.forEach((a)=>{
    a.x -= 2;
    a.draw();
    충돌하냐(dino, a);
  })

  //쩜프는 여기서
  if (점프중 == true){
    dino.jump();
    점프timer++;
  } else if (점프중 == false) {
    점프timer = 0;
    dino.fall()
  }

  if (점프timer > 100){
    점프중 = false;
  }
  

  dino.draw();

  
}


//겜시작
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var cactus = new Cactus();

시간의흐름();




//게임오버
function 충돌하냐(dino,cactus){

  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);

  if ( x축차이 < 0  && y축차이 < 0 ){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animate);
  }
}






var 점프중 = false;

//스페이스바 누르면 
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    점프중 = true;
  }
})


