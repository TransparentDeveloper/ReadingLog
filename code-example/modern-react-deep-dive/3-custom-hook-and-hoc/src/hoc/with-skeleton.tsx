import { ComponentType, useEffect, useState } from 'react'

const withLoadingSkeleton = <T, P extends object>(
  WrappedComponent: ComponentType<P & T>, // T를 WrappedComponent의 props에 추가
  SkeletonComponent: ComponentType,
  fetchFunc: () => Promise<T>,
) => {
  return (props: Omit<P, keyof T>) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<T | undefined>()

    const fetch = async () => {
      const responseData = await fetchFunc()
      setData(responseData)
      setLoading(false)
    }

    useEffect(() => {
      fetch()
    }, [])

    // 로딩 중일 때는 스켈레톤 UI 표시
    if (loading) {
      return <SkeletonComponent />
    }

    // 로딩이 끝난 후에는 실제 컴포넌트 렌더링
    return <WrappedComponent {...(props as P)} {...(data as T)} />
  }
}

export default withLoadingSkeleton
