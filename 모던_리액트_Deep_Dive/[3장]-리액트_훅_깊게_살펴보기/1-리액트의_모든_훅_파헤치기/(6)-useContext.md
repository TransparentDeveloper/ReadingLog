# useContext 

## Context 란?

리액트 애플리케이션은 부모 컴포넌트와 자식 컴포넌트로 이뤄진 트리 구조를 갖고 있다.

컴포넌트 의 깊이가 깊어질 수록, props 을 전달하기도, 사용하기도 힘들어진다.

이를 **props 내려주기 (props drilling)** 이라고 한다.

**Context** 는 **props 내려주기** 를 해결하기 위해 등장한 개념으로, 이를 이용할 경우 props 전달을 명시적으로 작성하지 않아도 하위 컴포넌트에서 쉽게 props 를 호출할 수 있다.

## Context 를 함수형 컴포넌트에서 사용할 수 있게 해주는 useContext 훅

```tsx
// 예시)
// Context 와 useContext

type Props = {
  hello: string
}

const Context = createContext<Props>({hello: 'init'})

const ParentComponent = () => {
  return (
    <Context.Provider value={{hello: 'react'}}>
      <ChildComponent/>
    </Context.Provider>
  )
}

const ChildComponent = () => {
  const {hello} = useContext(Context)
  return (
    <p>{hello}</p> 
  )
}
```

### useContext

함수형 컴포넌트에서, 상위 컴포넌트에서 만들어진 context 값을 쉽게 호출할 수 있는 훅이다.

이를 사용하는 컴포넌트는 `<Context.Provider/>` 로 감싸져 있어야 하고, 해당 Provider 에서 명시된 값을 받을 수 있다.

같은 Context 에 대해 Provider 가 여러개 라면, 가장 가까운 Provider 의 값을 받는다.

```tsx
// 예시)
// 가장 가까운 Provider 값에 접근할 수 있다.

type Member = {
  name: string
  age: number
}
type Admin = {
  name: string
  role: string
}


const MemberContext = createContext<Member|null>(null)
const AdminContext = createContext<Admin|null>(null)

const ParentComponent = () => {
  return (
    <MemberContext.Provider value={{ name: 'yunshin', age: 20, }}>
      <AdminContext.Provider value={{ name: 'jeff', role: 'CTO' }}>
        <ChildComponent/>
      </AdminContext.Provider>
    </MemberContext.Provider>
  )
}

const ChildComponent = () => {
  const {name} = useContext(Context)
  console.log(name) // ✅ 정상출력: jeff
  return (
    <p>{name}</p> 
  )
}
```

### 존재하지 않는 context 를 호출할 경우에 대한 에러 처리

```tsx
// 예시)
// context 에러 방지

type Props = {
  hello: string
}

const Context = createContext<Props>({hello: 'init'})

const ContextProvider = ({children, text}:PropsWithChildren<{text: string}>) => {
  return (
    <Context.Provider value={{ hello: text}}>
      {children}
    </Context.Provider>
  )  
}

/* 👇 컨텍스트가 존재하는 환경인지 확인 + context 사용 편의 목적의 커스텀훅 */
const useMyContext = () => {
  const context = useContext(Context)

  if (context === undefined){
    throw new Error("Context 가 준비되지 않았습니다.")
  }

  return context
}


const ParentComponent = () => {
  return (
    <ContextProvider text="react">
      <ChildComponent/>
    </ContextProvider>
  )
}


const ChildComponent = () => {
  const {hello} = useMyContext()

  return (
    <p>{hello}</p>
  )
}
```

## useContext 를 사용할 때 주의할 점

### Provider 의 위치

Provider 하위에서 사용할 수 있다는 제약 때문에, 재사용성이 줄어든다.

이를 해결하기 위해 Provider 를 루트 컴포넌트에 넣을 수도 있지만, Provider 에 명시한 값의 호출이 빈번하지 않은 이상 리소스 낭비일 것이다. 이러한 측면에서, Provider 의 범위를 좁혀야 한다.

> 리소스 낭비를 막기 위해 Provider 의 좁혀야 하지만, 
> useContext 을 포함한 컴포넌트의 재사용성을 높히기 위해선 Provider 의 범위가 넓어야 한다.

### useContext 는 상태관리를 위한 API 가 아니다.

콘텍스트는 단순히 props 값을 하위로 전달해 줄 뿐, 상태 관리 최적화가 불가능 하다.

useContext 로는 주입된 상태를 사용할 수 있을 뿐, 랜더링 최적화에는 아무런 영향을 주지 못한다.
