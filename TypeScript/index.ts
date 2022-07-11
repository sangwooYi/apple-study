// ts 파일을 js파일로 변환해줘야함
// tsc -w 를 터미널에 입력하면 js파일 자동으로 생성해 줌 (안되면 npm install -g typescript 해서 타입스크립트 깔아야함)
// 타입스크립트는 기본적으로 global 모듈이다 (ambient module)
// 따라서 같은 폴더에있으면 다른 ts 파일의 변수를 바로 가져다 쓸 수 있음
// 이거 싫으면 export 를 해주어야 한다 (export 해주는 순간 로컬 module 이 됨)

// 이렇게 변수옆에 :타입 을 지정해줘야하는것이 TypeScript

// 타입은 string, number, object, boolean 등이 존재 소문자로 시작한다는 부분 주의!
let myName :string = 'kim';

// array 타입지정법 (자바랑 유사함)
let nameArr :string[] = ['kim', 'park'];

// object 타입지정법
let nameObj :{name: string} = {name: 'kim'}

// 타입을 여러가지 지정 가능, 아래처럼 하면 String , 숫자 둘다 들어와도 상관 없음
let testVar :string | number = 123;

// parameter에도 변수를 지정해 줘야 함, 뒤에오는건 return 타입
function testFunc(x :number) :number{
  return x*2;
}

const a :number = testFunc(3);
console.log(a);

// 타입 커스텀 
type Member = {
  //[key :string]은 이 Member 타입의 key는 무조건 string이어야 한다는 의미
  [key :string] : string,
}

// 사실 자동으로 type 씌워준다!
const test1 = [1, 2, 3];

// 예제1
const myNme :string = '이상우';
const myAge :number = 31;

// 예제2
const myFavor :{title :string, name :string} = {title: '백색왜성', name: '넬'};

const porject :{member :string[], days :number, started :boolean} = {member: ['kim', 'park'], days: 30, started: true};


// Union Type 타입 두개 이상을 합치는 것, 3개 이상도 가능 | 로 이으면 된다 
let varVar :(string | number) = 123;
// 대신 할당한 순간 Type은 확정 된다.
console.log(varVar);

// 아래처럼 선언시에는 string, number 중 하나만 확정되는것이고 
let arrTest :(number[] | string[]) = ['a', 'b'];
console.log(arrTest);

// 이렇게 작성하면 array에 여러 type을 같이 쓸 수 있다.
let arrTest2 :(number | string)[] = [1, '1', 2];
console.log(arrTest2);

// any 타입 typescript 안쓰겠다는 의미나 마찬가지, 가능하면 쓰지말자
const anyTest :any = '하하';
console.log(anyTest);


// unknown 타입, 어떤 타입이 들어갈지 애매할때 any대신 이걸 쓰자. any보다 안전함
const unTest :unknown = 123;

// why? unknown은 이렇게 어느정도 판단을 해준다. + 연산도 못함
// const var1 :string = unTest; // 이거 에러 발생함
// any는 그런거 없음. 그냥 사실상 자바스크립트 쓰는거라서 any는 쓰지 말자. 
const var2 :number = anyTest;

// console.log(unTest-1);  //unknown 타입은 사칙연산 못한다 (따라서 any보다 좀더 안전함)
// 물론 그냥 왠만하면 타입 지정하자 or 제네릭 사용

let age :string|number = 2;
console.log(age+1); // 이렇게 할당해줘야만 연산이 가능해짐, 초기화 안한상태에서 연산하려하면 에러난다.

// 숙제
let user :string = 'kim';
// undefined 타입은 undefined에 , null타입은 null에 대입된다.
let age1 :(undefined | number) = undefined;
let married :boolean = false;
let chulsoo :(string | undefined | number | boolean)[] = [user, age1, married];

let school :{score: (number | boolean)[], teacher: string, friend: string | string[]} = {
  score: [100, 97, 84],
  teacher: 'Pill',
  friend: 'John',
}

school.score[4] = false;
school.friend = ['Lee', school.teacher];


// 함수 Type 지정
// parameter 타입 지정과, return 의 Type을 지정해주어야 한다 (자바를 생각해보자!)
/*
  일반적으로 아래처럼 작성하면 된다.
  선언형은 이렇게
  function 함수명 (파라미터 type들) :return 타입 {
    코드 작성
  }

  표현형은 이렇게
  const 변수명 = (파라미터 tpye들) :return 타입 => {
    코드 작성
  }
  
  return type 쓰는 부분에서, 반환하는게 없으면 :void 를 써주어야 한다 (자바랑 똑같음!)
*/

