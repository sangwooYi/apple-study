// ts 파일을 js파일로 변환해줘야함
// tsc -w 를 터미널에 입력하면 js파일 자동으로 생성해 줌

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