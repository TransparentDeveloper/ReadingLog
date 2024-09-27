# useReducer

useState 의 심화버전이다.

- 복잡한 상태값에 대해, 미리 정의해 놓은 시나리오에 따라 관리할 수 있다.
- 반환값은 useState 와 동일하게 길이가 2인 배열이다.

> **반환값**
>
> - state
>   - _배열의 첫번째 요소_
>   - useReducer 가 가지고 있는 값.
> - dispatcher
>  - _배열의 두번째 요소_
>   - state 를 업데이트하는 함수
>   - useState 의 setter 는 변경될 값을 받지만, useReducer 의 dispatcher 는 **\*action** 을 받는다.


> **입력 인수**
>
> - reducer
>   - _첫번째 인자_
>   - useReducer 의 action 을 정의하는 함수다. 
>
> - initialState
>   - _두번째 인자_
>   - useReducer 의 초깃값을 의미한다.
>
> - init
>   - _세번째 인자_
>   - 초기값을 생성하는 함수이다.
>   - initialState 를 인수로 하여, 그 결과로 게으른 초기화가 일어난다.

<br/>

## 사용법
```tsx
// useReducer 예시)
// counter

type State = {
  count: number
}

type Action = {
  type: 'up' | 'down' | 'reset'
  payload?: State
}

const init = (initialState: State): State => {
  return initialState
}

const initialState: State = { count: 0 }

const reducer = (state: State, action: Action) => {
  const prevCount = state.count
  const actionType = action.type
  const payload = action.payload

  switch (actionType){
    case 'up':
      return { count: prevCount + 1 }
    case 'down':
      return { count: prevCount - 1 }
    case 'reset':
      return init(payload || { count: 0 })
    default:
      throw new Error(`'${actionType}' 이름으로 정의된 액션은 없습니다.`)
  }
}

/* useReducer 기반의 custom hook */
const useCounter = () => {
  const [counter, dispatch] = useReducer(reducer, initialState);
  
  const countUp = () => {
    dispatch({ type: 'up' })
  }
  const countDown = () => {
    dispatch({ type: 'down' })
  }
  const countReset = ( resetNumber?: number ) => {
    const payload: State = { count: resetNumber ?? 0 };
    dispatch({ type: 'reset', payload })
  }
  
  return { counter, countUp, countDown, countReset}
}

const Counter = () => {
  const { counter, countUp, countDown, countReset } = useCounter()

  return (
    <div>
      <p>{counter.count}</p>
      <button onClick={countUp}>+1</button>
      <button onClick={countDown}>-1</button>
      <button onClick={() => countReset()}>reset</button>
    </div>
  )
  
}
```

<br/>

## 사용 이유

**state 값을 변경하는 시나리오를 제한함으로서, 복잡한 형태의 상태라도 그것의 변경을 쉽게 예측할 수 있게 할 수 있다.**

### 게으른 초기화에 대해서,,
- 정의하지 않아도 된다.
- 다만 게으른 초기화 함수를 정의하고 사용함으로써 다음의 이점이 있다.
  - 해당 상태값이 정말 필요한 시점에 단 한번의 연산을 실행한 뒤, 이후로는 연산 결과를 재사용한다.
  - 무거운 연산을 동반한 초기 상태 설정의 경우, 컴포넌트 랜더링 시마다 연산을 실행하지 않아도 됨으로 성능 향상을 기대할 수 있다.
- 굳이 `useReducer` 의 인자로 넣지 않아도, 초기화 함수를 만들어 두면 재사용할 수 있다. (위의 예시 참고)

## useState 와 useReducer

결국 closure 를 활용해, 상태값을 관리한다는 기본 원리는 같다. 
세부 작동원리와 쓰임에 차이가 있을 뿐이다.

_"state 값의 형태가 복잡하다면 `useState` 대신, `useReducer` 를 사용하는게 좋을 수도 있다."_