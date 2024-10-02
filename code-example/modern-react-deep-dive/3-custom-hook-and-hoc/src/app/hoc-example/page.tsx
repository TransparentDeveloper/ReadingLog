'use client'

import Card from '@/component/card'
import SkeletonComponent from '@/component/card.skeleton'
import withLoadingSkeleton from '@/hoc/with-skeleton'

const fetchCardData = async () => {
  return new Promise<{ title: string; content: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        title: '제목',
        content: '내용',
      })
    }, (Math.floor(Math.random() * 5) + 1) * 1000)
  })
}

const LoadingCard = withLoadingSkeleton(Card, SkeletonComponent, fetchCardData)

const HocExamplePage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen gap-4">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  )
}
export default HocExamplePage
