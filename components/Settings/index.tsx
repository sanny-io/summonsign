import React, { memo } from 'react'
import useSettings from '../../hooks/useSettings'

function Settings() {
  const { settings, updateSetting } = useSettings()

  return (
    <input
      type="checkbox"
      onChange={() => updateSetting('hideFulfilledDuties', true)}
    />
  )
}

export default memo(Settings)