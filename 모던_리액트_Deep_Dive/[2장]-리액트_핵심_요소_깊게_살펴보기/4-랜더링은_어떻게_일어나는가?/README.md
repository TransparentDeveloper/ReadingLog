# 도입부
- **브라우저 의 랜더링**: HTML 과 CSS 를 기반으로 웹페이지에 필요한 UI 를 그리는 과정
- **리액트 의 랜더링**: 브라우저 랜더링에 필요한 DOM 트리를 만드는 과정


# 리액트의 랜더링이란?

- props 와 state 의 값을 기반으로 DOM 결과를 만들어 브라우저에게 제공하는 일련의 과정이다.
- 만약 컴포넌트가 props 와 state 를 가지고 있지 않다면, 오직 JSX 값에 기반해 랜더링이 발생한다.

**⚠️ 브라우저의 랜더링과 혼동해서는 안된다.**

# 리액트의 랜더링이 일어나는 이유

## 랜더링은 언제/어떻게 발생하는가?



### 최초 랜더링
> 사용자가 처음 애플리케이션을 진입한 경우

### 리랜더링
> 최초 랜더링 이후, 발생하는 모든 랜더링

- 클래스형 컴포넌트의 `setState` 가 실행되는 경우
  - state 의 변화는 컴포넌트 상태의 변화를 의미한다.

- 클래스형 컴포넌트의 `forceUpdate` 가 실행되는 경우
  - 클래스형 컴포넌트에서 랜더링을 수행하는 것은 인스턴스 메서드인 `render` 이다.
  - `render` 가 props 나 state 가 아닌 다른 값에 의존하고 있다면, `setState` 등을 통해 리랜더링을 일으킬 수 없다.
  - 위와 같은 경우, `forceUpdate` 를 실행하여 리랜더링을 일으킬 수 있다.
  - `forceUpdate` 를 실행할 경우 `shouldComponentUpdate` 의 호출은 일어나지 않는데, 이는 하위의 모든 컴포넌트에 적용된다.

- 함수형 컴포넌트의 `useState` 의 두번째 배열 요소인 setter 가 실행되는 경우
  - 클래스형 컴포넌트의 `setState` 와 마찬가지로, state 를 업데이트하는 함수이다.

- 함수형 컴포넌트의 `useReducer` 의 두번째 배열 요소인 dispatch 가 샐행되는 경우
  - `useState` 와 마찬가지로 상태와 상태를 업데이트하는 함수를 배열로 제공한다.
  - 배열의 두번째 요소를 실행하면, 컴포넌트의 리랜더링이 일어난다.

- 컴포넌트의 key props 가 변경되는 경우
  - _(하단에 별도로 작성)_

- props 가 변경되는 경우

- 부모컴포넌트에서 랜더링이 발생한 경우, 그것의 자식 컴포넌트에서도 랜더링이 발생한다.

#### 위에서 언급된 경우를 제외한다면,,

**리액트의 랜더링은 발생하지 않는다.**

> `useState` 등으로 관리되지 않는 변수는 아무리 변경해도 리랜더링이 일어나지 않는다.

```tsx
/*
  case) useState 로 관리되지 않는 값을 변경
  expect) 버튼 클릭 시, (useState 관리x) 변수가 변경되고,
  then) 아무일도 없었다..
*/
function Compo(){
  let state = 10
  
  const onHandleState = () => {
    state+=1
  }

  return(
    <div>
      <p>count: {state}<p>
      <button onClick={onHandleState}>+1</button>
    </div> 
  )
}
```


### Key Props

> current 트리와 workInProgress 트리 사이에서 어떠한 변경이 있었는지 구별해야 하는데, 이를 구별하는 값이 key 이다.

**특징 1)**
리액트에서 key 는 명시적으로 선언돼 있지 않더라도, 모든 컴포넌트에서 사용할 수 있는 특수한 props 이다.

**특징 2)**
리렌더링이 발생하는 동안 형제 요소들 사이에서 동일한 요소를 식별하는 값이다. 

**특징 3)**
리액트에서 배열에 key 를 쓰지 않으면 콘솔에 경고가 출력된다. 
_(그렇다고 오류가 발생하는 것은 아니므로, 애플리케이션이 중지되지는 않는다.)_

**특징 4)**
부모의 UI 상태가 변경되더라도 자식의 key 가 이전과 동일하다면 자식의 리랜더링은 발생하지 않는다.
(그러므로 key 는 항상 고유한 값을 활용해야한다. _아래 예시 참고_)

```tsx
/* 
 * key props 예시 1) 
 * 고유한 key 를 활용할 경우, 부모의 리랜더링에 의존하지 않는다.
 */
export default function Attendance( {members} : {members: Member[]} ){
  return (
    <ul>
      {
        members.map((member,idx) =>
          {
            return <Member key={member.id} member={member}/>
          }
        )
      }
    </ul>
  )
}

function Member({member}:{member: Member}){
  return (
    <div>
      <span>이름: {member.name}</span>
      <span>나이: {member.age}</span>
    </div>
  )
}
```

