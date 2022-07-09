/**
 *  literal types 
 *  type 자리에 특정 문자나 값을 지정하여 그 값만 해당 변수에 들어갈수 있도록 하는것
 *  함수에 특정 인자만 전달해야 하거나, 특정 값만 반환해야 하는 경우에 유용하게 사용 가능
 */

let john :'대머리';
john = '대머리';
// john = '머머리'; 얘는 에러가 남

let myMy :30;
myMy = 30;
// myMy = 20; 얘는 에러가 남

let testMy :'Kim'|'Yi';
testMy = 'Kim';
testMy = 'Yi';   // 이렇게 두 문자만 할당 가능
// testMy = 'kk'; 얘는 에러 발생  


function kBB(turn :'가위'|'바위'|'보') :string {
  return turn;
}

console.log(kBB('가위'));
// console.log(kBB('가가'));

// :(type들.. )[] 이렇게 쓰면 해당 array에 () 안에 쓴 type만 요소로 들어올 수 있다는 의미임!
function kBB2(inArr :('가위'|'바위'|'보')[]) :void {
  console.log(inArr)
}
kBB2(['가위', '가위'])
//kBB2(['가바', '보']);


/**
 *  Literal Types 주의할 점. 
 *  Type을 설정하는것이다! 따라서 아래와 같이 작성할 떄 에러가 발생함
 * 
 *  let data = { name: 'kim' }
 *  function myFunc(a :'kim') {
 *      블라블라
 *  }
 *  myFunc(data.name)  // 에러 발생!!! why? data.name의 값은 'kim'이나 이 값의 type은 string 이므로!
 *  따라서 굳이 쓸거면 let data :{name :'kim'} 이런식으로 type을 설정해 주어야 한다! 이부분 주의할것
 * 
 *  근데 as const 를 붙여주면 되긴함!
 */

let datas = { 
  name: 'kim',  // string 타입
  age: 30,      // number 타입
}

let datasConst = { 
  name: 'kim',  // 'kim' 타입
  age: 30,      // 30 타입   
} as const   // as const의 역할. object key들에 대해서 할당된 값으로 literal types 설정을 해주는 것 + 모든 속성들에 readonly 부여 해 줌


// 함수 표현식에서 type alias 쓰는 법!
// 해당 함수의 type은 인자로 x, y가 각각 number로 들어와야하고, return 타입은 number 여야 된다는 의미
                // 인자의 type 설정       // 반환 type 설정
type funcType = (x :number, y :number) => number;
type funcType2 = (x :string) => string;

// 이런식으로 쓸 수 있는것!, 함수 표현식에서만 사용가능한 방법임! 선언식은 인자, 반환형 타입 따로해줄 수 밖에 없다.
const testTT :funcType = (x, y) => {
  return (x + y);
}

// 이렇게 object안에 function 작성할때도 함수 type alias를 활용 가능! 
const memberInfo :{name :string, plusF :funcType, hello: funcType2} = {
  name: 'Yi',
  plusF(a, b) {
    return (a + b);
  },
  hello : (a) => {
    return `안녕 ${a}`
  }
}

console.log(memberInfo.plusF(5, 3));
console.log(memberInfo.hello('상우'));

// 숙제
type cZero = (a :string) => string;
const cutZero :cZero = (a) => {
  if (a[0] == "0") {
    // array 에서는 splice(idx1, num, 요소들..) 세번째 이후는 option
    // idx1 위치부터 num 개만큼 요소 삭제, 만약 세번째 이후 인자로 들어온게있으면
    // 근데 string에서는 slice를 활용해야함 .slice(idx1, num)
    // idx1 위치부터 slice 만약 num을 안쓰면 idx1위치 이후 모든 subString을 가져오며
    // num을 입력하면 idx1 위치부터 num 만큼 가져옴 (띄어쓰기 포함) 
    const res :string =  a.slice(1);
    return res;
  } else {
    return a;
  }
}
console.log(cutZero('0123123'))
console.log(cutZero('123123'));

type rmDash = (a :string) => number

const removeDash :rmDash = (inStr) => {
  // string.replace(a, b) 문자열에있는 a를 전부 b로 교체해줌
  let res :string = inStr;
  // 해당 문자열에 -가 포함되는동안 반복
  // while (res.indexOf('-') != -1) {
  //   res = res.replace('-', '');
  // } 와 같다.
  // 이렇게 정규식 형태로 쓰고 /g를 붙여주면 정규식에 해당되는애가 없어질때까지 호출함
  // 참고 g는 global search, i는 ignore case (대소문자 구분 안함)
  // 따라서 만약 대소문자 구분 없이 모든 substring을 삭제하고싶으면
  // /{체크할 substring 정규식}/gi 이렇게 적어주면 됨
  res = res.replace(/-/g, '');
  return Number(res);
}
console.log(removeDash('150-5356-2594'));


type testFFF = (a :string, b :cZero, c :rmDash) =>  void

const funcFunc :testFFF = (a, cZ, rD) => {
  let temp :string = cZ(a);
  console.log(temp);

  let res :number = rD(temp);
  console.log(res);
}

funcFunc('010-5356-2594', cutZero, removeDash);



/*
  클래스도 타입지정 해서 만들 수 있다. 
  Class 는 JS에서는 ES6 부터 추가 됨 
 */

// 배열 디폴트값 넣어서 선언하는법, JS에서는 그냥 new Array(길이).fill(0) 이런식으로 선언하면 되나
// 타입스크립트는 아래처럼 쓰자. 
// 기본적으로는 String<any> , Array<any> 이런식으로 선언되어있다. 
// 근데 제네릭으로 작성되이있으므로 new 생성할 때 Type 지정이 가능한것! (제네릭 타입 자유자재로 쓸 수 있어야함!)
const arrTt :number[]= new Array<number>(30).fill(0);


