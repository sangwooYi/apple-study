// ts 파일을 js파일로 변환해줘야함
// tsc -w 를 터미널에 입력하면 js파일 자동으로 생성해 줌 (안되면 npm install -g typescript 해서 타입스크립트 깔아야함)
// 타입스크립트는 기본적으로 global 모듈이다 (ambient module)
// 따라서 같은 폴더에있으면 다른 ts 파일의 변수를 바로 가져다 쓸 수 있음
// 이거 싫으면 export 를 해주어야 한다 (export 해주는 순간 로컬 module 이 됨)
// 이렇게 변수옆에 :타입 을 지정해줘야하는것이 TypeScript
// 타입은 string, number, object, boolean 등이 존재 소문자로 시작한다는 부분 주의!
let myName = 'kim';
// array 타입지정법 (자바랑 유사함)
let nameArr = ['kim', 'park'];
// object 타입지정법
let nameObj = { name: 'kim' };
// 타입을 여러가지 지정 가능, 아래처럼 하면 String , 숫자 둘다 들어와도 상관 없음
let testVar = 123;
// parameter에도 변수를 지정해 줘야 함, 뒤에오는건 return 타입
function testFunc(x) {
    return x * 2;
}
const a = testFunc(3);
console.log(a);
// 사실 자동으로 type 씌워준다!
const test1 = [1, 2, 3];
// 예제1
const myNme = '이상우';
const myAge = 31;
// 예제2
const myFavor = { title: '백색왜성', name: '넬' };
const porject = { member: ['kim', 'park'], days: 30, started: true };
// Union Type 타입 두개 이상을 합치는 것, 3개 이상도 가능 | 로 이으면 된다 
let varVar = 123;
// 대신 할당한 순간 Type은 확정 된다.
console.log(varVar);
// 아래처럼 선언시에는 string, number 중 하나만 확정되는것이고 
let arrTest = ['a', 'b'];
console.log(arrTest);
// 이렇게 작성하면 array에 여러 type을 같이 쓸 수 있다.
let arrTest2 = [1, '1', 2];
console.log(arrTest2);
// any 타입 typescript 안쓰겠다는 의미나 마찬가지, 가능하면 쓰지말자
const anyTest = '하하';
console.log(anyTest);
// unknown 타입, 어떤 타입이 들어갈지 애매할때 any대신 이걸 쓰자. any보다 안전함
const unTest = 123;
// why? unknown은 이렇게 어느정도 판단을 해준다. + 연산도 못함
// const var1 :string = unTest; // 이거 에러 발생함
// any는 그런거 없음. 그냥 사실상 자바스크립트 쓰는거라서 any는 쓰지 말자. 
const var2 = anyTest;
// console.log(unTest-1);  //unknown 타입은 사칙연산 못한다 (따라서 any보다 좀더 안전함)
// 물론 그냥 왠만하면 타입 지정하자 or 제네릭 사용
let age = 2;
console.log(age + 1); // 이렇게 할당해줘야만 연산이 가능해짐, 초기화 안한상태에서 연산하려하면 에러난다.
// 숙제
let user = 'kim';
// undefined 타입은 undefined에 , null타입은 null에 대입된다.
let age1 = undefined;
let married = false;
let chulsoo = [user, age1, married];
let school = {
    score: [100, 97, 84],
    teacher: 'Pill',
    friend: 'John',
};
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
function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}
const addFunc = (a, b) => {
    return a + b;
};
/**
 *  참고! parameter를 ?를 통해 선택사항으로 작성할 수 도있다.
 *  아래처럼 작성하면 x에 대항하는 인자는 안넘겨도 에러가 발생하지 않는다
 *  아래 코드는 x : (number | undefined) 와 같은 로직임
 *  const func(x? :number) {
 *    코드
 *  }
 */
function addFunc1(x) {
    // 타입스크립트에서는 typeof를 아래처럼 사용해야한다.
    // typeof(변수) , typeof 변수 둘다 사용 가능함
    // 해당 타입이 숫자이면 아래 코드를 실행해라는 의미임
    if (typeof (x) == 'number') {
        console.log(x + 2);
    }
    // Narrowing 말고 Type Assertion 기능도 존재 (임시로 타입을 확정시켜버리는것)
    // 아래처럼 작성하면 굳이 if문으로 Narrowing 코드 작성 안해도 되긴 함 (얘 근데 굳이 쓸 필요가 없음)
    console.log(x + 2);
}
// 참고 as 문법의 옛날 방식은 <string> x = '123'; 이런식이었다.
// 여기서 조금 더 나아가면 제네릭 선언으로 넘어감 자바에서 제네릭과 같다 
// 사용법: 함수명<T>로 명시후 제네릭으로 설정할 Type을 T로 대체해서 작성해 주면 된다.
function getText(text) {
    return `지금 들어온 값은 ${text}이고 타입은 ${typeof text}임!`;
}
// 아래처럼 사용할 때 타입을 확정해 주는것
// 제네릭은 사용할 때 타입을 할당해주는 것이라 생각하면 됨, 
console.log(getText('호호호'));
console.log(getText(123));
// 숙제1
function printName(name) {
    // 이렇게 타입 조건에 따라 코드를 실행하도록 짜는것을 Type Narrowing이라고 부름
    if (typeof name == 'string') {
        console.log(`안녕하세요 ${name}`);
    }
    else {
        console.log("이름이 없네요..");
    }
}
printName("상우");
printName();
// parameter를 이렇게 설정하면 어차피 문자여, 숫자밖에 못들어옴
function checkDigit(x) {
    if (typeof x == 'string') {
        return x.length;
    }
    else {
        // 숫자도 자릿수 셀때는 그냥 문자열로 변환후에 .length 사용 아니면 계속 10나누는거 해야한다..
        const tmp = x.toString();
        return tmp.length;
    }
}
checkDigit('1234');
checkDigit(1234);
function calcChanceOfMarry(income, home, charming) {
    let score = 0;
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
function convertNumberIfHasString(array) {
    const resArr = array.map((element, idx) => {
        if (typeof element == 'number') {
            return element;
        }
        else {
            return parseInt(element);
        }
    });
    return resArr;
}
const ttArr = convertNumberIfHasString(['1', 2, 3, '4']);
console.log(ttArr);
function homeWork(x) {
    if (typeof x.subject == 'string') {
        return x.subject;
    }
    else {
        return (x.subject[x.subject.length - 1]);
    }
}
console.log(homeWork({ subject: 'kim' }));
console.log(homeWork({ subject: ['science', 'art', 'korean'] }));
// readonly  
// 자바스크립트에서는 const로 할당한 변수값이 object나 array라면 
// const로 선언했음에도 내부 요소를 변경 가능하다!
const tstObj = {
    name: '상우',
};
tstObj.name = '유정'; // 내부 요소는 얼마든지 변경 가능
const gF = {
    name: '유정'
};
const myInfo = {
    name: '상우',
    age: 30,
    score: 80,
};
