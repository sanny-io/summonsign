import React from 'react'
import { Platform } from '../../types'
import PlatformTag from '../PlatformTag'

export type TagTextBoxProps = {
  placeholder?: string,
  className?: string,
}

export function TagTextBox({ placeholder, className = '' }: TagTextBoxProps) {
  return (
    <div className={`flex p-2 bg-gray-800 focus-within:ring focus-within:border-blue-500 ${className}`}>
      <PlatformTag platform={Platform.PC} />
      <PlatformTag platform={Platform.Xbox} />

      <input
        placeholder={placeholder}
        className="!ring-0 w-full"
        type="text"
      />
    </div>
  )
}