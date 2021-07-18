import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

export type CheckBoxProps = {
  checked?: boolean,
  name?: string,
  children: React.ReactNode,
  disabled?: boolean,
  className?: string,
  onChange?(value: boolean, name?: string): any,
}

export default function CheckBox({ children, name, className, onChange, checked = false, disabled = false }: CheckBoxProps) {
  const [, setIsChecked] = useState<boolean>(checked)
  const setIsCheckedWithCallback = (value: boolean) => {
    setIsChecked(value)

    if (onChange) {
      onChange(value, name)
    }
  }

  return (
    <Switch
      checked={checked}
      onChange={setIsCheckedWithCallback}
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