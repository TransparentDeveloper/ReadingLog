import { useCallback, useEffect, useState } from "react"

export const useAlarm = (ms:number) => {
  const [ring, setRing] = useState(0)
  const [isStart, setIsStart] = useState(false)
  
  useEffect(() => {

    if (!isStart) return
    
    const timeoutId = setInterval(() => { 
      setRing((prev) => prev + 1)  
    }, ms)
    
    return () => {
      clearInterval(timeoutId)
    }
  }, [isStart, ms])

  const alarmStart = useCallback(() => { 
    setIsStart(true)
  }, [])
  
  const alarmReset = useCallback(() => {
    setIsStart(false)
    setRing(0)
  },[])
  
  return {ring, alarmStart, alarmReset}
}