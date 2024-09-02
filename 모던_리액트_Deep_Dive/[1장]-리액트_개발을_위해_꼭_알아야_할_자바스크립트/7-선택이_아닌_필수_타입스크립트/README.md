# 타입스크립트란?

> _"TypeScript is Javascript with syntax for types."_
> (_타입스크립트는 타입 구문을 포함한 자바스크립트입니다._)
>
> -타입스크립트 홈페이지에서..-

<br/>
<br/>
<br/>

## 자바스크립트는 동적 타입 언어이다. 
- 타입에 대한 제한이 없기 때문에, 개발자에게 자유를 준다.
- 프로젝트 규모가 커질수록 오히려 발목을 잡을 수 있다.

<br/>
<br/>

### 타입 검사를 하지 않을 경우..

```js
const divide = (a,b) => a/b

console.log(divide(1,2)) // ✅ 정상출력: 0.5
console.log(divide('안녕.','hi')) // ✅ 정상출력: NaN
```

위의 예시에서, `divide()` 에 기대하는 동작은 두 수의 나눗셈 결과를 반환하는 것이다. 
하지만 이는 입력이 number type 라는 것을 전제할 때, 가능하다.
입력이 string type 인 경우, 원하지 않는 결과를 확인할 수 있다.

<br/>
<br/>

### type-guard

물론 Javascript 문법만으로 타입을 확인해서 위의 문제를 방지할 수 있다.

```js
const divide = (a,b) => {
  // type-guard
  if(typeof a !== 'number' || typeof b !== 'number') 
    throw new Error("입력 타입이 올바르지 않습니다.")

  return a/b
}

console.log(divide(2, 4)) // ✅ 정상출력: 0.5
console.log(divide("안녕하세요,","123")) // 🚨 Error: 입력 타입이 올바르지 않습니다. 
```

<br/>

#### But..
모든 함수에 이런식으로 타입 확인하는 것은 번거롭고, 코드의 크기를 키우는 일이다.

또한 (JSDocs 라도 이용하지 않으면,) 사용 측에서 입력 타입을 확인하기도 힘들다.


<br/>
<br/>
<br/>
<br/>

# 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

<br/>
<br/>
<br/>

## any 대신 unknown 이용하기

<br/>
<br/>

### any
- **어떠한 타입이든 any 타입에 할당 가능하다.**
- **any 타입은 어떠한 타입으로도 할당 가능하다.**
- any 타입의 변수는 런타임 시까지 타입검사 대상이 되지 않는다. => **타입스크립트의 이점이 사라진다.**
- any 타입은 전파된다. 
  - 피연산자 중 any 타입 변수가 하나라도 포함되었다면, 연산 결과는 any 타입이다.
```js
const add = (num1: number, num2: any) => num1 + num2
const getDouble = (num:number) => num*2

const a = 1             // 👈 a 의 타입: 'number'
const b = 'two'         // 👈 b 의 타입: 'string'
const sum = add(a, b)   // 👈 sum 의 타입: 'any'
const double = getDouble(sum) // 👈 double 의 타입: 'any'

console.log(double) // ✅ 정상 출력: NaN

```

- 프로젝트의 메인 언어를 Javascript 에서 Typescript 로 천천히 전환할 경우(=과도기)와 같이 정말 예외적인 상황에서 제한적으로 사용하자.

<br/>
<br/>

### unknown
- 모든 코드의 **top type** 이다. 
- **어떠한 타입이든 unknown 타입에 할당 가능하다.**
- **unknown 타입은 어떠한 타입으로도 할당할 수 없다.**
```ts
// 👇 unknown 변수는 알 수 없는 값이므로 연산에 활용할 수 없다.
const add = (num1:unknown, num2:unknown) => num1 + num2

const a = 1
const b = 2
const sum = add(a,b)
```
- unknown 타입의 변수를 사용하기 위해선, type-narrowing(타입 좁히기) 혹은 type-assertions(타입 단언) 을 해야한다. 

```ts
// unknown 변수에 대한 "type-narrowing" 예시

const doSomething = (value: unknown) => {

  if (typeof value === "string") 
      return value.toUpperCase()

  else if (typeof value === "number") 
      return value.toFixed(2)

  else 
      return "Unknown type"
}

const resultString = doSomething("hi");  
const resultNumber = doSomething(42);  
const resultBoolean = doSomething(true);  

console.log(resultString) // ✅ 정상출력: HI
console.log(resultNumber) // ✅ 정상출력: 42.00
console.log(resultBoolean) // ✅ 정상출력: Unknown type
```

```ts
// unknown 변수에 대한 "type-assertion" 예시

const doSomething = (value: unknown) => {
  try{
   const strValue = value as string; 
   return(strValue.toUpperCase())
  }catch{
    return ("Unknown type")
  }
}

const resultString = doSomething("hi");  
const resultBoolean = doSomething(true); 

console.log(resultString) // ✅ 정상출력: HI
console.log(resultBoolean) // ✅ 정상출력: Unknown type
```

<br/>
<br/>

### (추가) never
- 모든 코드의 **button type** 이다. 
- **어떠한 타입이든 never 타입에 할당할 수 없다.**
- **never 타입은 어떠한 타입으로도 할당할 수 없다.**

```ts
// never 타입 예시
type NeverType1 = string & number
```

<br/>
<br/>
<br/>

## 타입 가드를 적극 활용하자

<br/>
<br/>

### instanceof 와 typeof

<br/>

