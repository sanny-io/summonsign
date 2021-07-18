import React from 'react'
import { DutyProps } from '../Duty'

export type InfoBoxProps = {
  duty: DutyProps,
}

type InfoProps = {
  label: string,
  children: string | boolean | undefined,
}

const Info = ({ label, children }: InfoProps) => {
  switch (typeof children) {
    case 'undefined':
      children = 'None'
    case 'boolean':
      children = children ? 'Yes' : 'No'
  }

  return (
    <div>
      <span className="font-bold">{label}: </span>
      <span>{children}</span>
    </div>
  )
}

export default function InfoBox({ duty }: InfoBoxProps) {
  return (
    <div className="grid grid-cols-3 mb-4">
      <Info label="Boss">{duty.boss || 'None'}</Info>
    </div>
  )
}