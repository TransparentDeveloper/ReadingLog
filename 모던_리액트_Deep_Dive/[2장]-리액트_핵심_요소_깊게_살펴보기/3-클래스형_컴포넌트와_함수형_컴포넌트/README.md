# 도입부
- 함수형 컴포넌트는 React 0.14 버전부터 만들어진, 근본있는 컴포넌트 선언방식이다.
- 초기 함수형 컴포넌트의 쓰임은 생명 주기, 상태를 갖지 못하고 순순히 render 만 하는 경우에 제한적으로 사용되었다.
- Hook 의 등장으로 생명주기 및 상태 관리를 함수형 컴포넌트에서도 가능하게 되자, 보일러 플레이트가 복잡한 클래스형 컴포넌트보다 함수형 컴포넌트를 더 많이 사용하기 시작했다. 

## 미리 생각해보기 
```
✔️ 클래스형 컴포넌트는 deprecated 될까?
✔️ 클래스형 컴포넌트는 몰라도 되나?
✔️ 클래스형 컴포넌트와 함수형 컴포넌트의 차이는?
```

<br/>
<br/>
<br/>
<br/>

# 클래스형 컴포넌트

```tsx
// 클래스형 컴포넌트 예시
import React from 'react'

interface SampleProps{
  required?: boolean
  text: string
}

interface SampleState{
  count: number
  isLimited?: boolean
}

class SampleComponent extends React.Component<SampleProps, SampleState>{
  /* 생성자 함수 */
  private constructor(props: SampleProps){
    super(props)
    this.state = {
      count: 0,
      isLimited: false
    }
  }
  /* 멤버 메서드, class 내부에서 활용 */
  private handleClick = () => {
    const newValue = this.state.count + 1
    this.setState({ count: newValue, isLimited: newValue >= 10 })
  }

  /* 랜더링해야할 내용을 render() 내부에 정의한다. */
  public render(){
    const {required, text} = this.props
    const {count, isLimited} = this.state

    return (
      <h2>
        Sample Component
        <div>{required ? '필수' : '필수 아님'}</div>
        <div>문자: {text}</div>
        <div>count: {count}</div>
        <button 
          onClick={this.handleClick} 
          disabled={isLimited}
        >
          버튼
        </button>
      </h2>
    )
  }
}
```

### constructor 에 대해서,,

- 컴포넌트가 초기화되는 시점에 호출된다.
- state 를 초기화할 수 있다.
- `super()` 는 컴포넌트 생성 시, 상위 컴포넌트(위 예시의 경우, React.Component) 의 생성자 함수를 호출한다.

#### constructor 없이 state 초기화
```jsx
import React from 'react'

class SampleComponent2 extends React.Component {
  // 👇 생성자 없이 상태 초기화
  state = {
    count: 1
  }

  render(){
    const {count} = this.state
    return <div>{count}</div>
  }
}
```

**constructor 없이도, state 를 초기화할 수 있다.**
> 다만, 이는 ES2022  에 추가된 문법으로, ES2022 환경을 지원하는 브라우저에서만 코드를 사용할 수 있다. 다른 방법으로는 babel plugin 을 사용해 트랜스파일링 하여 사용할 수 있다.


### props 에 대해서,,
- 컴포넌트에 특정 속성을 전달하는 용도로 쓰인다. 
- props 가 `{required?: boolean, text: string}` 형태라면, 아래와 같이 props 를 전달할 수 있다. 

  ```tsx
    <SampleComponent text="안녕하세요."/>
  ```

### state 에 대해서,,
- 클래스형 컴포넌트 내부에서 관리하는 값
- state 가 변화가 있을 때마다 리랜더링이 발생한다.

### 메서드 에 대해서,,
- 보통 `render()` 함수 내부에서 사용된다.
- 보통 DOM에서 발생하는 이벤트와 함께 사용된다.


## 클래스형 컴포넌트의 생명주기 메서드

클래스형 컴포넌트의 많은 코드가 생명주기 메서드에 의존하고 있다. 

### 생명주기 단계
  1. 마운트(mount) - 컴포넌트가 DOM 에 반영되어, 화면에 노출되는 시점
  2. 업데이트(update) - 이미 생성된 컴포넌트의 내용이 변경되는 시점
  3. 언마운트(unmount) - 컴포넌트를 DOM 에서 제거하는 시점

각 생명주기 별로, 실행되는 메서드가 구분된다. 

### Mount 시점의 주요 life-cycle method