#### instanceof 
- 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인할 수 있는 연산자다.
```ts
// instanceof 예시

class SuccessResponse <T>{
  data: T
  constructor(data: T) {
    this.data = data
  }
}
class ErrorResponse {
  errorCode: number
  message: string
  constructor(errorCode:number, message:string) {
    this.errorCode = errorCode
    this.message = message
  }
}

const getData = async () => {
  try{
    const response = await fetch("https://test.com");
    if(!response.ok){
      return new ErrorResponse(response.status, response.statusText)
    }
    const data = response.json()
    return new SuccessResponse(data)
  }
  catch(e){
    return new ErrorResponse(500, "Network Error");
  }
}

const main = async () => {
  const responseInstance = await getData()
  /* instanceof 를 통한 타입좁히기 */

  // 👇 성공케이스
  if(responseInstance instanceof SuccessResponse) {
    // ....
  }

    // 👇 실패케이스
  if(responseInstance instanceof ErrorResponse) {
    // ....
  }
}

main();
```

<br/>

#### typeof
- 특정 요소의 자료형을 확인하는데에 사용한다.
```ts
// typeof 예시
const isUndefined = (input: unknown): input is undefined  => 
  typeof input === 'undefined'
```

<br/>

#### in
- 어떤 객체에 키가 존재하는지 확인하는 용도로 사용한다. 
- 개발자가 정의한 특정 객체에 대해 타입좁히기 를 시도할 때 유용하다.

```ts
type Student = {
  name: string
  age: number
  score: number
}
type Teacher = {
  name: string
  age: number
  subject: "국어" | "수학" | "영어"
}

/* 타입가드 함수 */
const isStudent = (input: unknown): input is Student =>
  typeof input === 'object' &&
  'name' in input &&
  'age' in input &&
  'score' in input

/* 교내 구성원 모두에게, 공지하기 */
const noticeAll = (message:string, target: Student | Teacher) => {
  if(isStudent(target)){
    console.log("학생 여러분, " + message)
  }
  else{
    console.log("선생 여러분, " + message )
  }
}
```

<br/>
<br/>
<br/>

## 제네릭

- 함수나 클래스 내부에서 단일 타입이 아닌 다양한 타입에 대응할 수 있도록 도와주는 도구
- 타입만 다르고 작업 내용은 동일해야할 경우, 유용하게 활용할 수 있다.

```ts
const printSerialized = <T,>(array:T[]) => {
  console.log(array.join(""))
}

printSerialized([1,2,3,4]) // ✅ 정상출력: 1234
printSerialized(['one','two','three','four']) // ✅ 정상출력: onetwothreefour
printSerialized([true,false,true,true]) // ✅ 정상출력: truefalsetruetrue
```

<br/>

#### 제네릭 활용 - useState

```ts
const SomeComponent = () => {
  const [str, setStr] = useState<string>('')
  //...
}
```

> **useState, 제네릭에 타입을 지정하지 않는다면?**
그냥 `useState()` 와 같은 형식으로 (기본값도 없이) 사용하는 경우가 많은데, 상태값에 undefined 도 허용되기 때문에 문제가 발생할 수 있다. 

```tsx
const SomeComponent = () => {
  const [data, setData] = useState()

  const asyncFetch = async = () => {
    const data = await getData()
    setData(data)
  }
  
  useEffect(()=>{
    asyncFetch()
  },[asyncFetch])

  <div> 
    {/* 🚨 첫 로드 시, data 라는 undefined 이기 때문에 member 속성이 없다. */}
    <p>{data.member.name}</p>
  </div>
}
```

<br/>
<br/>
<br/>

## 인덱스 시그니처

<br/>
<br/>

### 소개

**객체의 키를 정의하는 방식**

```ts
type Hello = {
  [key: string]: string
}
```
위의 예시에서, `[key: string]` 이 인덱스 시그니처이다.

<br/>
<br/>

### 키의 범위를 좁혀야 한다. 

```ts
type Hello = {
  [key: string]: string
}

const helloObj: Hello = {
  hello: "hello",
  hi: "hi"
}

console.log(helloObj["hello"]) // ✅ 정상출력: hello
console.log(helloObj["hi"]) // ✅ 정상출력: hi
console.log(helloObj["안녕"]) // ✅ 정상출력: undefined
```

존재하지 않은 키로 객체에 접근하더라도 키의 type 이 string 이라는 조건이 만족하기 때문에,
기대하지 못한 방식으로 동작할 수 있다.

아래와 같이, key 로 활용할 수 있는 후보를 미리 지정해야한다.

<br/>

#### 해결방법 - ①
```ts
type Hello = {[key in "hello" | "hi" ]: string}

```

<br/>

#### 해결방법 - ② Record(utility type) 타입 활용하기
```ts
type Hello = Record<"hello" | "hi", string>

```

<br/>
<br/>

### duck typing

> _"오리가 걷고, 소리 내고, 날 수 있다면 오리일 가능성이 높다."_

- 객체의 타입을 특정 클래스의 상속, 인터페이스 구현 등으로 결정하지 않는다.
- **어떤 객체**의 변수, 메서드가 **어떤 타입**에서 필요로 하는 것과 일치하면, 해당 객체는 해당 타입으로 간주한다.
- Javascript 는 객체의 타입에 구애받지 않는 특성이 있기 때문에, Typescript 또한 이러한 Javascript 의 특성을 맞추어 설계되었다.

```ts
// duck typing 예시
type ObjType1 = {
  key1: string
}

type ObjType2 = {
  key1: string
  key2: string
}


const printKey1 = (obj: ObjType1) => {
  console.log(obj.key1)
}

const somObject:ObjType2 = {
  key1: "value1",
  key2: "value2"
}
printKey1(somObject) // ✅ 정상출력: value1
```