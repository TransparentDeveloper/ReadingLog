# Closer - 문법적 정의 (MDN)

  “함수와 함수가 선언된 어휘적(Lexical) 환경(Scope)의 조합”

```tsx
// "Lexical Scope" 를 이해하기 위한 예제 코드

function add() {
	const a = 10
	function innerAdd(){
		const b = 20
		console.log(a+b)
	}
}

add() // ✅ 정상출력: 30
```

`add` 함수는 `innerAdd` 함수의 영역을 포함한다.

`add` 함수에서 선언된 변수 `a` 는 `innerAdd` 함수에서도 유효하다.

`innerAdd` 에 선언된 변수 `b` 는 `innerAdd` 함수 내부에서만 유효하게 사용할 수 있다.

위와 같이 변수의 유효범위를 **scope** 라고 한다.

<br/>
<br/>
<br/>
<br/>

# Scope

- **전역 스코프 (Global Scope)**
    
    전역객체(브라우저 환경이라면 `window`, node.js 환경이라면 `global`) 에서 선언된 변수는 어디서든 접근하여 읽거나 쓸 수 있다.
    
    ```tsx
    var global_number = 1
    
    console.log(global_number) // ✅ 정상출력: 1
    
    function readNWriteGlobalNumber() {
    	function readGlobalNumber() {
    		console.log(global_number)
    	}
    	function writeGlobalNumber() {
    		global_number++
    	}
    	readGlobalNumber() // 👈 특정 함수 내부에서 조회
    	writeGlobalNumber() // 👈 특정 함수 내부에서 수정
    }
    
    readNWriteGlobalNumber() // ✅ 정상출력: 1
    
    console.log(global_number) // ✅ 정상출력: 2
    
    ```
    
<br/>

- **함수 스코프 (Function Scope)**
    
    함수 내부에서 선언된 변수는 해당 함수 내부에서 유효한 접근이 가능하다.
    
    `var` 를 통해, 선언된 변수는 함수 스코프를 갖는다.
    
    ```tsx
    function func(){
    	var function_number = 1
    	console.log(function_number) // ✅ 정상출력: 1
    }
    
    console.log(function_number) // 🚨 ReferenceError: function_number is not defined
    ```
    
    `func` 함수 영역 내부에, 변수 `function_number` 가 선언되었다. 
    
    `function_number`  는 함수 스코프를 갖고, `func` 외부에서 접근이 불가능하다.
    
    ```tsx
    if(true){
    	var global_number = 1
    	console.log(global_number) // ✅ 정상출력: 1
    }
    
    console.log(global_number) // ✅ 정상출력: 1
    ```
    
    위의 예시에서 `global_number` 는 블록으로 감싸진 영역 안에서 선언됐지만, 함수 내부가 아니므로 global scope 를 가진다.

<br/>

- **블록 스코프 (Block scope)**
    
    `let`, `const` 를 통해 선언된 변수는 (함수가 아니더라도) 블록 영역 안에서만 유효하게 접근할 수 있다.
    
    ```tsx
    if(true){
    	let block_number_let = "let"
    	const block_number_const = "const"
    	
    	console.log(block_number_let)  // ✅ 정상출력: let
    	console.log(block_number_const) // ✅ 정상출력: const
    }
    
    // console.log(block_number_let)
    console.log(block_number_const) // 🚨 ReferenceError: block_number_const xis not defined
    ```

<br/>
<br/>
<br/>
<br/> 

# 클로저 활용

- **전역 변수 접근 제어**

```tsx
var account_1 = 10000
var account_2 = 20000

function print_account_1() {
	console.log(account_1)
}
function print_account_2() {
	console.log(account_2)
}
function print_total_account() {
	console.log(++account_1 + account_2) // 👈 account_1 가 수정
}

print_account_1() // ✅ 정상출력: 10000
print_account_2() // ✅ 정상출력: 20000
print_total_account() // ✅ 정상출력: 30001
print_account_1() // ✅ 정상출력: 10001
```