```tsx
/* 
 * key props 예시 2) 
 * 부모의 리랜더링에 따라 key 가 변경될 경우, 자식의 리랜더링은 부모에 의존한다.
 */
export default function Attendance( {members} : {members: Member[]} ) {

  return (
    <ul>
      {
        members.map((member,idx) =>
          {
            return <Member key={Math.random()} member={member}/>
          }
        )
      }
    </ul>
  )
}

function Member( {member} : {member: Member} ) {

  return (
    <div>
      <span>이름: {member.name}</span>
      <span>나이: {member.age}</span>
    </div>
  )
}
```

## 리액트 전역 상태 관리 패키지 (mobx-react, react-redux)

Mobx, Redux 는 라이브러리 어디에선가 각자의 방법으로 상태를 관리한다.
**그러나 이것이 리액트의 리랜더링이 이어지지는 않는다.**

mobx-react, react-redux 같은 리액트 패키지가 위에서 정리한 케이스 중 한가지 방법으로 변경된 상태에 대한 리랜더링을 발생시키는 것이다.


# 리액트의 랜더링 프로세스

1. 루트 컴포넌트부터 시작해 모든 컴포넌트를 순회한다.
2. 순회 중, 업데이트가 필요한 컴포넌트를 찾는다.
3. 업데이트가 필요한 컴포넌트를 발견하면, 그 결과물 (JSX) 을 저장한다.
  - 클래스형 컴포넌트라면, `render` 를 호출한다.
  - 함수형 컴포넌트라면, 그 자체를 호출한다.
4. JSX 를 Javascript 로 컴파일한다.
5. 컴파일 결과로 `React.createElement()` 가 생성되고 이를 호출하여, React Element (자바스크립트 객체)를 반환한다.
6. React Element 로 새로운 V-DOM 을 만들고, 실제 DOM 에 반영한다.

> 랜더링 결과물을 수집하고, 기존의 V-DOM 과 새로운 V-DOM 을 비교
﹒계산하는 과정을 재조정(Reconciliation) 이라고 한다.

아래는 함수형 컴포넌트부터 시작해, V-DOM 생성을 위한 Javascript 객체가 만들어지는 과정이다.

```tsx
/* 1. (변환 전) 함수형 컴포넌트 */
function Hello(){
  return (
    <TestCompo a={10} b="123">
      안녕하세요.
    </TestCompo>
  )
}

/* 2. JSX 문법 -> Javascript 함수로 변환 */
function Hello(){
  return (
    React.createElement(
      TestComp,
      { a: 10, b: '123'},
      '안녕하세요.'
    )
  )
}

/* 3. React Element 타입의 Javascript 객체로 변환 */
{
  type: TestComp,
  props:  { a: 10, b: '123', children: "안녕하세요."}
}
```

# 랜더와 커밋

- 리액트의 랜더링은 랜더 단계와 커밋 단계로 이뤄진다.
- 위의 두 단계는 분리되어 실행된다.

## Render Phase
- 컴포넌트를 랜더링하고, 변경 사항을 계산하는 모든 작업
- 컴포넌트를 실행해, `render`, return 의 결과물을 이전의 V-DOM 의 것과 비교하여, 변경이 필요한 컴포넌트를 체크한다. 
- 비교대상은 다음과 같다. (`type`,`props`,`key`)

## Commit Phase

- Render Phase 의 변경사항을 실제 DOM 에 적용해 사용자에게 보여주는 과정이다.
- 이 단계가 끝나면, 브라우저의 랜더링이 발생한다.
- 리액트가 DOM 을 업데이트하면, 클래스형 컴포넌트에서는 `componentDidMount`, `componentDidUpdate` 가 실행되고 함수형 컴포넌트에서는 `useLayoutEffect` 훅이 호출된다.


## 리액트의 랜더링이 DOM 업데이트로 이어지진 않는다.
- 리액트의 랜더링 프로세스가 진행되더라도, 최종적으로 변경사항이 감지되지 않는다면 Commit Phase 는 생략될 수 있다.

## 리액트의 랜더링은 동기식으로 작동했다.
- 랜더링 과정이 길어지는만큼, 브라우저는 다른 작업을 지연시켰다.
  - 애플리케이션의 성능 저하 & UX 악화
- 만약 비동기적으로 작동했다면, 같은 상태 변화에 대해 컴포넌트마다 보여지는 ui 가 제각기 변경되었을 것이다.

## 리액트 18에서,,
- 그럼에도 비동기 랜더링이 유효할 상황도 있다.
  - 예를 들어, B 의 랜더링 작업이 무겁다면 빠르게 랜더링할 수 있는 컴포넌트부터 변경하면 된다.
- 리엑트 18부터 "비동기 랜더링", "동시성 랜더링" 을 지원한다.
  - "동시성 랜더링" 은 특정 랜더링의 우선순위를 낮추거나, 필요에 따라 중단 후 재시작, 포기 할 수 있다.
