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

function carBike(x :(Car1 | Bike1)) {
  if (x.wheel === '4EA') {
    // 여기에는 Car1 타입만 실행 됨
  } else if(x.wheel === '2EA') {
    // 여기는 Bike1 타입만 실행 됨
  }
}