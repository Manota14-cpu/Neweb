import { useLottie } from 'lottie-react'
import { useRef } from 'react'

interface LottiePlayerProps {
  animationData: unknown
  className?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  style?: React.CSSProperties
}

export default function LottiePlayer({ animationData, className, loop = true, autoplay = true, speed = 1, style }: LottiePlayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { View } = useLottie({
    animationData,
    loop,
    autoplay,
  })

  return (
    <div ref={ref} className={className} style={{ width: 200, height: 200, ...style }}>
      {View}
    </div>
  )
}
