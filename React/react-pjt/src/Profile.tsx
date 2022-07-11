// 컴퍼넌트에 대해 return 타입 이렇게 명시해주는 습관 들이자!

type ProfileType = {
  name: string;
}
// 이렇게 props에 대한 타입, 반환형 타입 지정해주어야함,
// props 자체가 object형태로 전달된다!
/**
 * 
 * @param props 
 * 여기서 props.name만 존재하므로 type을 위처럼 선언
 * 만약 object 형태로 전달되는 props가 있다면
 * props명: object 이걸 위에 type에 추가해주면 됨!
 * (즉 props한 데이터들에 대해 위에 type 명시를 해주어야 한다는게 포인트)
 * 
 * @returns 
 */
function Profile(props: ProfileType): JSX.Element {
  return (
    <div>{props.name} 프로필이네</div>
  )
}

export default Profile;