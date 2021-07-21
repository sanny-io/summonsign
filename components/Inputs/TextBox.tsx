import React, { useState } from 'react'

export type TextBoxProps = {
  className?: string,
  value?: string,
  type?: string,
  onChange?: React.Dispatch<string>,
}

export function TextBox({ value, onChange, className, type }: TextBoxProps) {
  const [content, setContent] = useState<string>('')

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChange(e.currentTarget.value)
    }
  }

  const handleChange = (value: string) => {
    if (value !== content) {
      setContent(value)

      if (onChange) {
        onChange(value)
      }
    }
  }

  return (
    <input
      type={type}
      className={className}
      defaultValue={value}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}