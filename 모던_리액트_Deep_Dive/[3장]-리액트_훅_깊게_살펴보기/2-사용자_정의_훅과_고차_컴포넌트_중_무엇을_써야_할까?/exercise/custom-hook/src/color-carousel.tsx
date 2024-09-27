import { ColorFamily } from "color-family"
import { useEffect, useMemo, useState } from "react"
import { useAlarm } from "./use-alarm"


const ColorCarousel = () => {
  const [boxIdx, setBoxIdx] = useState(0)
  const { ring, alarmStart } = useAlarm(2000)

  const COLORS = useMemo(() => {
    return Array.from({ length: 6 }, () => new ColorFamily().pastel().getHexCode())
  }, [])
  
  useEffect(() => {
    const colorArrSize = COLORS.length
    setBoxIdx(ring%colorArrSize)
   },[ring, COLORS])

  useEffect(() => {
    alarmStart()
  },[alarmStart])
  
  
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: COLORS[boxIdx],
        transition: "background-color 1.5s ease",
      }}
    />
  )
}
export default ColorCarousel