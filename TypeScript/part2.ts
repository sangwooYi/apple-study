/**
 *  Narrowing 테크닉
 */

/**
 *  1. && 활용  
 *  && 논리연산자의 경우 하나만 F이면 F 판정을 하므로 a && b && c 이렇게 여러개 연산이 엮여있을때
 *  앞에 하나만 F 판정이 나오면 연산을 중단해 버린다!  (반대로 | 는 하나만 T가 나와도 뒤의 연산 X)
 *  따라서 if (a && typeof a === 'string') 이렇게 썼을때 a 가 falsy (false로 판정받는 null, undefined 애들)라면 
 *  뒤에 판정 없이 Fale 판정을 받아 if 문  실행이 되지 않는것 
 */

function fff(a :(string | undefined)) :void {
  if (a && typeof a === 'string') {
    // 만약 a가 undefined라면 애초에 여기가 실행되지 않는다.
  }
}

/**
 *  2. object에서  narrowing인 in 활용
 *  (key 값) in 오브젝트 라고 작성하면 
 *  해당 key가 오브젝트에 있는지 체크해서 T/F를 반환해 준다
 */

type Fish = {swim :string}
type Bird = {fly :string}
function ffff(animal :Fish | Bird) :void {
  if ('swim' in animal) {
    // Fish 타입일때만 실행 됨
  }
}

/**
 *  instanceof
 *  a instanceof b 이면 a란 인스턴스가 b를 통해 생성된 인스턴스인지 체크 해줌
 */

let daty = new Date();
if (daty instanceof Date) {
  // daty란 인스턴스는 Date 클래스를 통해 생성 한 인스턴스이므로 T 판정을 받는다.
  // 그게 아니면 F판정임
}

/**
 *  만약 서로 다른 type이 
 *  같은 속성 key 값을 갖는 object들일 때는 literal type 활용!
 *  (이렇게 안짜는게 사실 맞긴 함)
 * 
 *  type이면 아래와같이 바로 literal type 선언이 가능하고,
 *  만약 그냥 변수 할당 때 바로 작성하려면 아래와 같이 작성하면 됨 (as const 활용)
 *  let t123 = {
 *    name: 'kim',
 *    age: 20,
 *  } as const  => 이러면 name은 'kim' 타입, age 는 20타입이 된다. (원래는 각각 string, number 타입으로 선언됨)
 */

// type의 경우는 이렇게 바로 literal type 선언이 가능함
type Car1 = {
  wheel :'4EA',  // 이렇게 하면 wheel이란 key값은 '4EA' 타입이 된다. (이게 literal type)
  color :string,
}
type Bike1 = {
  wheel :'2EA',
  color :string,
}

function carBike(x: (Car1 | Bike1)) {
  if (x.wheel === '4EA') {
    // 여기에는 Car1 타입만 실행 됨
  } else if(x.wheel === '2EA') {
    // 여기는 Bike1 타입만 실행 됨
  }
}


// 튜플 타입 (array에서 요소 개별적으로 type을 거는 방법)

// 이렇게 tuple 타입으로 정의하면 array 길이가 정해지고, 위치에 대한 type까지 정해진다!
// 물론 number? 이렇게 해서 어느정도 유연성을 부여할 수는 있다. (?는 중간에 나올 수 없다. rest parameter와 같은 논리로)
let tupleArr: [string, number] = ['하', 1];

// spread operator에서 튜플 형식으로 타입 거는법
let ar1 = [1, 2, 3]
let ar2 = [4, 5]
let ar3: [number[], ...number[]] = [ar2, ...ar1];


// 숙제
const recentFood: [string, number, boolean] = ['햄버거', 7400, true];
                        // rest parameter 형식으로 type 지정해주면 된다.
let arr: [string, number, ...boolean[]] = ['동서녹차', 4000, true, false, true, true, false, true]

function homeFunc123(a: string, b: boolean, ...c: (string | number)[]): void {
  console.log(a);
  console.log(b);
  console.log(c)
}

type SeperType = (...args: (string|number)[]) => [string[], number[]]


// // 위처럼 함수 type 지정은 표현식에서만 가능, 선언식은 그냥 원래대로 인자, 반환형 따로 해야함
// const seperator: SeperType = (...args) => {
//   let strs: string[] = [];
//   let nums: number[] = [];

