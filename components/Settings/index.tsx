import React, { memo } from 'react'
import useSettings from '../../hooks/useSettings'
import { Checkbox } from '@mantine/core'

function Settings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="container">
      <Checkbox
        label="Hide fulfilled duties"
        checked={settings.hideFulfilledDuties}
        onChange={e => updateSettings({ hideFulfilledDuties: e.currentTarget.checked })}
      />
    </div>
  )
}

export default memo(Settings)