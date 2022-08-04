import React, { memo } from 'react'
import useSettings from '../../hooks/useSettings'
import { Checkbox, NumberInput } from '@mantine/core'

function Settings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="container">
      <div className="space-y-2">
        <Checkbox
          label="Hide fulfilled duties"
          checked={settings.hideFulfilledDuties}
          onChange={e => updateSettings({ hideFulfilledDuties: e.currentTarget.checked })}
        />

        <Checkbox
          label="Notify me of new duties"
          checked={settings.shouldNotify}
          onChange={e => updateSettings({ shouldNotify: e.currentTarget.checked })}
        />

        <Checkbox
          label="and play a sound"
          disabled={!settings.shouldNotify}
          checked={settings.playNotificationSound}
          onChange={e => updateSettings({ playNotificationSound: e.currentTarget.checked })}
          className="ml-8"
        />

        <p>
          Check for new duties every <NumberInput /> seconds
        </p>
      </div>
    </div>
  )
}

export default memo(Settings)