// 클래스 타입 지정
class Person {
  // 타입스크립트는 그냥 자바처럼 코드를 짠다고 생각하자!
  name :string;
  age :number;
  // 타입스크립트는 JS랑 다르게 반드시 필드를 먼저 선언해야 this.필드 이렇게 쓸 수 있다. (JS에서는 필드선언 따로안해도 this.변수 이렇게 쓸 수 있다.)
  // 자바처럼 코드를 짠다고 생각하면 편함!
  // 자바에서 생성자에서 따로 반환 type 안적는것처럼 여기서도 constructor에 굳이 반환 type 쓸 필요 X
  constructor(name :string, age :number) {
    this.name = name;
    this.age = age;
  }
  // 필드
  data :number = 0;
  
  // 메서드 작성 (클래스에서 함수를 메서드라고 부른다.)
  // type 지정하는것은 그냥 function 타입 지정하는 방법이랑 완전히 동일
  greeting(partner :string) :void {
    console.log(`안녕 ${partner}야! 내이름은 ${this.name}야!`);
  }
}

const ttt = new Person('상우', 31);
console.log(ttt);
ttt.greeting('유정');

// 숙제
class Car {
  model :string
  price :number
  constructor(model :string, price :number) {
    this.model = model;
    this.price = price;
  }

  tax() :number {
    return (this.price / 10);
  }
}

const car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());


class Word {
  // 진짜 그냥 타입스크립트는 자바 코드 짤 때처럼 짜면 된다 (필요하면 초기화 해준다)
  num :number[] = [];
  str :string[] = [];
  // 인자가 몇개 전달될지 모르는 경우에는 (...args) 이렇게 설정해주면 된다. 파이썬에서는 *args, **kwargs 가 존재함 (자바스크립트에도 존재!)
  // rest parameter 라고 부른다!
  constructor(...args :(string | number)[]) {
    // ...args로 선언할때, 명시된 인자가아닌 나머지 인자들은 배열 형태로 전달된다! (이거 그냥 JS 문법임)
    console.log(args);
    args.forEach((el :(number | string), idx :number) => {
      if (typeof el == 'number') {
        this.num = [...this.num, el];
      } else if (typeof el == 'string') {
        this.str = [...this.str, el];
      }
    })
  }
}

const obj123 = new Word('kim', 'yi', 3, 5, 11, 'park');
console.log(obj123.num);
console.log(obj123.str);


// interface , type이랑 활용하는건 사실 거의 똑같다. 확장할떄 extends, implements를 써서 자바처럼 짜기 좋은 친구임
interface Square {
  // 자바에서 interface랑 사실상 같은 친구임!
  color :string;
  width :number;
}

interface Human {
  name :string;
}
let mmmm :Human = {name: 'kim'};

interface Teacher extends Human {
  // super 별도로 안써도 Human의 필드가 상속 됨
  age :number;
}

let asdsad :Teacher = {name: 'park', age: 30};

// 인터페이스 숙제
interface Gift {
  brand :string;
  serialNumber :number;
  model :string[];
}

let gif :Gift = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] };

interface Product {
  product :string;
  price :number;
}
// 그냥 :~~[] 의 의미 자체가 해당 array 안에 요소로써 ~~ 를 허용하겠다는 의미임
let ttInt :Product[] = [{ product : '청소기', price : 7000 }, { product : '삼다수', price : 800 }];

interface CardP extends Product {
  card :boolean;
}
let testTTT :CardP = { product : '청소기', price : 7000, card : false };


// type alias랑 사실상 거의 똑같다고 보면 된다.
// 함수에 interface , type alias 하는 법 (인자들..) => 반환형 이 구조에 맞추어서 작성
// ex) (a :number, b :number) => number; 
interface ObjInt {
  plus: (a :number, b :number) => number;
  minus: (a :number, b:number) => number;
}

const obj :ObjInt = {
  plus(a, b) {
    return a + b;
  },
  minus(a, b) {
    return a - b;
  }
}

const person1 = { student: true, age: 20 }

type perFuncType = {student :boolean, age :number};


// 이렇게 object를 destructuring 문법으로 써도, 타입 지정은 object랑 동일하게함
// 길어지니까 보통 이렇게 type이나 interface로 만들어서 적용시킨다.
function ffunc({ student, age }: perFuncType) {
  console.log(student, age)
}

function findMax(...numbers :number[]) :number{
  let answer :number = numbers[0]
  
  numbers.forEach((number :number, idx :number) => {
    if (answer < number) {
      answer = number;
    }
  })
  return answer;
}

console.log(findMax(1, 2, 3, 4, 5, -5, 13))


// destructuring (구조분해 할당)

// object  
        
// 사실은 (내가 정한 key: value값에 내가 초기화한 object의 key값) 이런식으로 매칭하는게 정석 
// {student123: student123, age123: age123} 이지만 ES6이후에 key-value가 같으면 생략 가능해짐
let {student123, age123} = {student123 :'aa', age123 : 30};

// array
let [xx, yy, zz] = [1, 2, 3]

type homeWorkFuncType = {user: string, comment: number[], admin: boolean};

function homeFunc({ user, comment, admin}: homeWorkFuncType): void{
  console.log(user, comment, admin);
}

homeFunc({user: 'kim', comment: [1, 2, 3], admin: false});

function hhffunc([a, b, c]: (number | string | boolean)[]): void {
  console.log(a, b, c);
}

