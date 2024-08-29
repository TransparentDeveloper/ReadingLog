# 도입

## ECMAScript
- 자바스크립트 표준 버전 (거의 매년 새로운 기능이 추가)
- 모든 브라우저에서 항상 최신 자바스크립트 문법을 지원하는 것은 아니다.
  - 예를 들어, 인터넷 익스플로러는 ES5 까지만 지원한다.

## babel 이란?
- 개발자가 원하는 자바스크립트 버전으로 코드를 작성하더라도, 실행되는 브라우저 환경에 적절한 버전으로 트랜스파일 해준다.

  _(*트랜스파일이란, 프로그래밍 언어 간의 변환을 의미한다.)_


<br/>
<br/>
<br/>
<br/>

# 1. 구조 분해 할당

## 배열 구조 분해 할당

```js
// 예시
const array = [1,2,3,4]
const [first, second, third, forth] = array

console.log(first) // ✅ 정상 출력: 1
console.log(second) // ✅ 정상 출력: 2
console.log(third) // ✅ 정상 출력: 3
console.log(forth) // ✅ 정상 출력: 4
```

### ✔️ 위치에 따라 결정된다.
```js
const array = [1,2,3,4]
const [first, , ,forth] = array

console.log(first) // ✅ 정상 출력: 1
console.log(forth) // ✅ 정상 출력: 4
```

### ✔️ undefined 값을 가진 요소에 접근 할 경우, 초기값 설정이 가능하다.
```js
// 원본 배열
const array = [undefined, null, 3]

/* 초기값 설정 ❎ */
const [firstX, secondX, thirdX, forthX] = array
console.log(firstX) // ✅ 정상 출력: undefined
console.log(secondX) // ✅ 정상 출력: null
console.log(thirdX) // ✅ 정상 출력: 3
console.log(forthX) // ✅ 정상 출력: undefined

/* 초기값 설정 🅾️  */
const [firstO=1, secondO=2, thirdO=3, forthO=4] = array
console.log(firstO) // ✅ 정상 출력: 1
console.log(secondO) // ✅ 정상 출력: null
console.log(thirdO) // ✅ 정상 출력: 3
console.log(forthO) // ✅ 정상 출력: 4
```

### ES6(ES2015) 문법이다.
- babel을 통해 ES5 문법으로 변환했을 때, 그다지 복잡한 로직이 추가되지 않는다.

## 객체 구조 분해 할당
```js
// 대표 예시
const object = {
  first: 1,
  second: 2,
  third: 3,
  forth: 4
}

const {first, second, third, forth} = object
console.log(first) // ✅ 정상 출력: 1
console.log(second) // ✅ 정상 출력: 2
console.log(third) // ✅ 정상 출력: 3
console.log(forth) // ✅ 정상 출력: 4
```

### (배열과 달리) 위치가 아니라, key 이름으로 접근할 수 있다.
```js
const object = {
  first: 1,
  second: 2,
  third: 3,
  forth: 4
}

const {first, forth} = object
console.log(first) // ✅ 정상 출력: 1
console.log(forth) // ✅ 정상 출력: 4
```

#### 다른 key 이름을 쓰고 싶다면? (새 이름으로 value 할당)
```js
const object = {
  first: 1,
  second: 2,
  third: 3,
  forth: 4
}

const {first: one, forth: four} = object
console.log(one) // ✅ 정상 출력: 1
console.log(four) // ✅ 정상 출력: 4
```

### ✔️ 계산된 속성 이름 방식

```ts

const object = {
  first: 1,
  second: 2,
  third: 3,
  forth: 4
}

const key = "third" // 객체의 key 이름을 미리 지정

const {[key]: three} = object 
console.log(three)
```




### ES2018 문법이다.
- babel을 통해 ES5 문법으로 변환했을 때, 객체의 속성정보 등을 확인하는 작업을 추가되며 복잡한 연산로직이 추가된다.
- 트랜스파일되면 번들 사이즈가 커질 수 있다.
- **객체 구조 분해 할당은 꼭 필요한 곳에서 사용하도록 하자.**


