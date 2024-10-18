# Data Fetching

서버에서 실행할 수 있는 (Next.js 제공) 데이터 패칭 메서드 를 소개한다.

_"최신 Next.js 버전에서는 deprecated 된 기능이기 때문에 간단히 정리했다."_

<br/>

## getStaticPaths 와 getStaticProps

- 사용자 접근 시, 내용이 이미 결정된 페이지 (블로그, 게시판 등) 를 보여주고자 할 때 사용한다.
- getStaticPaths 와 getStaticProps 는 항상 같이 사용되어야 한다.
- getStaticPaths 는 접근 가능한 주소를 정의하고, 반환한다.
  - 정의되지 못한 주소로 사용자가 접근할 경우, 404 까꿍이다.
- getStaticProps 는 getStaticPaths 의 반환 결과를 토대로, 필요한 데이터를 fetching 하고 반환한다.
- 옵션 설정에 따라 빌드 시에 정적 페이지를 미리 준비해둘 수 있고, 사용자 요청이 있는 경우에만 페이지를 만들어 제공할 수 있다.

<br/>

## getServerSideProps
- 페이지 진입 직전에 함수가 실행된다. 
- 서버에서만 실행되며, 그렇지 못한 경우 오류가 발생한다. 
- url 경로 상의 path variable 에 접근할 수 있으면, 그것을 활용해 데이터 패칭 -> 반환 할 수 있다.
- 올바르지 못한 접근이라고 판단한다면, 랜더링 전에 다른 페이지로 redirect 할 수도 있다.

<br/>

## getInitialProps
- 페이지의 루트함수(랜더링 요소를 반환하는 함수)의 정적 메서드로 선언된다. 
- props 라는 이름의 객체를 통해 fetching 결과를 반환하지 않고, 그것을 바로 반환한다.
- 서버와 클라이언트 모두에서 실행 가능하다.