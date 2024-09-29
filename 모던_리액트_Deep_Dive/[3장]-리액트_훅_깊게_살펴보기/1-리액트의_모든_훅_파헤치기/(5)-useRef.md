# useRef

```tsx
// useRef 예시1-1)
// - 버튼 클릭 시 최초 접속 혹은 이전 클릭으로부터 경과 시간을 계산하여 alert로 표시

const Component = () => {
  const lastClickTime = useRef(new Date());

  const handleClick = () => {
    const now = new Date();
    const whenClicked =  lastClickTime.current
    const timeElapsed = Math.floor((now - whenClicked) / 1000);

    alert(`버튼을 ${timeElapsed}초 동안 클릭하지 않았습니다.`);

    lastClickTime.current = now;
  };

  return (
    <div>
      <button onClick={handleClick}>버튼 클릭</button>
    </div>
  );
};
```

- 컴포넌트 내부에서 랜더링이 일어나도 변경 가능한 상태값을 보관할 수 있다. (useState 도 이것이 가능하다.)
- useState 와의 차이점은 다음과 같다.
    - useRef 의 반환값은 current 라는 객체이고, current 내부에 변수를 저장&수정할 수 있다.
    - 보관하고 있는 값이 바꿔더라도 랜더링을 발생시키지 않는다.

## 랜더링에 영향받지 않는 변수

컴포넌트 외부에 선언하더라도 랜더링으로부터 자유롭게 값을 저장&수정할 수 있다.

```tsx
// useRef 예시1-2)
// - 1-1 의 예시에서 useRef 없이 전역변수를 사용했다.
// - 기능은 위와 같다.

let lastClickTime = new Date()

const Component = () => {

  const handleClick = () => {
    const now = new Date();
    const timeElapsed = Math.floor((now - lastClickTime) / 1000);

    alert(`버튼을 ${timeElapsed}초 동안 클릭하지 않았습니다.`);

    lastClickTime = now;
  };

  useEffect(()=>{
    lastClickTime = new Date()
  },[])

  return (
    <div>
      <button onClick={handleClick}>버튼 클릭</button>
    </div>
  );
}
```

하지만 이렇게 사용할 경우, Component 의 마운트 이전, 언마운트 이후에도 lastClickTime 는 메모리를 차지하기 때문에 효과적이지 않다. 

또한 보통의 경우 컴포넌트 인스턴스 하나당 하나의 값을 필요로 하는데, 위의 상황에선 다른 컴포넌트에서 lastClickTime 로의 접근이 가능하다.

## useRef 를 통한 DOM 접근
```tsx
// useRef 예시2)

const Component = () => {
  const inputRef = useRef(null)
  
  console.log(inputRef.current) // ✅ 정상출력: null
  
  useEffect(()=>{
  
    if(isNull(inputRef.current)) return 
    console.log(inputRef.current) // ✅ 정상출력: _"input 태그의 property 를 볼 수 있습니다.." (렌더링 이후 DOM 참조)_
  
  },[inputRef])

  return <input ref={inputRef} />
}
```

