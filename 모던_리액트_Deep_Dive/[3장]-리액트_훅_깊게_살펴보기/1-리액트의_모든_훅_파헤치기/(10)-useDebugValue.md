# useDebugValue

배포된 웹서비스에서 사용하는 훅이 아니다.
개발 과정에서 "리액트 개발자 도구"를 통해 해당 훅의 사용 결과를 확인할 수 있다.

```tsx
// 예시)

// custom-hook 작성
const useDate = () => { 
  const date = new Date()
  
  /*👇useDebugValue() 사용*/
  useDebugValue = (date, (date) => date.toDateString())
  
  return date
}

const Component = () => {
  ...
  const date = useDate()
  ...
  return (...)
}
```

useDebugValue 는 반드시 커스텀훅 내부에서 사용되어야한다.

첫번째 인자의 값이 이전과 같은 아무런 호출이 발생하지 않는다. 

첫번쨰 인자의 값이 이전과 다르다면, 포멧팅 함수의 반환 결과가 react dev-tools 를 통해 노출된다.