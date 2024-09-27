# useImperativeHandle
(* 개발 과정에서는 자주 볼 수 없는 훅으로 널리 사용되지 않는다.)

<br/>

## forwardRef 살펴보기

> **ref**
>
> - ref 는 useRef 에서 반환하는 객체이다.
> - 리엑트 컴포넌트의 props 인 `ref` 에 해당 객체를 전달하여, HTMLElement 에 접근할 수 있다.


### forwardRef 를 왜 사용하는가?

부모에게서 자식에게 ref 객체를 넘겨주는 경우를 생각해보자.

아래와 같은 경우, `ref` 는 리엑트에서 미리 예약어로 지정한 탓에, 자식 객체에서 `ref` 이름의 props 에 접근할 경우 경고문이 출력된다.

```tsx
// useRef 예시1)
// ref props 로 useRef 반환 객체를 넘길 경우, 

const Parent = () => {
  const inputRef = useRef()

  useEffect(()=>{
    if(isUndefined(parentRef.current)) return 

    console.log(parentRef.current)   
  },[parentRef.current])
  
  return (
    <div>
      <Child ref={ref}/>
    </div>
  )
}

/* 자식 객체에서 `ref` 이름의 props 에 접근할 경우 경고문이 출력된다. */
const Child = ({ref}) => {
  return (
    <input ref={ref}/>
  )
}
```


그렇다면, 자식 컴포넌트의 props 이름을 `ref` 가 아닌 다른 이름으로 설정해보자.

```tsx
// useRef 예시2)
// inputRef props 로 useRef 반환 객체를 넘길 경우, 

const Parent = () => {
  const inputRef = useRef()

  useEffect(()=>{
    if(isUndefined(parentRef.current)) return 

    console.log(parentRef.current)   
  },[parentRef.current])
  
  return (
    <div>
      <Child inputRef={inputRef}/>
    </div>
  )
}

/* 자식 객체에서 `inputRef` 이름의 props 에 접근할 경우, 경고문 없이 동작한다. */
const Child = ({inputRef}) => {
  return (
    <input ref={inputRef}/>
  )
}
```

useRef 를 통해 DOM 요소에 직접 접근이 가능하다는 점을 감안할 때, ref 객체의 전달이 다른 값과 특별히 구분하는 편이 개발상에 편의를 줄 수 있다.

그래서 누구나 특정 컴포넌트로 **ref 객체가 전달될 것임을 예측**할 수 있도록 **일관성을 부여**하기 위해 **forwardRef**가 탄생했다.


```tsx

// useRef 예시3)
// forwardRef 를 활용하여 useRef 의 반환 객체를 넘길 경우, 

const Parent = () => {
  const inputRef = useRef()

  useEffect(()=>{
    if(isUndefined(parentRef.current)) return 

    console.log(parentRef.current)   
  },[parentRef.current])
  
  return (
    <div>
      <Child ref={inputRef}/>
    </div>
  )
}

/* forwardRef 를 통해, ref 객체를 props 로 전달받을 것을 예측할 수 있다. */
const Child = forwardRef((props, ref) => {
  return (
    <input ref={inputRef}/>
  )
})
```

<br/>

## useImperativeHandle 이란?

forwardRef 를 통해 부모에게서 ref 에 추가적인 값을 부여할 수 있다.

```tsx
// useImperativeHandle 예시)

const Parent = () => {
  const inputRef = useRef()

  useEffect(() => {
    if (!inputRef.current) return

    console.log(inputRef.current)
    inputRef.current.console("useImperativeHandle")
  }, [inputRef.current])

  return (
    <div>
      <Child ref={inputRef} />
    </div>
  )
}

const Child = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      console: (value) => console.log(value),
    })
  )

  return <input />
})
```

_"자식 컴포넌트에서 ref 를 조작할 경우, (협업 개발 과정에서) 그 값을 예측하기 힘들게 하기 때문에 자주 사용하지 않는 듯 하다."_