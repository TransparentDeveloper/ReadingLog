# useCallback 

- useMemo 는 연산(=함수)의 반환값을, useCallback 은 연산(=함수) 그 자체를 기억하고 활용한다.
- 함수를 새롭게 만들지 않고 (= 선언하지 않고) 재사용할 수 있다.

```tsx
// useCallback 예시)
// - API 데이터를 비동기로 가져오고 로딩 상태를 관리하는 훅
// - useCallback을 사용하여 fetchData 함수의 참조를 고정시킴
// - useEffect 내에서 fetchData를 의존성 배열에 포함하여, fetchData가 변경되지 않는 한
//   useEffect가 반복 실행되지 않도록 함

const useAPIFetch = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchData = useCallback(async () => { 
    try {
      const response = await callAPI();
      setData(response.data); 
    } catch (error) {
      //..생략..
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  return {data, isLoading}
}
```