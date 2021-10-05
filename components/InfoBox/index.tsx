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
    <div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-3">
      <Info label="Boss">{duty.boss || 'None'}</Info>
    </div>
  )
}