`account_1` , `account_2` 는 전역스코프 이기 어디서나 접근이 가능하다. (= 어디서나 수정이 가능하다.)

위의 예시에서 `printTotalAccount()` 의 구현이 잘못되어, `account_1` 의 값이 수정되었다. (어디서 잘못되었는지 찾기도 힘들다.)

React 의 상태와 같이 중요한 값이 전역 레벨에 저장되어 있다면, 치명적인 버그가 자주, 쉽게 발생할 것이다. 

클로저를 통해 위의 문제를 해결해보자.

```tsx
function make_account(init) {
	const account = init

	return {
		get: function () {
			return account
		},
		withdraw: function (amount) {
			account -= amount
		},
		deposit: function (amount) {
			account += amount
		},
	}
}

const account_1 = make_account(1000)
const account_2 = make_account(2000)

let money_1 = account_1.get()
let money_2 = account_2.get()

console.log(money_1)           // ✅ 정상출력: 10000
console.log(money_2)           // ✅ 정상출력: 20000
console.log(money_1 + money_2) // ✅ 정상출력: 30000
console.log(money_1)           // ✅ 정상출력: 10000
console.log(money_2)           // ✅ 정상출력: 20000

++money_1
console.log(account_1.get())   // ✅ 정상출력: 10000
```

`make_account()` 에서 선언된 변수 `account` 는 해당 함수 영역 내부에서만 유효한 접근이 가능하다. (외부에서 `account` 직접 수정 불가능) 단, 같은 외부로 반환되는 메서드(`get()`, `withdraw()`, `deposit()`) 내부에서는 미리 정의방법으로 접근 및 수정이 가능하다.

<br/>
<br/>
<br/>
<br/>

# 주의사항

## 선언된 변수의 스코프를 확인할 것.!

```tsx
for (var i = 0; i < 3; i++){
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
}
```
- **의도**) 1초 간격으로 "0", "1", "2" 출력
- **결과**) 1초 간격으로 "3", "3", "3" 출력

### 왜 의도와 다르게 동작하나?
1. var 로 선언된 변수 `i`는 함수 레벨의 스코프를 지원한다. (현재는 global scope를 갖는다.)
2. for 문 내부는 동기로직, setTimeout 의 콜백은 비동기로직이다. (동기 로직은 비동기 로직보다 우선하여 처리한다.)

전역스코프를 갖는 `i` 는 반복문의 실행으로 계속 수정된다. `i` 의 값이 5 로 수정되었을 때, for 문이 종료되고 setTimeout 콜백이 실행된다. 즉, `i `를 출력하는 시점에 `i` 는 5 일 수밖에 없다.

### 참고

다음과 같이 작성한 것과 같다.

```tsx
var i = 0

{ 
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
  i++
}
{ 
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
  i++
}
{ 
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
  i++
}
```

### 어떻게 해결하나?

#### 1) 블록 스코프인 let i 를 선언한다.

```ts
for (let i = 0; i < 3; i++){
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
}
```

매 반복마다, `i` 는 해당 블록에서만 유효할 뿐, 다른 블록에 영향을 주지 않는다.
```ts
{ 
  let i = 0
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
}
{ 
  let i = 1
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
}
{ 
  let i = 2
  setTimeout(() => { 
    console.log(i)
  }, i * 1000)
}
```

#### 2) 클로저 활용
`i` global 스크프를 갖더라도, 매 반복마다 해당 순간의 `i` 를 기억하는 환경을 만들면 된다. 

```ts
function delayedPrint(delay) { 
  setTimeout(() => {
    console.log(delay)
  },delay*1000)
}

for (var i = 0; i < 3; i++){
  delayedPrint(i)
}
```

`delayedPrint()` 는 호출된 시점에, 입력(`delay`) 을 기억하고 있다.

<br/>
<br/>
<br/>

## 메모리 누수
클로저는 그것이 생성된 시점에 선언된 환경을 기억하고 있다.