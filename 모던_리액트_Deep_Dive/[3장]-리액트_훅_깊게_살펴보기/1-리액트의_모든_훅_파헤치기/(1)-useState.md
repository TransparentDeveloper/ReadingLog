# useState

함수형 컴포넌트 내부에서 상태를 정의하고, 상태를 관리할 수 있게 해주는 훅(Hook) 이다.

## useState 구현 살펴보기

**useState 는 다음과 같은 동작이 가능해야 한다.**

```
- useState 의 입력으로 아무것도 넣어주지 않으면, 상태는 undefined 로 초기화된다.
- useState 의 반환은 배열이다. 
- 반환된 배열의 첫번째 요소는 state 값 자체이다.
- 반환된 배열의 두번째 요소는 state 를 업데이트할 수 있는 함수이다.
```

### useState 없이, 자체적으로 변수를 선언해 상태값으로 관리한다면?

```tsx
// 예시 1)
// useState 없이 상태 관리

const Counter = () => {
  let state = 0

  const onHandleState = () => {
    state ++
  }

  return (
    <div>
      <p>카운터 : {state}</p>
      <button onClick={onHandleState}>+1</button>
    <div>
  )
}
```

> ❌, 리랜더링이 발생하지 않는다.
> 
> useState 로 관리되지 않는 변수를 아무리 변경해도 랜더링이 발생하지 않는다.

### useState 를 상태 관리가 아닌, 랜더링을 발생시키기 위한 목적으로 사용한다면?

```tsx
// 예시 2)
// useState 사용목적: 상태 관리 x, 컴포넌트 랜더링 o

const Counter = () => {
  let state = 0
  const [,forceRender] = useState()

  const onHandleState = () => {
    state ++
    forceRender()
  }

  return (
    <div>
      <p>카운터 : {state}</p>
      <button onClick={onHandleState}>+1</button>
    <div>
  )
}
```

> ❌, 리랜더링이 발생하지 않는다.
> 
> - 상태 업데이트 함수(`forceRender`) 를 실행해도, 컴포넌트의 반환 결과인 JSX 문법에는 변화가 없기 때문에 리랜더링은 일어나지 않았다.
> - `state` 는 `forceRender` 의 실행으로 다시 0 으로 초기화되었다.
>
>
- **버튼 클릭시**
  1. state 업데이트
  2. forceRender 실행
  3. Counter 다시 호출, (state 초기화)
  4. 이전 Counter 의 반환과 재호출된 Counter 의 반환을 비교
  5. 업데이트 내역이 없으므로 리랜더링은 발생하지 않는다. 


### 클로저 (Closure)

**실제로 useState 가 클로저를 통해 구현되어있는지는 알 수 없다.**

> React 팀에서 useState 실제 구현 코드를 버전 관리 대상에서 제외하였기 때문에, 정확히 알 수 없다.
> _참고로, React 의 경량화 버전인 PReact 에서는 useState 의 구현에 클로저가 활용되었음을 알 수 있다._

컴포넌트가 새롭게 재호출되더라도 useState 의 반환을 통해 이전 값에 접근할 수 있다는 것을 보아, 이는 useState 를 클로저에 의존해 구현했음을 짐작할 수 있다.


## 게으른 초기화

일반적으로 useState 의 기본값 설정을 위해, 기본값으로 특정한 값(원시값, 배열, 객체) 등을 넣는 경우가 대부분일 것이다.

하지만 **그러한 값을 반환하는 함수**를 **useState 의 입력**으로 넣을 수도 있는데, 이것을 **게으른 초기화** 라고 한다.

```tsx
// 예시 1)
// 특정값을 집어 넣는 경우 
const [count, setCount] = useState(123)
```

```tsx
// 예시 2)
// 게으른 초기화
const [count, setCount] = useState(()=>(123))
```

### 게으른 초기화를 사용하는 경우

- useState 의 초기값이 복잡하고 무거운 연산을 포함하고 있는 경우에 사용해야한다.
  - **무거운 연산이란**, 예를 들어 webStorage 접근 혹은, 배열의 순회 등을 의미한다.
- 첫 랜더링 시에만 초기값 설정을 위해 함수가 한번 실행되고, 리랜더링 시 함수의 실행은 일어나지 않는다.

```tsx
// 예시)
// hashKey를 기반으로 랜덤한 색상의 Box 컴포넌트 생성

const RandomColorBox = ({hashKey, notice, children} : PropsWithChildren<{hashKey?: string, notice: string}> ) => {
  const [hexCode, setHexCode] = useState<string>(
    () => {
      if(typeof hashKey == 'undefined') 
        hashKey = Math.random().toString()
      return (getRandomHex(hashKey))
    }
  )

  const onHandleRed = () => {
    const setHexCode(
      (prev) => {
        /* Red 속성 변경 로직 */
        return newHex
      }
    )
  }


  return (
    <div
      className="flex justify-center items-center w-fit h-32 p-2"
      style={{ backgroundColor: hexCode }} 
    >
      {children}

      <button onClick={onHandleRed}>+Red<button>
    </div>
  )
}

function getRandomHex(hasKey: string){
  const keySize = hashKey.length

  const RED_RANGE = [0, 2]; 
  const GREEN_RANGE = [2, 4]; 
  const BLUE_RANGE = [4, 6]; 
  
  const hashValue = ((((keySize + 123) * 13) - 321) / 17).toString()

  const red = parseInt(hashValue.slice(...RED_RANGE)).toString(16).padStart(2.'0')
  const blue = parseInt(hashValue.slice(...BLUE_RANGE)).toString(16).padStart(2.'0')
  const green = parseInt(hashValue.slice(...GREEN_RANGE)).toString(16).padStart(2.'0')
  
  return `#${red}${green}${blue}`
}
```