<br/>
<br/>
<br/>
<br/>

# 2. 전개 구문

## 배열의 전개구문
```js
// 대표 예시
const array = [1, 2]
const array2 = [...array, 3, 4, 5]

console.log(array2) // ✅ 정상출력: [ 1, 2, 3, 4, 5 ]
```

### 전개 연산(spread 연산)이 일어나는 위치가 중요하다.
```js
const array1 = [1, 2]
const array2 = [3, 4]

// case 1.
const merged1 = [...array1, ...array2]
console.log(merged1) // ✅ 정상출력: [ 1, 2, 3, 4 ]

// case 2.
const merged2 = [...array2, ...array1]
console.log(merged2) // ✅ 정상출력: [ 3, 4, 1, 2 ]
```

### 기존 배열에 영향을 주지않고, 복사할 수 있다.
```js
const array = [1,2]

/* 원본의 시작주소를 할당했으므로 완전히 똑같은 배열이다. */
const referenceCopy = array
console.log(array === referenceCopy) // ✅ 정상출력: true

/* 새로운 주소에 원본과 같은 요소를, 같은 순서로 저장한다. */
const shallowCopy = [...array]
console.log(array === shallowCopy) // ✅ 정상출력: false
```

### ES6(ES2015) 문법이다.
- babel을 통해 ES5 문법으로 변환했을 때, (배열 구조 분해 할당과 마찬가지로) 그다지 복잡한 로직이 추가되지 않는다. 



## 객체의 전개구문
```js
// 대표예시
const object1 = {
  a:1,
  b:2
}
const object2 = {
  ...object1,
  c:3,
  d:4
}

console.log(object2) // ✅ 정상출력: { a: 1, b: 2, c: 3, d: 4 }
```

### key(속성명) 가 같다면, value(속성값)이 덮어쓰기된다. (순서 중요..)
```js
const object1 = {
  a:1,
  b:2
}
const object2 = {
  b:3,
  c:4, 
}

// case 1. 'b' 의 값은 object2 의 것을 갖는다.
const merged1 = {
  ...object1,
  ...object2
}
console.log(merged1) // ✅ 정상출력: { a: 1, b: 3, c: 4 } 

// case 2. 'b' 의 값은 object1 의 것을 갖는다.
const merged2 = {
  ...object2,
  ...object1
}
console.log(merged2) // ✅ 정상출력: { a: 1, b: 2, c: 4 }
```

### ES2018 문법이다.
- babel을 통해 ES5 문법으로 변환했을 때, (객체 구조 분해 할당과 마찬가지로) 객체의 속성정보 등을 확인하는 작업을 추가되며 복잡한 연산로직이 추가된다.
- 트랜스파일되면 번들 사이즈가 커질 수 있다.
- **객체의 전개 연산은 꼭 필요한 곳에서 사용하도록 하자.**

<br/>
<br/>
<br/>
<br/>

# 3. 객체 초기자
```js
// 대표 예시

const a = 1
const b = 2

const object = { a, b }
console.log(object) // ✅ 정상출력: { a: 1, b: 2 }
```
### ES2015 문법이다.
- babel을 통해 ES5 문법으로 변환했을 때에도 복작한 연산이 추가되지 않는다.

<br/>
<br/>
<br/>
<br/>

# 4. Array 프로토타입의 메서드: map, filter, reduce, forEach

- (앞으로 소개될) 4개 메서드는 ES5부터 사용된 문법으로 트랜스파일이나 폴리필이 없어도 부담없이 사용할 수 있다.

## map

```js
// 대표 예시
const array = [1,2,3,4]

/* 배열 복사 */
const array2 = array.map((elem) => elem)
console.log(array2) // ✅ 정상출력: [ 1, 2, 3, 4 ]

/* 기존 요소에 일괄적인 연산 */
const array3 = array.map((elem) => elem*2)
console.log(array3) // ✅ 정상출력: [ 2, 4, 6, 8 ]

/* 기존 요소에 조건부 연산 */
const array4 = array.map((elem)=> {
  if(elem%2 === 0) return 0
  return elem
})
console.log(array4) // ✅ 정상출력: [ 1, 0, 3, 0 ]
```

