'use client'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutEffect, useState } from 'react'

export default function Background() {
  const [topLeftHeight, setTopLeftHeight] = useState(740)
  const [topLeftWidth, setTopLeftWidth] = useState(740)

  const [topRightHeight, setTopRightHeight] = useState(1120)
  const [topRightWidth, setTopRightWidth] = useState(1120)

  const [bottomLeftHeight, setBottomLeftHeight] = useState(1120)
  const [bottomLeftWidth, setBottomLeftWidth] = useState(1120)

  const [bottomRightHeight, setBottomRightHeight] = useState(1220)
  const [bottomRightWidth, setBottomRightWidth] = useState(1220)

  const { width, height } = useWindowSize()

  const initialHeight = 768
  const initialWidth = 1366

  useLayoutEffect(() => {
    setTopLeftHeight(Math.floor(740 * (height / initialHeight)))
    setTopLeftWidth(Math.floor(740 * (width / initialWidth)))

    setTopRightHeight(Math.floor(1120 * (height / initialHeight)))
    setTopRightWidth(Math.floor(1120 * (width / initialWidth)))

    setBottomLeftHeight(Math.floor(1120 * (height / initialHeight)))
    setBottomLeftWidth(Math.floor(1120 * (width / initialWidth)))

    setBottomRightHeight(Math.floor(1220 * (height / initialHeight)))
    setBottomRightWidth(Math.floor(1220 * (width / initialWidth)))
  }, [width, height])

  return (
    <div className="fixed h-screen w-screen" role="img" aria-label="Background Image">
      <div
        className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 rounded-full bg-teal-400 opacity-20 blur-[128px]"
        style={{ height: `${topLeftHeight}px`, width: `${topLeftWidth}px` }}
      ></div>
      <div
        className="absolute right-0 top-0 -translate-y-1/3 translate-x-20 rounded-full bg-indigo-400 opacity-20 blur-[128px]"
        style={{ height: `${topRightHeight}px`, width: `${topRightWidth}px` }}
      ></div>
      <div
        className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2 rounded-full bg-fuchsia-400 opacity-20 blur-[128px]"
        style={{ height: `${bottomLeftHeight}px`, width: `${bottomLeftWidth}px` }}
      ></div>
      <div
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 rounded-full bg-pink-400 opacity-20 blur-[128px]"
        style={{ height: `${bottomRightHeight}px`, width: `${bottomRightWidth}px` }}
      ></div>
    </div>
  )
}
