# 도입

- JSX 는 리액트만을 위한 문법이 아니다. 
  - facebook(현 meta, 리액트를 만든 회사) 에서 처음 소개한 것은 맞다.
- JSX 는 자바스크립트 표준문법 (= ECMAScript) 이 아니다.
  - 트랜스파일링 과정을 거쳐야만, ECMAScript 로 변환된다.
- JSX 는 자바스크립트만으로 표현하기 어려운, XML 스타일의 트리 구문을 쉽게 작성하기 위해 설계되었다.


<br/>
<br/>
<br/>
<br/>

# JSX의 정의

JSX 는 `JSXElement`, `JSXAttribute`, `JSXChildren`, `JSXStrings` 라는 4가지 컴포넌트를 기반으로 구성돼 있다.

<br/>
<br/>
<br/>

## JSXElement
- html 요소와 비슷하다. 
- 다음 4개 중, 하나의 형태를 띈다. 

<br/>

#### 1. JSXOpeningElement
- 요소의 시작을 알림.
- ex) `<Component>`

<br/>

####  2. JSXClosingElement
- 요소의 종료를 알림.
- ex) `</Component>`

<br/>

#### 3. JSXSelfClosingElement
- 스스로 시작되고, 종료되는 요소.
- ex) `<Component/>`

<br/>

#### 4. JSXFragment
- 아무런 요소가 없는 형태.
- ex) `<></>`

<br/>
<br/>

### JSXElementName
- JSXElement 의 이름으로 쓸 수 있는 것
 
<br/>

#### JSXIdentifier
- JSX 내부에서 사용할 수 있는 식별자를 의미한다. (자바스크립트 식별자와 동일하다.)
- `$`, `_` 외, 특수문자는 사용할 수 없다.

<br/>

#### JSXNamespacedName
- `JSXIdentifier:JSXIdentifier` 의 형태로, 하나의 식별자로 취급한다. 
- 두 개의 JSXIdentifier 의 조합만 가능하다. (그 이상은 올바르지 못하다.)

<br/>

#### JSXMemberExpression
- `JSXIdentifier.JSXIdentifier` 의 형태로, 하나의 식별자로 취급한다. 
- 두 개 이상의 JSXIdentifier 조합으로도 가능하다.
- 단, `JSXNamespacedName` 이 조합에 포함되는 것은 불가하다.
  - ex) <div.member:namespaced> </div.member:namespaced>

<br/>
<br/>

### JSXAttributes
- JSXElement 에 부여할 수 있는 속성을 의미한다. 

**JSXSpreadAttributes**

- 자바스크립트의 전개 연산자와 동일한 역할을 한다.
- 객체, 조건문 표현식, 화살표 함수, 할당식 등 다양한 표현식을 JSX 속성으로 활용할 수 있다.

```tsx
// JSXSpreadAttributes 예시 - ①
const props = { callback: someFunction, isRequired: true };
<A {...props} />
```

```tsx
// JSXSpreadAttributes 예시 - ②
<A {...(isVisible ? { callback: function1 } : {callback: function2 })} />
```

<br/>

#### JSXSpreadAttribute

- 속성을 나타내는 키(**JSXAttributeName**)와 값(**JSXAttributeValue**)으로 짝을 이뤄서 표현한다. 
  - **JSXAttributeName** 에는 `JSXIdentifier` 와 `JSXNamespacedName` 이 가능하다.
    ```tsx
    // JSXAttributeName 예시
    const Main = () => <Sub first:second={true}/>
    ```

  - **JSXAttributeValue** 에는 "Javascript 의 문자열", "AssignmentExpression", "JSXElement" 를 포함함 수 있다.  
    ```tsx
    // JSXAttributeValue 예시 - ①, Javascript 의 문자열
    const Main = () => <Sub first="1" second='2'/>
    ```
    ```tsx
    // JSXAttributeValue 예시 - ②, AssignmentExpression
    const Main = () => {
        const flag = true
        return <Sub first={flag ? "1" : "2" }/>
     }
    ```
    ```tsx
    // JSXAttributeValue 예시 - ③, JSXElement
    const Main = () => <Sub children={<div>hello</div>}/>
    ```

