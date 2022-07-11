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
function fff(a) {
    if (a && typeof a === 'string') {
        // 만약 a가 undefined라면 애초에 여기가 실행되지 않는다.
    }
}
function ffff(animal) {
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
function carBike(x) {
    if (x.wheel === '4EA') {
        // 여기에는 Car1 타입만 실행 됨
    }
    else if (x.wheel === '2EA') {
        // 여기는 Bike1 타입만 실행 됨
    }
}
// 튜플 타입 (array에서 요소 개별적으로 type을 거는 방법)
// 이렇게 tuple 타입으로 정의하면 array 길이가 정해지고, 위치에 대한 type까지 정해진다!
// 물론 number? 이렇게 해서 어느정도 유연성을 부여할 수는 있다. (?는 중간에 나올 수 없다. rest parameter와 같은 논리로)
let tupleArr = ['하', 1];
// spread operator에서 튜플 형식으로 타입 거는법
let ar1 = [1, 2, 3];
let ar2 = [4, 5];
let ar3 = [ar2, ...ar1];
// 숙제
const recentFood = ['햄버거', 7400, true];
// rest parameter 형식으로 type 지정해주면 된다.
let arr = ['동서녹차', 4000, true, false, true, true, false, true];
function homeFunc123(a, b, ...c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
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
function seperator(...args) {
    let strs = [];
    let nums = [];
    args.forEach((el, idx) => {
        if (typeof el === 'string') {
            strs.push(el);
        }
        else if (typeof el === 'number') {
            nums.push(el);
        }
    });
    let res12 = [strs, nums];
    return res12;
}
console.log(seperator(1, 2, '하', '히', 5, 7, '후', '히', 9, 11));
