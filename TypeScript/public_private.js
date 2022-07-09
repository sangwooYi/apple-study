/**
 *  public private protected static 한정자 사용이 가능하다!
 *  TypeScript는 자바에 더 코드가 가까워진것
 *  디폴트 한정자는 항상 public이다 (자바도 똑같음)
 *
 *  public      항상 접근 가능
 *  protected   상속 관계에서는 접근 가능
 *  private     다른 클래스에서는 접근 불가
 *  static      타입스크립트에서는 직접 함수나 변수를 부여하는 개념으로 사용 됨
 *  (물론 정적 변수, 함수가 된다는 것은 똑같다)
 *  인스턴스가 특정 필드, 메서드를 물려받지 않길 원할 때 쓰는게 static
 *
 *  => 접근 불가한 속성은 getter, setter를 작성해서 이걸 이용해서 접근해야만 한다.
 *  C#의 프로퍼티 처럼 getter setter를 쉽게 선언해서 필드처럼 쓸 수 있다!
 */
// style guide! 
// 아래처럼 object 선언하듯이 변수: 타입 이런식으로 작성하는게 스타일 가이드임!
// 다른 ts 파일과 다른부분 주의!  변수: 타입 이게 진짜 권장사항임!!!!!
class User {
    constructor(name, age) {
        this.score = 50;
        this.name = name;
        this.age = age;
        User.x; // static 필드, 메서드는 클래스 내부에서도 이렇게 접근해ㅑㅇ함
        // this.x;  // this로 접근 안 됨
    }
    // JS에서 사실 getter setter 작명은 자유다!
    get getAge() {
        return this.age;
    }
    // :void 굳이 쓸 필요없네..
    set setAge(age) {
        this.age = age;
    }
}
User.x = 10;
const cccc = new User('park', 30);
console.log(cccc.name);
cccc.name = 'kim';
console.log(cccc.name);
console.log(User.x);
//console.log(cccc.x);  //static으로 선언한 변수는 그냥 클래스에 직접 접근해야만 함
// console.log(cccc.age); 직접 호출도 불가, 당연히 수정도 안됨 (아예 접근 불가)
// private 는 게터, 세터로만 접근 가능
// JS에서는 ㄴC# 프로퍼티처럼 필드 쓰듯이 게터 세터에 접근한다!
console.log(cccc.getAge);
cccc.setAge = 40;
console.log(cccc.getAge);
class Student extends User {
    constructor(name, age) {
        super(name, age);
    }
    doThis() {
        // protected는 상속관계 안에서는 사용 가능한 한정자임! 물론 인스턴스는 접근 불가
        console.log(this.score);
    }
}
// 숙제
class UserH {
    // 메서드도 똑같다. static 붙이는 순간 클래스에 직접 메서드가 부여됨 (인스턴스로 물려지지 않음)
    static addOne(num) {
        UserH.x += num;
    }
    static printX() {
        console.log(UserH.x);
    }
}
UserH.x = 10; // private이므로 외부에서 접근 불가, static이므로 클래스 내부에서도 this 사용 불가
UserH.y = 20; //  public이므로 외부 접근은 가능하나 static이므로 클래스명.필드 이렇게 접근해야 함
UserH.printX();
UserH.addOne(3);
UserH.printX();
class Square {
    constructor(width, height, color) {
        this.w = width;
        this.h = height;
        this.color = color;
    }
    // 순수 JS TS 만 사용해서 DOM 건드리는건
    // 선택 => 수정 , 혹은 생성 => 설정 => 원하는 DOM에 추가  이게 전부임!
    draw() {
        const body = document.getElementById('body');
        // 매번 타입 명시해주는게 정확하나 이정도는 그냥 생략해도 문제 없다. (기본적인건 자동 타입 할당해줌)
        const randH = Math.floor(Math.random() * 400);
        const randW = Math.floor(Math.random() * 400);
        // 특정 클래스의 인스턴스 혹은 속해있는 타입이 특정 클래스의 상속 관계인 경우 instanceof 사용
        if (body instanceof HTMLElement) {
            const div = document.createElement('div');
            div.style.width = `${this.w}px`;
            div.style.height = `${this.h}px`;
            div.style.backgroundColor = `${this.color}`;
            div.style.top = `${randH}px`;
            div.style.left = `${randW}px`;
            // 참고. position에는 absolute, relative, fixed, stitch 등이 존재
            //       display에는 inline, inline-block, block, flex 등이 존재
            div.style.position = 'absolute';
            body.appendChild(div);
        }
    }
}
const squa = new Square(30, 30, 'red');
for (let i = 0; i < 8; i++) {
    squa.draw();
}
// 타입도 import export 가능 게다가 쓰는법도 아예 동일함
