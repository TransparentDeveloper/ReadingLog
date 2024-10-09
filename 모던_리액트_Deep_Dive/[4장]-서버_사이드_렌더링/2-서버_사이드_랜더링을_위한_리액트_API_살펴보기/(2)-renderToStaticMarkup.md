# renderToStaticMarkup
- renderToString 과 유사하다. 
  - 구체적으로 초기 랜더링 속도 향상을 목표로 하는 것, react element 를 html 문자열로 변환하는 것 등이 유사하다.
- 다만 아래와 같은 차이점이 있다.

<br/>

## renderToStaticMarkup 와 renderToString 의 차이점
- `data-reactroot` 와 같이 리액트에서만 사용하는 DOM 속성을 추가하지 않는다.
- 또한 리액트에서 제공하는 브라우저 API (hook 등)은 절대로 실행할 수 없다. 
- **즉, 리액트와 관련한 코드는 결과에서 배제된다. => 순수한 HTML 이 반환된다.**
- 리액트 관련 속성도 취급하지 않음으로, 함수의 결과(HTML 문자열)의 크기가 renderToString 의 그것보다 약간이라도 줄일 수 있다.

<br/>

## renderToStaticMarkup 는 언제 사용하나?
- (Hook 이나 이벤트 리스너를 달지 않은) 순수 컴포넌트를 제공해야할 경우, 고려할 수 있는 API 이다.