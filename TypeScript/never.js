/**
 *  never 타입
 *
 *  void 타입과 유사하나 끝나지 않는 함수를 표현하고 싶을때 쓸 수 있다.
 *  반환형 never 타입 조건
 *  1. return 이 없어야 한다.
 *  2. 함수의 end point가 없어야 한다.
 *  사실 그냥 왠만하면 void 쓰면 됨
 *
 *  parameter에서는
 *  narrowing 잘못할 때 never 타입이 된다.
 *
 *  그냥 이런게 있다는것만 알아두자!
 */
// 예시 1. return 없고, 2. 함수가 끝나지 않는다.
function infinite() {
    while (true) {
        //
    }
}
function test12(param) {
    if (typeof (param) === 'string') {
        // 타입이 string일때 실행
    }
    else {
        console.log(param); // never 타입으로 전달 된다. 
        // 즉 이런 코드가 들어올 일이 없다는 의미, narrowing 잘못한것 (never!!)
    }
}
// 에러 발생시, 함수 선언식은 void, 함수 표현식은 never 타입으로 전달 됨
function f11() {
    throw new Error();
}
const f111 = f11(); // void 타입으로 전달
const f123 = () => {
    throw new Error();
};
