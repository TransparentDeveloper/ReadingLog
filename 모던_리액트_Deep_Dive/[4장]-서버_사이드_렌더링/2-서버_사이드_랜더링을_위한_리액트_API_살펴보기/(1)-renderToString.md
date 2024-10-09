# renderToString
- SSR 구현하는 데에 가장 기초적인 API 이다.
- (서버 사이드에서) 리액트 컴포넌트를 HTML 문자열로 반환하는 함수이다. 


```tsx
// renderToString 사용 예제

import {createElement} from 'react'
import {renderToString} from 'react-dom/server'

const SampleComponent = () => {
  const fruits = ['apple','banana','orange']

  /**/
  useEffect(()=>{
    console.log('Rendering!!')
  },[])

  const onClickLI = (fruit) => {
    console.log(`${fruit} 클릭했다.`)
  }
  
  return (
    <ul>
      {
        fruits.map((fruit,idx)=> {
            <li 
              key={idx} 
              onClick={()=>{onClickLI(fruit)}}>
                {fruit}
            </li>
          })
      }
    </ul>
  )
}

const htmlString = renderToString(
  createElement('div',{id: 'root'},<SampleComponent/>)
)
```

**`SampleComponent` 의 Hook(useEffect) 와 이벤트핸들러(onClickLI) 등은 renderToString 의 결과에 포함되지 않는다.**

<br/>

## renderToString 의 목적

- SSR 은 브라우저가 빠르게 랜더링할 수 있도록 서버에서 HTML 을 제공한다.
- hook 이나 이벤트 핸들러는 클라이언트에서 실행되는 JS 코드이다. 
- 정리하자면, 화면을 구성하는 HTML 문서만 전달하여 빠르게 랜더링하고 JS 코드는 별도로 제공하도록 설계한 것이다. 
- **renderToString 의 목적은 리액트 컴포넌트의 최초 랜더링 속도를 빠르게 하는 것이다.**

<br/>

## 속성(Property), `data-reactroot` 
- 리액트 컴포넌트의 root element 를 식별할 수 있는 속성이다.
- 해당 속성을 가진 element 를 기준으로 이후에 나올 API 인 `hydrate` 실행 범위가 결정된다.