# renderToNodeStream
- renderToString 과 동일한 결과을 출력한다. 


## renderToNodeStream 과 renderToString 의 차이점
- renderToNodeStream 은 브라우저 환경에서 실행할 수 없다.
  - renderToString, 그리고 renderToStaticMarkup 의 경우, 브라우저에서도 실행할 수 있다. 
  - 하지만 굳이 브라우저에서 실행할 이유는 없다. (초기 랜더링 속도 향상 + SEO 이점이 사라진다.)

- renderToString 의 반환은 String 타입의 HTML 이지만, renderToNodeStream 의 반환은 ReadableStream 이다. 

> ReadableStream 이란?
>
> - utf-8 로 인코딩된 바이트 스트림이다. 
> - 네트워크 요청이나 파일 처리와 같은 비동기 작업에서 큰 데이터를 효율적으로 처리하기 위해 사용한다.


## renderToNodeStream 을 왜 사용하나?
- 브라우저로 전송해야할 HTML 문서의 크기가 클 경우, 서버에서 랜더링이 완료될 때까지 브라우저는 빈화면만 출력한다. 
- renderToNodeStream 을 사용한다면 큰 컴포넌트를 쪼개어 완성된 결과물부터 chunk 단위로 브라우저로 전송하기 때문에 서버의 부담도 덜고 UX 개선도 기대할 수 있다.
- 대부분의 리액트 기반 SSR 프레임워크에서 renderToString 대신 renderToNodeStream 을 기본으로 채택하고 있다.
