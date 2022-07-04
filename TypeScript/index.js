// ts 파일을 js파일로 변환해줘야함
// tsc -w 를 터미널에 입력하면 js파일 자동으로 생성해 줌
// 이렇게 변수옆에 :타입 을 지정해줘야하는것이 TypeScript
// 타입은 string, number, object, boolean 등이 존재 소문자로 시작한다는 부분 주의!
var myName = 'kim';
// array 타입지정법 (자바랑 유사함)
var nameArr = ['kim', 'park'];
// object 타입지정법
var nameObj = { name: 'kim' };
// 타입을 여러가지 지정 가능, 아래처럼 하면 String , 숫자 둘다 들어와도 상관 없음
var testVar = 123;
// parameter에도 변수를 지정해 줘야 함, 뒤에오는건 return 타입
function testFunc(x) {
    return x * 2;
}
var a = testFunc(3);
console.log(a);
// 사실 자동으로 type 씌워준다!
var test1 = [1, 2, 3];
// 예제1
var myNme = '이상우';
var myAge = 31;
// 예제2
var myFavor = { title: '백색왜성', name: '넬' };
var porject = { member: ['kim', 'park'], days: 30, started: true };
