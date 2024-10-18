# next.config.js 살펴보기

- Next.js 실행에 필요한 설정을 추가할 수 있는 파일이다.

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  // [⛳️]
};

export default nextConfig;
```

- 실무에서 자주 사용되는 설정만 간단하게 살펴본다.
  - _[⛳️] 에 추가할 수 있다._

<br/>

## basePath

- 애플리케이션 실행 시, 접근 가능한 주소의 루트 경로를 설정할 수 있다.
  - 예를 들어,
  - _미설정 시_ => 'localhost:3000/'
  - _`basePath: "base"`_ => 'localhost:3000/base'
- <Link> 나 router.push() 등을 사용할 때에도, basePath 로 설정된 경로는 추가할 필요가 없다.
  - 그러나, <a> 나 window.location.push() 등 Next.js 에서 제공되는 게 아님으로, basePath 를 추가한 전체 url을 명시해야한다.

<br/>

## swcMinify

- swc 를 활용해, 코드를 압축할지 설정할 수 있다. 
- 이젠 따로 설정하지 않아도, 자동으로 true 로 고정이다.

<br/>

## poweredByHeader
- Next.js 는 응답헤더에 `X-Power-by: Next.js` 설정을 삽입한다.
- 보안적으로 좋지 못하므로, 보통 false 로 설정한다.


<br/>

## redirects
- 특정 주소로 접근하려는 사용자를 다른 주소로 보낸다.

```js
// redirects 예시
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',  // 원래 경로
        destination: '/new-path',  // 리디렉션할 경로
        permanent: true,  // 영구 리디렉션 여부 (301)
      },
    ]
  },
}
```

<br/>

## reactStrictMode
- 리액트에서 제공하는 엄격모드 활성화 여부를 나타낸다.
- 기본값은 false 지만, true 로 설정하는 편이 좋다. (리액트 업데이트 대비 목적으로..)

<br/>

## assetPrefix
- 정적 자산(이미지, CSS 파일, JS 파일 등)을 제공할 때, 해당 자산들이 어디에서 로드될지를 지정하는 설정
-  정적 자산을 앱 자체의 도메인에서 제공하지만, 성능을 개선하거나 사용자에게 더 빠른 응답을 제공하기 위해 CDN 서버를 활용할 수 있다.
- assetPrefix 설정을 통해 정적 자산의 경로를 CDN으로 지정할 수 있다.