'use client'

import ColorBox from '@/component/color-box'
import { useAlarm } from '@/hook/use-alarm'

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] as const

export default function HookExamplePage() {
  const { ring, alarmStart, alarmReset } = useAlarm(1000)

  const currentColor = COLORS[ring % COLORS.length]

  return (
    <div>
      <div>
        <button onClick={alarmStart}>시작</button>
        <button onClick={alarmReset}>리셋</button>
      </div>
      <ColorBox color={currentColor} />
    </div>
  )
}
