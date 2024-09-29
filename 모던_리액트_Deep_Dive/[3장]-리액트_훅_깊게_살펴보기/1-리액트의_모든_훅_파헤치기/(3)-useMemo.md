# useMemo

- 리액트에서 최적화를 떠올릴 때 가장 먼저 언급되는 훅이다.
- 랜더링 발생 시, 
  - 의존성 배열의 값이 변경되지 않았다면, 함수를 다시 실행하지 않고 기억하고 있는 이전 결과를 반환한다.
  - 의존성 배열의 값이 변경되었다면, 함수를 실행하고 그 값을 기억해둔다.
- 단순히 값 뿐만 아니라, 컴포넌트도 기억할 수 있다.
  - 보통 React.memo 를 사용한다.

```tsx
// useMemo 예시)
// - Component 메모이제이션
// - 달력(Calendar)을 출력하기 위해서 '연도' 와 '월' 을 기준으로 꽤 많은 연산이 이뤄진다.
// - 만약 이를 사용하는 부모 컴포넌트 위치에서 리랜더링 발생 요인이 많을 경우, 비효율적인 랜더링이 발생할 수 있다.
// - 이를 useMemo 를 통해 성능 최적화를 이룰 수 있다.

const ReservationPage = () => {
  const [someState1, setSomeState1] = useState()
  const [someState2, setSomeState2] = useState()

  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  
  const MemoizedCalendar = useMemo(() => {
    return <Calendar year={year} month={month} />;
  }, [year, month]);

  return (
    <>
      {/**..생략..*/}
      {MemoizedCalendar}
      {/**..생략..*/}
    </>
  )
}

const Calendar = ({year, month}) => {
  const dates = getDates(year,month)
  return (
    <>
      {/**..생략..*/}
      {/* dates 사용 */}
    </>
  )
}
```