### Update 시점의 주요 life-cycle method

### Unmount 시점의 주요 life-cycle method

## 클래스형 컴포넌트의 한계
1. 


<br/>
<br/>
<br/>
<br/>


# 함수형 컴포넌트
```tsx
// 함수형 컴포넌트 예시
type SampleProps = {
  required?: boolean
  text: string
}

export function SampleComponent({required, text}: SampleProps){
  const [count, setCount] = useState<number>(0)
  const [isLimited, setIsLimited] = useState<boolean>(false)

  function handleClick(){
    const newCount = count + 1
    setCount(newCount)
    setIsLimited(newValue >= 10)
  }
  
  return (
    <h2>
      Sample Component
      <div>{required ? '필수' : '필수 아님'}</div>
      <div>문자: {text}</div>
      <div>count: {count}</div>
      <button 
        onClick={this.handleClick} 
        disabled={isLimited}
      >
        증가
      </button>
    </h2>
  )
}
```

### 클래스형 컴포넌트와 비교해서,
- 코드가 훨씬 간결한다.
  - 보일러 플레이트가 줄었다.
- state 가 객체가 아닌 원시값으로 관리되어, 훨씬 사용하기 편해졌다. 
- this 객체를 통하지 않고, state 와 props 에 접근할 수 있게 되었다.
  - this 가 바인딩되는 대상에 주의를 기울이지 않아도 된다.

<br/>
<br/>
<br/>
<br/>

# 함수형 컴포넌트 vs 클래스형 컴포넌트

## 생명주기 메서드

> 기본적으로 **생명주기 메서드** 는 _React.Component_ 에 선언된 메서드이다.

- **클래스형 컴포넌트** 의 경우, _React.Component_ 를 상속받아, 해당 메서드를 구현할 수 있다.
- **함수형 컴포넌트** 는 props 를 받아, 단숭히 React 요소를 반환하는 함수이기 때문에 생명주기 메서드를 활용할 수 없다.
  - 단, **useEffect** Hook 을 활용할 경우, `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount` 를 **비슷하게 구현**할 수 있다.

## 랜더링된 값을 고정

_**함수형 컴포넌트**는 랜더링된 값을 고정하고,
**클래스형 컴포넌트**는 그러지 못한다._

> 예시) 버튼 클릭시, 3초 뒤에 props 의 메시지를 출력하는 컴포넌트

```jsx
// 함수형 컴포넌트
type Props = {
  message
}

export const ButtonFComponent = ({message}:Props) => {
  const showMessage = () => {
    alert('hello', message)
  }
  
  const handleClick = () => {
    setTimeout(showMessage,3000)
  }

  return <button onClick={handleClick}>버튼</button> 
}
```

```jsx
// 클래스형 컴포넌트
type Props = {
  message
}

export class ButtonCComponent extends React.Component<Props,{}>{
  private showMessage = () => {
    alert('hello', this.props.message)
  }

  private handleClick = () => {
    setTimeout(this.showMessage,3000)
  }

  public render(){
    return <button onClick={this.handleClick}>버튼</button>
  }
}
```

_만약 버튼 클릭 후, 메시지 출력 전에 props 가 변경한다면?_

### 함수형 컴포넌트 
- 클릭 시점의 props 의 메시지를 출력한다.
- 함수는 호출 시점의 입력 등 함수 스코프 환경을 기억한다. 
- 클릭 이후 최소 3초동안, `handleClick()` 의 실행이 종료되지 않았기 때문에 클릭 순간의 props 에 접근 할 수 있다.

### 클래스형 컴포넌트
- 변경된 메시지를 출력한다. 
- props 는 this (컴포넌트의 인스턴스)를 통해 접근할 수 있다. 
- 이는 단순히 객체(= this) 내부의 값이 변경된 경우로, 그 값이 변경되더라도 접근하는 순간의 값을 호출한다.
  - 시간의 흐름에 따라 변화하는 this 를 기준으로 랜더링이 발생한다.

<br/>
<br/>
<br/>

## 클래스형 컴포넌트를 공부해야 할까?

**=> 해야한다.**

1. 당분간 클래스형 컴포넌트가 사라질 계획(deprecated)은 없어 보인다.
2. 이미 수많은 클래스형 컴포넌트가 만들어졌고, 현재도 운영되고 있다. 
3. 모든 생명주기 메서드를 Hook 기반의 기능으로 대체하지 못한다.
4. 에러에 대한 처리는 클래스형 컴포넌트로만 가능하다.





