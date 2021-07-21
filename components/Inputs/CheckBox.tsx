import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'

export type CheckBoxProps = {
  checked?: boolean,
  name?: string,
  children: React.ReactNode,
  disabled?: boolean,
  className?: string,
  onChange?: React.Dispatch<boolean>,
}

export function CheckBox({ children, onChange, className = '', checked = false, disabled = false }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  useEffect(() => {
    if (onChange) {
      onChange(isChecked)
    }
  }, [isChecked])

  return (
    <Switch
      checked={isChecked}
      onChange={setIsChecked}
      className={`block ${className}`}
    >
      {
        props => (
          <>
            <input disabled={disabled} type="checkbox" className="mr-2 pointer-events-none" checked={props.checked} readOnly />
            <span>{children}</span>
          </>
        )
      }
    </Switch>
  )
}