<br/>
<br/>

### JSXChildren
- JSXElement 의 자식 값을 나타낸다. 

<br/>
<br/>

### JSXStrings
- 큰 따옴표로 구성된 문자열
- 작은 따옴표로 구성된 문자열
- JSXText( `{`,`<`,`>`,`}` 을 제외한 문자열)

<br/>

#### Javascript 문자열과의 차이점

- 자바스크립트에서 특수문자 처리를 위해 \(백스페이스) 를 사용한다. 
- 자바스크립트에서 순수히 "\" 를 표시하려면, \\ 의 형태로 작성해야 한다.
- HTML 에서 사용하는 문자열에는 이와같은 제약이 없다.


<br/>
<br/>
<br/>
<br/>

# JSX는 어떻게 자바스크립트에서 변환될까?
_리액트에서 JSX 를 변환하는 플러그인(`@babel/plugin-transform-react-jsx`) 이 있다._

**리액트에서 `JSX` -> `Javascript` 변환 예시 - ①**

```tsx

/*-----[JSX]-----*/
const ComponentA = () => <A props1={true}>Hello World</A>

/*-----[Javascript]-----*/
const ComponentA = React.createElement(
  A,
  {required: true},
  "Hello World"
)
```


**리액트에서 `JSX` -> `Javascript` 변환 예시 - ②**
```tsx

/*-----[JSX]-----*/
const ComponentB = () => <>Hello World</>

/*-----[Javascript]-----*/
const ComponentB = React.createElement(
  React.Fragment,
  null,
  "Hello World"
)
```

**리액트에서 `JSX` -> `Javascript` 변환 예시 - ③**
```tsx
/*-----[JSX]-----*/
const ComponentC = () => (
  <div>
    <span>Hello World</span>
  </div>
)
/*-----[Javascript]-----*/
const ComponentC = React.createElement(
  div,
  null,
  React.createElement(
    span,
    null, 
    "Hello World"
  )
)
```

변환된 결과를 확인해보면 다음의 특징을 알 수 있다.
- JSXElement 가 React.createElement 의 첫번째 인수이다. 
- `JSXAttribute`, `JSXChildren`, `JSXStrings` 는 옵셔널하면 첫번째 인수 이후로 넘겨주어 처리한다.

<br/>
<br/>
<br/>

## JSX 의 변환을 활용하기 
JSX 반환값이 React.createElement 로 귀결된다는 것을 알면 다음과 같은 상황에서, 더 간결한 코드 작성이 가능하다. 


> **상황 설명** <br/>
> `JSXElement` 만 다르고, `JSXAttributes`, `JSXChildren` 은 동일한 경우

```tsx
// 1. React.createElement 활용 x
const Component1 = ({
	required,
	children,
}: PropsWithChildren<{required: boolean}>) => {
	return required ? (
		<h1 className='text'>{children}</h1>
	) : (
		<span className='text'>{children}</span>
	)
}

// 2. React.createElement 활용 o
const Component2 = ({
	required,
	children,
}: PropsWithChildren<{required: boolean}>) => {
	return createElement(
    required ? "h1", "span",
    {className: "text"},
    children
  )
}
```

<br/>
<br/>
<br/>
<br/>

# 정리
- 리액트에서 JSX 의 모든 구문을 다 활용하는 것은 아니다. 
  - JSX 문법엔 있지만, 리액트에서 활용하지 않는 문법도 있다. 
  - 위에서 언급한, `JSXNamespacedName`, `JSXMemberExpression` 등 그렇다.
  - 그래도, JSX 를 채택한 다른 라이브러리도 있기 때문에, 다양한 스펙을 알아두면 좋다. 
- JSX 는 HTML 문법과 자바스크립트 문법이 혼재되어 있기 때문에, 가독성을 해친다는 의견도 있다.
- 리액트 내부에서 JSX 가 어떻게 변환되는지 알아두면, JSX 기반의 애플리케이션을 만들 때에도 도움이 될 것이다. 