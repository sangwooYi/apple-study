/**
 *  자바에서 쓴 제네릭이랑 똑같다
 */
// 이렇게 호출 할 때 동적으로 type을 할당하는것이 제네릭임
// 제네릭클래스, 제네릭 메서드 다 가능, 
// 그냥 작성할 때 <T> 로 제네릭 명시해준 후, 동적으로 할당할 곳에 T를 써주면 끝 
function genericTest(param) {
    console.log(param);
}
genericTest(5);
genericTest('하하');
// 제네릭을 특정 타입 하위로 제한하고 싶으면 extends를 활용!
function addFf(x) {
    return x - 1;
}
// 세터, 게터, 필드, 메서드 선언은 그냥 일반 클래스와 동일하다.
class GenericClass {
    constructor(val) {
        this.val = val;
    }
}
// 이런식으로! (자바랑 똑같음!)
const insIns = new GenericClass('하');
// 숙제
function printParam(arg) {
    console.log(arg.length);
}
printParam('hello');
printParam(['1', '2', '3']);
function parseToAnimal(arg) {
    // 참고 JSON => 원본 변환 은 JSON.parse(JSON파일)
    // 원본 => JSON 으로 변환은 JSON.stringify(원본)
    const parsing = JSON.parse(arg);
    return parsing;
}
let data = '{"name" : "dog", "age" : 1 }';
const res = parseToAnimal(data);
console.log(res);
class Pers {
    constructor(a) {
        this.name = a;
    }
}
let aa1 = new Pers('상우');
console.log(aa1.name);
