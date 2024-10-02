import Link from 'next/link'

export default function Home() {
  return (
    <ul className="flex flex-col">
      <Link href="/hook-example">Go to Custom Hook Example</Link>
      <br />
      <Link href="/hoc-example">Go to HOC Example</Link>
    </ul>
  )
}
