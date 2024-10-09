# hydrate

- renderToString 과 renderToNodeStream 를 거쳐 랜더링된 HTML 컨텐츠에 이벤트 핸들러를 붙히는 작업을 한다. 
  - renderToStaticMarkup 이나 renderToStaticNodeStream 의 경우, hydrate 의 대상이 아니다.

- hydrate는 서버에서 렌더링된 HTML을 재사용하여 이벤트 핸들러와 상태를 연결한다.

- 정적인 HTML 에 이벤트와 핸들러를 붙여 인터렉션이 가능한 웹페이지 결과물을 만든다.

<br/>

## render

- render 는 브라우저 메서드이다. 
- render 는 함수형 컴포넌트와 HTML의 요소를 받는다.
  - 이것은 hydrate 와 거의 유사하다.

```tsx
// render 사용 예제
import * as ReactDOM from 'react-dom'
import App from './App'

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)
```

- HTML 요소에 컴포넌트를 랜더링할 뿐만 아니라 이벤트 핸들러를 추가하는 역할도 수행한다.


<br/>

## hydrate 는 render 와 달리..

```tsx
// hydrate 사용 예제
import * as ReactDOM from 'react-dom'
import App from './App'

const element = document.getElementById(containerId)
ReactDOM.hydrate(<App/>,element)
```

- 이미 화면에 그려진 HTML 이 있음을 전제하고, **이벤트를 붙히는 작업**만 실행한다.
  - 서버에서 넘어온 HTML 과 같은지 비교하기 위해서, 컴포넌트를 HTML 로 만드는 작업도 수행한다.
- 서버에서 넘겨준 HTML 과 브라우저에 그려진 HTML 이 같아야 한다.
- 빈 HTML 에 새로운 요소를 추가하는 등, 랜더링 과정을 거치는 render 와의 결정적 차이점이다.


<br/>

## 서버에서 제공된 HTML과 클라이언트에서 hydrate한 결과가 다르면?

> **예를 들어)**
>
> renderToStaticMarkup 혹은 renderToStaticNodeStream 을 통한 컴포넌트의 경우, `data-reactroot` 속성이 누락된다.

- 경고가 출력된다.
- 하지만 페이지는 정상적으로 그려진다. 
  - hydrate 를 통한 결과물을 출력한다.
  - **이는 브라우저에서 다시 랜더링된 것임으로 SSR 의 이점이 사라진다.**