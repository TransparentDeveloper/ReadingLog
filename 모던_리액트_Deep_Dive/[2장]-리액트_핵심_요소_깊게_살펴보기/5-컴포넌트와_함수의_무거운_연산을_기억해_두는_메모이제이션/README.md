# 도입부
- 리액트 커뮤니티에서 오랜 논쟁 주제
  - 메모이제이션은 언제 / 어떤 기준으로 사용해야 하나?
- 각 진영의 주장과 근거에 대해 알아본다.

# 주장1: 섣부른 최적화는 독이다. 꼭 필요한 곳에만 메모이제이션을 추가하자.

## 메모이제이션은 비용이 발생한다.

1. 값을 비교하고, 랜더링 또는 재계산이 필요한지 확인하는 작업에 대한 비용
2. 이전의 결과물을 저장해 두었다가 다시 꺼내는 작업에 대한 비용

이러한 비용이 리랜더링 비용보다 저렴할지 신중하게 생각해봐야 하며, 섣부른 최적화는 경계해야 한다.

> `premature optimization` 또는 `premature memoization`
>
> 영어권 커뮤니티에서 섣부른 최적화를 가리키는 말.


## 리액트는 메모이제이션 사용에 대한 선택권을 개발자에게 주웠다.

메모이제이션을 통한 최적화가 필수적이었다면, 리액트에서 진작 모든 컴포넌트를 PureComponent 로 만들거나 memo 로 감싸두는 작업을 했을 것이다.


## useMemo 등 이 성능최적화를 목적으로 사용할 수는 있겠지만, 명백히 보장하지는 않는다.

리액트 공시문서에는 useMemo 와 관련하여, 다음과 같은 언급이 있다.

```
useMemo 는 성능 최적화를 위해 사용할 수는 있지만, 의미상으로 그것이 보장된다고 생각하지는 말라.
.
.
.
useMemo 를 사용하지 않고도 작동할 수 있도록 코드를 작성하고, 그 이후에 useMemo 를 추가해 성능을 최적화해보라.
```

리액트가 useMemo 를 언제까지고 성능최적화를 위해 제공해 줄 것이라는 보장은 없다.


## 결론

- 리액트에서 메모이제이션을 활요한 최적화는 신중을 기해야 한다.
- 개발자 도구나 useEffect 를 사용해 실제로 어떻게 랜더링이 일어나고 있는지 확인하고 필요한 곳에서만 최적화하는 것이 옳다.

# 주장2: 랜더링 과정의 비용은 비싸다. 모조리 메모이제이션해 버리자.

## 리액트는 기본적으로 컴포넌트 정보를 저장한다.

어차피 리액트의 랜더링 프로세스 상 이전 결과물을 어떻게든 저장하고 있다.
그것이 기본적인 리액트의 재조정 알고리즘이다.

따라서 우리가 memo 로 지불해야 하는 비용은 props 에 대한 얕은 비교뿐이다. 

물론 props 가 크고 복잡해진다면 비용이 커질 수 있지만,
**memo 를 하지 않았을 때 발생할 수 있는 비용**은 다음과 같다.

- 랜더링 비용
- 컴포넌트 내부의 복잡한 로직의 재실행
- 자식 컴포넌트에서도 연쇄적으로 작업 진행
- 리액트의 v-dom 트리 비교


## 메모이제이션을 사용하지 않는 경우에 대한 예시

_한 컴포넌트에서 관리하는 상태가 많은 경우, 불필요한 리랜더링이 자주 발생한다._

```tsx
/* 
 * 문제 상황) 
 * `stateA` 만 변경되었을 경우, 그것에 의존하는 ComponentA 만 리랜더링이 발생하는 것이 이상적이다.
 * 하지만 `stateA` 와 관련없는 ComponentB 와 ComponentC 도 리랜더링이 발생한다.
 */
const Component = () => {
	const [stateA, setStateA] = useState(objA)
	const [stateB, setStateB] = useState(objB)
	const [stateC, setStateC] = useState(objC)

	return (
		<div>
			<ComponentA {…{stateA, setStateA}}/>
			<ComponentB {…{stateB, setStateB}}/>
			<ComponentC {…{stateC, setStateC}}/>
		</div>
	)
}

const ComponentA = ({ stateA, setStateA }) => {
  console.log('ComponentA rendered');
  return <div>Component A</div>;
};
const ComponentB = ({ stateB, setStateB }) => {
  console.log('ComponentA rendered');
  return <div>Component B</div>;
};
const ComponentC = ({ stateC, setStateC }) => {
  console.log('ComponentA rendered');
  return <div>Component C</div>;
};
```

```tsx
/* 
 * 해결책)
 * 
 * React.memo 사용
 * 각 컴포넌트가 자신에게 전달된 값만 비교한다면, 상관없는 상태에 의존하여 리랜더링하지 않아도 된다.
 */

const ComponentA = memo(({ stateA, setStateA }) => {
  console.log('ComponentA rendered');
  return <div>Component A</div>;
});

const ComponentB = memo(({ stateB, setStateB }) => {
  console.log('ComponentB rendered');
  return <div>Component B</div>;
});

const ComponentC = memo(({ stateC, setStateC }) => {
  console.log('ComponentC rendered');
  return <div>Component C</div>;
});
```

# 결론
- 리액트를 공부 중이거나 신입 개발자라면, 메모이제이션 사용에 신중하는 편이 낫다.
- 현업에서 사용 중이거나 성능과 관련해 지속적인 모니터링 중이라면, 의심스로운 곳에 메모이제이션 기법을 적극적으로 적용해봐
  - 일반적으로 리액트 결과물은 lodash 와 같은 간단한 연산만으로 완성되지 않는다.
  - props 비교만으로 랜더링 과정을 가볍게 만들 수 있다면 성능향상에 큰 도움이 될 수 있다.