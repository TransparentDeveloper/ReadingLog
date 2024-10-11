# Next.js 시작하기

```sh
npx create-next-app@latest --ts
```
<br/>

## [package.json](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/package.json)

- 프로젝트 구동에 필요한 모든 명령어 및 의존성이 포함돼있다.
- 주요 의존성에 대해서..
  - next: Next.js 의 기반이 되는 패키지
  - eslint-config-next: core web vital 에 도움이 되는 규칙이 내장된 Next.js 기반 ESLint 설정이다.

<br/>

## [next.config.js](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/next.config.mjs)

- Next.js 프로젝트의 환경 설정을 담당한다.
- **Next.js 를 다루려면 반드시 알아야한다.**



```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

> `@type ~~` 에 대해서
>
> 자바스크립트 파일에 타입스크립트의 타입 도움을 받기위한 주석이다. **특별한 이유가 없다면 사용한다.**

주요 옵션에 대해서 알아본다.

> `reactStrictMode`
>
> - 리액트 엄격 모드와 관련된 옵션이다.
> - 위험한 코드 스타일 등을 방지하는 등의 기능을 함으로 **특별한 이유가 없다면 true 로 설정한다.**

> `swcMinify`
>
> _(책에는 없는 내용: Next.js 15 버전 부터 활성화되는 것이 기본 설정되었다. 고로 해당 속성은 deprecated 되었다.)_
> - swc 를 기반으로 코드 최소화 작업을 할 것인지 여부를 설정할 수 있다.
>   - swc 는 vercel 에서 오픈소스로 개발한 번들링 툴이다.
>   - swc 는 실행속도가 아주 빠른 rust 언어로 동작하고 병렬 작업 처리가 가능하기 때문에 다른 번들링 툴보다 빠르다.

<br/>

## [pages/_app.tsx](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/pages/_app.tsx)

_* 참고로, src/pages/_app.tsx 또한 동일하게 작동한다._

- 해당 파일에서 export default 로 내보낸 함수는 애플리케이션 전체 페이지의 시작점이다.
- 웹 애플리케이션에서 공통으로 설정해야 하는 것들을 이곳에서 실행하다. (아래는 그러한 설정의 예이다.)
  - 애플리케이션 전역에서 발생하는 에러 처리 (에러 바운더리)
  - reset.css 같은 전역 CSS 선언
  - 모든 페이지에 공통으로 사용하는 데이터 제공

<br/>

## [pages/_document.tsx](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/pages/_document.tsx)

_* 해당 파일은 존재하지 않아도 프로젝트 실행에는 문제가 없다._

### _app.tsx VS _document.tsx

> **_app.tsx**
>
> - 애플리케이션 페이지 전체를 초기화한다.
> - Next.js 초기 설정에 필요한 코드를 관리한다.
> - 기본적으로 서버에서 랜더링되지만, 클라이언트에서도 랜더링될 수 있다.

> **_document.tsx**
> 
> - 애플리케이션의 HTML 을 초기화한다.
> - HTML 설정과 관련된 코드를 추가하는 곳으로, SEO 에 필요한 정보나 title 등의 설정이 가능하다.
> - 반드시 서버에서만 랜더링된다.

<br/>

## pages/_error.tsx

_* 해당 파일은 존재하지 않아도 프로젝트 실행에는 문제가 없다._

- 프로젝트 전역에서 발생한 처리되지 않은 에러는 해당 페이지에서 catch 하여 에러 UI 를 출력할 수 있다.
- 단, 개발 모드에서는 해당 페이지의 방문이 제한된다.
  - 정상 작동의 유무를 판단하기 위해서는 프로덕션으로 빌드 후 확인해야한다.

<br/>

## pages/404.tsx

- 404 페이지를 정의할 수 있다.
- 생성하지 않으면, Next.js 가 제공하는 페이지가 출력된다.

<br/>

## pages/500.tsx

- 서버사이드 에러를 핸들링하는 페이지를 구성할 수 있다.
- _error.tsx 보다 우선하여 실행한다.
- 500.tsx, _error.tsx 두 파일이 모두 없다면, Next.js 가 제공하는 페이지가 출력된다.

<br/>

> _지금까지의 `_app.tsx`, `_error.tsx`, `_document.tsx`, `404.tsx`, `500.tsx` 는 Next.js 에서 제공하는 예약어이다._

<br/>

## [pages/index.tsx](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/pages/index.tsx)

_파일의 이름이 굳이 index 일 필요 없이, 예약어를 피해 자유롭게 이름지어도 된다._

- 웹사이트의 루트이며, 루트 주소(예를들어 localhost:3000)에서 보여질 페이지를 구성할 수 있다.
- pages 라는 디렉토리명이 주소에 포함되지 않지만, 그 하위에 만들어질 디렉토리는 주소에 반영된다.
  - pages/index.tsx -> localhost:3000
  - pages/hello/index.tsx -> localhost:3000/hello
  - pages/hello/world/index.tsx -> localhost:3000/hello/world

- [] 를 활용한 디렉토리/파일 명에는 어떠한 문자도 동적으로 할당될 수 있다.
  - pages/[var]/index.tsx -> localhost:3000/1 ,localhost:3000/12 ,localhost:3000/123

- pages/hi/[...props].tsx 와 같이 [] 안에 전개 연산자가 있을 경우, 부모 디렉토리의 모든 하위 주소를 props 라는 변수로 받을 수 있다.
  - pages/hi/[...props].tsx 파일이 있을 때,
  - localhost:3000/hi/a/b/c 와 같은 URL이 요청되면,
  - props 배열에는 ['a', 'b', 'c']가 할당된다.


### 서버 라우팅과 클라이언트 라우팅의 차이

- Next.js 는 SSR을 수행하지만 동시에 SPA 의 특징인 클라이언트 라우팅을 수행하기도 한다.
- 서버 라우팅의 경우 페이지 이동 시, 서버에서 새로운 페이지에 대한 랜더링 후 클라이언트에서 hydrate 하는 과정을 거친다.
  - 브라우저에 새로운 페이지가 로드될 때까지 일시적인 깜박임이 발생한다. 
- 클라언트 라우팅은 새로운 페이지에 대한 js 파일만 빨리 받아 클라이언트 측에서 랜더링한다. 
  - SPA 처럼 자연스러운 페이지 전환이 일어난다. 


**Next.js 는 SSR 특징인 빠른 최초로딩과 SPA 특징인 자연스러운 라우팅이라는 두 장점을 모두 가진다.**

> **페이지 이동시, 다음과 같은 방법을 사용하자.**
> 
> - \<a> 대신 \<Link> 를 사용한다.
> - window.location.push 대신 router.push 를 사용한다.
> 
> _* 서버 라우팅 대신 필요한 js 모듈만 호출하는 클라이언트 라우팅 방식이 성능적으로나 ux적으로나 더 낫다._

<br/>

## [pages/api/hello.ts](https://github.com/TransparentDeveloper/ReadingLog/blob/main/code-example/modern-react-deep-dive/4-get-started-with-nextjs/pages/api)

- pages/api/ 는 API 를 정의하는 폴더이다.
- 해당 디렉토리의 하위 파일은 모두 서버에서만 실행되는 모듈을 가진다.