### 주요특징
- **새로운 배열을 반환한다.**
  - 원본 배열을 수정하지 않고, 각 요소에 대해 주어진 함수를 적용한 결과를 담은 새 배열을 반환한다.
- **순회 도중 중단할 수 없다.**
  - map 메서드는 중단(break 또는 return)이 불가능하며, 모든 요소를 순회해야 한다.
- **연산 후 배열의 길이는 유지된다.**
  - 주어진 함수가 어떤 값을 반환하든 간에 결과 배열의 길이는 원본 배열과 동일하다.

## filter
```js
// 대표 예시
const array = [1,2,3,4]

/* 제시된 조건이 truthy 할 경우, 원소를 반환 */
const array1 = array.filter((elem) => elem % 2 == 0);
console.log(array1) // ✅ 정상출력: [ 2, 4 ]
```

### 주요특징
- **새로운 배열을 반환한다.**
  - 원본 배열을 수정하지 않고, 주어진 조건에 따라 필터링된 새로운 배열을 반환한다.
- **순회 도중 중단할 수 없다.**
  - filter 메서드는 중단(break 또는 return)이 불가능하며, 모든 요소를 순회해야 한다.
- **연산 후 배열의 길이가 줄어들 수 있다.**
  - 필터링 조건에 따라 결과 배열의 길이는 원본 배열보다 작아질 수 있다.

## reduce 
```js
// 대표 예시
const array = [1,2,3,4,5,6]

/* 초기값을 기준으로, 배열을 순회하며 연산결과를 누적한다. */
const initValue = 0
const evenSum1 = array.reduce((sum, elem) => { 
  if (elem % 2 === 0) return sum + elem
  return sum
}, initValue)
console.log(evenSum1) // ✅ 정상출력: 12

/* 초기값 제시되지 않은 경우, 배열의 첫번째 요소를 초기값으로 간주하고 index 1부터 순회한다. .*/
const evenSum2 = array.reduce((sum, elem) => { 
  if (elem % 2 === 0) return sum + elem
  return sum
})
console.log(evenSum2) // ✅ 정상출력: 13
```

### 주요특징
- **배열을 순회하며 누적 연산을 수행한다.**
  - 배열의 각 요소에 대해 주어진 함수로 누적된 결과를 계산해 나간다.
- **초기값 설정에 따라 다양한 결과를 만들 수 있다.**
  - 초기값을 지정하여 누적된 결과를 반환할 수 있으며, 초기값을 지정하지 않으면 첫 번째 요소가 초기값으로 사용된다.

```js
// 홀수로 이뤄진 배열 만들기 (filter 기능 구현)
const array = [1,2,3,4]
const oddArray = array.reduce((acc, elem) => {
  if (elem % 2 !== 0) acc.push(elem)
  return acc
}, [])
console.log(oddArray) // ✅ 정상출력: [ 1, 3 ]
```


## forEach
```js
// 대표 예시

const array = [1,2,3,4]
array.forEach((elem) => {
  console.log(elem) 
}) 

// ✅ 정상출력: 1
// ✅ 정상출력: 2
// ✅ 정상출력: 3
// ✅ 정상출력: 4
```

### 주요특징
- **순회 도중 순회를 중단할 수 없다.**
  - forEach는 중단이 불가능하며, 모든 요소를 순회한다.
- **순회의 결과는 없다.**
  - forEach 메서드는 배열의 각 요소에 대해 주어진 함수를 실행하지만, 반환값은 undefined 다. 즉, 배열 자체는 변경되지 않는다.

<br/>
<br/>
<br/>
<br/>

# 5. 삼항 조건 연산자
```js
// 대표 예시
const value = 10;

const result = value % 2 === 0 ? "짝수" : "홀수"
```