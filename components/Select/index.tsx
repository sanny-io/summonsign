import React from 'react'
import InternalSelect, { StylesConfig, Props as SelectProps } from 'react-select'

export type SelectItem = {
  label: string,
  value: unknown,
}

const styles: StylesConfig = {
  menu: provided => ({ ...provided, background: '#262626' }),
  input: provided => ({ ...provided, color: 'white' }),
  control: provided => ({ ...provided, background: '#262626', border: 'none' }),
  multiValue: provided => ({ ...provided, background: 'black', border: 'none', padding: '3px' }),
  multiValueLabel: provided => ({ ...provided, color: 'white' }),
  multiValueRemove: provided => (
    {
      ...provided,
      marginLeft: '6px',
      '&:hover': { background: '#7d2929' },
    }
  ),
  option: (provided, state) => (
    {
      ...provided,
      '&:hover': { background: '#3B82F6' },
      background: state.isFocused ? '#3B82F6' : undefined,
      cursor: 'pointer'
    }
  ),
}

export default function Select(props: SelectProps) {
  return (
    <InternalSelect
      {...props}
      styles={styles}
      className="mb-4 border-gray-800"
    />
  )
}