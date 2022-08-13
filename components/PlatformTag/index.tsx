import React, { memo } from 'react'
import type { Platform } from '../../types'

type Props = {
  platform: Platform,
  children?: React.ReactNode,
}

const platformColorMap: Record<Platform, string> = {
  pc: 'text-orange-300 border-orange-900',
  xbox: 'text-green-300 border-green-800',
  ps4: 'text-blue-300 border-blue-800',
  ps5: 'text-white border-blue-200',
  switch: 'text-red-400 border-red-700',
}

function PlatformTag({ platform, children }: Props) {
  return (
    <span className={`self-start px-3 mr-4 border bg-gray-800 ${platformColorMap[platform]}`}>
      PC
    </span>
  )
}

export default memo(PlatformTag)