// 아래처럼 작성해 주면 됨. 사실상 자바랑 더 가까워 졌다고 생각하면 된다.
function swap(arr :number[], idx1 :number, idx2 :number) :void {
  const temp :number = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

const addFunc = (a :number, b :number) :number => {
  return a + b;
}

/**
 *  참고! parameter를 ?를 통해 선택사항으로 작성할 수 도있다.
 *  아래처럼 작성하면 x에 대항하는 인자는 안넘겨도 에러가 발생하지 않는다
 *  아래 코드는 x : (number | undefined) 와 같은 로직임
 *  const func(x? :number) {
 *    코드
 *  }
 */

function addFunc1 (x :number | string) :void {
  // 타입스크립트에서는 typeof를 아래처럼 사용해야한다.
  // typeof(변수) , typeof 변수 둘다 사용 가능함
  // 해당 타입이 숫자이면 아래 코드를 실행해라는 의미임
  if (typeof(x) == 'number') {
    console.log(x+2);
  }
  // Narrowing 말고 Type Assertion 기능도 존재 (임시로 타입을 확정시켜버리는것)
  // 아래처럼 작성하면 굳이 if문으로 Narrowing 코드 작성 안해도 되긴 함 (얘 근데 굳이 쓸 필요가 없음)
  console.log(x as number + 2);
}

// 참고 as 문법의 옛날 방식은 <string> x = '123'; 이런식이었다.
// 여기서 조금 더 나아가면 제네릭 선언으로 넘어감 자바에서 제네릭과 같다 
// 사용법: 함수명<T>로 명시후 제네릭으로 설정할 Type을 T로 대체해서 작성해 주면 된다.
function getText<T> (text : T) :string { 
  return `지금 들어온 값은 ${text}이고 타입은 ${typeof text}임!`;
}
// 아래처럼 사용할 때 타입을 확정해 주는것
// 제네릭은 사용할 때 타입을 할당해주는 것이라 생각하면 됨, 
console.log(getText<string>('호호호'));
console.log(getText<number>(123));

// 숙제1
function printName (name? :string) :void {
  // 이렇게 타입 조건에 따라 코드를 실행하도록 짜는것을 Type Narrowing이라고 부름
  if (typeof name == 'string') {
    console.log(`안녕하세요 ${name}`)
  } else {
    console.log("이름이 없네요..")
  }
}

printName("상우");
printName();

// parameter를 이렇게 설정하면 어차피 문자여, 숫자밖에 못들어옴
function checkDigit(x :(string | number)) :number {
  if (typeof x == 'string') {
      return x.length;
  } else {
    // 숫자도 자릿수 셀때는 그냥 문자열로 변환후에 .length 사용 아니면 계속 10나누는거 해야한다..
    const tmp = x.toString();
    return tmp.length;
  }
}
checkDigit('1234');
checkDigit(1234);


function calcChanceOfMarry(income :number, home :boolean, charming: string) :(string | void) {
  let score :number = 0;
  score += income;
  if (home) {
    score += 500;
  }
  if (charming == '상') {
    score += 100;
  }
  if (score >= 600) {
    return '결혼 가능 ㅊㅋㅊㅋ';
  }
}

console.log(calcChanceOfMarry(700, false, '중'));
console.log(calcChanceOfMarry(100, false, '상'));



// 숙제
function convertNumberIfHasString(array :(string | number)[]) :number[] {
  const resArr = array.map((element :(string|number), idx :number) => {
    if (typeof element == 'number') {
      return element;
    } else {
      return parseInt(element);
    }
  })
  return resArr;
}
const ttArr = convertNumberIfHasString(['1', 2, 3, '4']);
console.log(ttArr);


// subType이란 type으로 설정시 object는 subject란 key와, value는 string 혹은 string배열만 가능
// 이렇게 type 말고도 interface란 선언자로 타입을 선언할 수도 있다. (확장하는 문법이 다를뿐 사용방법은 같음)
type SubType = {
  subject :(string | string[]);
}

// interface는 function 선언 형태로 작성한다 주의! 
// 그리고 일반적으로는 interface를 더 자주 사용하는 듯?
// type alias와 interface 모두 대문자 시작이 작명 관습이다.
interface TestInterface {
  name :string;
  age :number;
}

type TestType = {
  name :string;
  age :number;
}

function homeWork(x :SubType) :string {
  if (typeof x.subject == 'string') {
    return x.subject;
  } else {
    return (x.subject[x.subject.length-1]);
  }
}
console.log(homeWork({subject: 'kim'}));
console.log(homeWork({subject: ['science', 'art', 'korean']}));


// readonly  
// 자바스크립트에서는 const로 할당한 변수값이 object나 array라면 
// const로 선언했음에도 내부 요소를 변경 가능하다!

const tstObj = {
  name: '상우',
}
tstObj.name = '유정'; // 내부 요소는 얼마든지 변경 가능

// 이걸 막고싶으면 readonly 한정자를 사용!
type Girlfriend = {
  readonly name :string
}

const gF :Girlfriend = {
  name: '유정'
}
// gF.name = '하하' // read만 가능해짐, 사실 변경은 되는데 타입스크립트에서 에러를 발생해주는것일뿐! (JS 문제..) 

// type alias 합치기 가능함
type Name = {
  name :string,
  score :number,
}
type Age = {
  age :number,
  score :number,
}

// 이렇게 object를 합칠 수 있다! (interface는 extends와 implements 사용 (자바처럼).)
type Info = Name & Age;

const myInfo :Info = {
  name: '상우',
  age: 30,
  score :80,
}


// 숙제
type HomeWorkType = {
  color :string,
  size :number,
  readonly position :number[],
}

type Information = {
  name :string,
  phone :number,
  email :string,
}

type Adult = {
  isAdult :boolean,
}

type UpgradeInfo = Information & Adult;