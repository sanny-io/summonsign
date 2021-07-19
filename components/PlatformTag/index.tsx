import React from 'react'
import { Platform } from '../../types'

export type PlatformTagProps = {
  platform: Platform,
  children?: React.ReactNode,
}

const platformColorMap = {
  [Platform.PC]: 'text-orange-300 border-orange-900',
  [Platform.Xbox]: 'text-green-300 border-green-800',
  [Platform.PS4]: 'text-blue-300 border-blue-800',
  [Platform.PS5]: 'text-white border-blue-200',
  [Platform.Switch]: 'text-red-400 border-red-700',
}

export default function PlatformTag({ platform, children = Platform[platform] }: PlatformTagProps) {
  return (
    <span className={`self-start px-3 mr-4 border bg-gray-800 ${platformColorMap[platform]}`}>
      {children}
    </span>
  )
}