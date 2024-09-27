# useLayoutEffect

useEffect 와 사용방법이 동일하나, 실행 시점에서 차이가 있다.

useLayoutEffect 의 콜백함수는 **모든 DOM 의 변경 후**에 실행된다.

## useEffect, useLayoutEffect 관련 실행 순서

> 1. 리액트가 DOM 을 업데이트
> 2. useLayoutEffect 를 실행
> 3. 브라우저에 변경사항을 반영
> 4. useEffect 를 실행

코드 상으로 useEffect 가 먼저 선언되었더라도, useLayoutEffect 콜백이 먼저 실행된다.

```tsx
// useEffect, useLayoutEffect 실행 순서 예제

const Component = () => {

  ...

  useEffect(()=>{
    // 브라우저 랜더링 이후, 부수효과 처리
  },[])

  useLayoutEffect(()=>{
    // 브라우저 랜더링 이전, 부수효과 처리
  },[])

  ...

}
```

<br/>

## useLayoutEffect 의 단점

DOM 을 업데이트한 직후, useLayoutEffect 의 콜백함수의 실행이 동기적으로 뒤따른다.
**즉, 그것의 코드가 모두 처리되지 않는다면 브라우저는 새로운 화면을 그리지 않는다.**

무거운 연산이 포함된 경우, 웹 어플리케이션 성능 문제가 발생할 수 있다.

<br/>

## 언제 사용하나?

DOM 은 계산되었지만, 화면에 반영되기 직전 반드시 꼭 업데이트해야 할 경우 사용하는 것이 좋다.

- **DOM 요소를 기반으로 한 애니메이션 구현**
- 스크롤 위치 제어

<br/>

## rAF 와 useLayoutEffect 의 차이점

모두 브라우저 랜더링 전에 한번 실행되는 점이 같지만, 다음 차이점이 있다.

- 사용목적:
  - 상태 관리 및 DOM 조작
  - 브라우저의 렌더링 최적화를 위한 API, 애니메이션의 성능개선

- 렌더링 차단: 
  - useLayoutEffect 는 렌더링을 차단할 수 있다. (**동기**)
  - rAF 을 통한 랜러딩 차단은 불가하다. (실행이 늦어지더라도 화면이 그려진다. **비동기**)

- 상태 관리:
  - useLayoutEffect 는 React의 상태 관리 시스템과 통합되어 상태 변화에 직접적으로 영향을 받는다.
  - requestAnimationFrame은 React 의 상태 변화와는 독립적이다.

### rAF (requestAnimationFrame)

#### 실행 시점
  - 브라우저가 다음 리페인트를 준비하기 직전에 호출한다.
  - 렌더링 주기에 맞춰 관련하여 애니메이션을 부드럽게 실행하기 위해 설계되었다.

#### 사용 목적
  - 애니메이션 프레임을 관리한다. 
  - 브라우저의 화면 갱신 속도에 맞춰 애니메이션을 위한 연산을 한번 실행한다.