//   args.forEach((el: (string | number), idx: number) => {
//     if (typeof el === 'string') {
//       strs.push(el);
//     } else if (typeof el === 'number') {
//       nums.push(el);
//     }
//   })

//   let res12: [string[], number[]] = [...strs, ...nums];

//   return res12;
// }

function seperator(...args: (string | number)[]): [string[], number[]] {
    let strs: string[] = [];
    let nums: number[] = [];

    args.forEach((el: (string | number), idx: number) => {
      if (typeof el === 'string') {
        strs.push(el);
      } else if (typeof el === 'number') {
        nums.push(el);
      }
    })

    let res12: [string[], number[]] = [strs, nums];

    return res12;
}  

console.log(seperator(1, 2, '하', '히', 5, 7, '후', '히', 9, 11))

// object index signatures object, 타입지정 한번에 가능(대신 한 타입으로 통일 되야함)
// 아래처럼 활용한다.
interface StringOnly {
  [key: string]: string;
}

let objUser: StringOnly = {
  age: '30',
  name: '상우'
}

interface SignatureTest {
  [key: number]: string
}

let sigTest = {
  0: 'kim',
  1: 'sang',
  2: 'young'
}

// 숙제
type HomeworkType = {
  [key: string]: string | number
}
let obj1231: HomeworkType = {
  model : 'k5',
  brand : 'kia',
  price : 6000,
  year : 2030,
  date : '6월',
  percent : '5%',
  dealer : '김차장',
}

// 이렇게 재귀적으로도 작성 가능하다.
interface TestRecurType {
  [key: string]: TestRecurType | number
}

let objRec: TestRecurType = {
  'font-size' : 10,
  'secondary' : {
    'font-size' : 12,
    'third' : {
      'font-size' : 14
    }
  }
}


// type of
interface Person123 {
  age: number;
  name: string;
}
// age타입 | name타입  이렇게 literal type이 Union 상태로 된다
type PersonKeys = keyof Person123;
let aa: PersonKeys = 'name'; // name, age만 들어올 수 있음

// 타입 변환기 (제네릭 사용)
type TypeChanger<T> = {
  // for in 인것!
  [key in keyof T]: string
}

type Car11 = {
  color: boolean,
  model: boolean,
  font: boolean | number,
}
// 모든 key값의 type이 string으로 변함
type NewTyy = TypeChanger<Car11>;

// 숙제
type Bus = {
  color: string,
  model: boolean,
  price: number,
}

// 제네릭은 , 통해서 여러개 지정도 가능하다!
type TypeChanger2<T, K> = {
  [key in keyof T]: K
}
type NewBus = TypeChanger2<Bus, string>;


// 삼항 연산자 이용 type 뽑아내기
// T가 string 속성을 갖고잇으면 string type으로 아니면 any 타입으로
type TestAge<T> = T extends string ? string : any;

// any 타입이 된다.
const tttt: TestAge<number> = 1;
// string 타입이 된다.
const ttttt: TestAge<string> = "1";


// 퀴즈
type FirstItem<T> = T extends any[] ? T[0] : any;

const frara: FirstItem<string[]> = '1'; // string 타입
const farara: FirstItem<number> = 3;  // any 타입

// infer (있다는것만 알고 넘어가자) 조건문에서 쓸수 있는 특수한 키워드

// T에서 type을 뽑아서 R에다 대입해주는게 infer 임! (조건문에서만 사용 가능)
type InferType<T> = T extends infer R ? string : unknown;

// () => void 가 T의 Type이므로 R은 void가 적용된다.!  (꼴을 맞추어서 R에 해당하는 값을 대입해 주는것)
type InferFunc<T> = T extends (() => infer R) ? R : any;
type a1 = InferFunc<() => void> 

// 숙제
type AAge<T> = T extends [string, ...any] ? string : unknown;
const aaaage: AAge<[string, number]> = '3';
const aaaaa: AAge<[number, string]> = 4;

// type TestHome<T> = T extends any[]

type InferInfer<T> = T extends ((x: infer R) => void) ? R : any;
const infff: InferInfer<(x: number) => void> = 3;