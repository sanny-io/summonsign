import React, { memo } from 'react'
import useSettings from '../../hooks/useSettings'
import { Checkbox, NumberInput } from '@mantine/core'
import useAuth from '../../hooks/useAuth'

function Settings() {
  const { settings, updateSettings } = useSettings()
  const { isAuthenticating } = useAuth()

  return (
    <div className="container">
      <div className="space-y-2">
        <Checkbox
          label="Hide fulfilled duties"
          disabled={isAuthenticating}
          checked={settings.hideFulfilledDuties}
          onChange={e => updateSettings({ hideFulfilledDuties: e.currentTarget.checked })}
        />

        <Checkbox
          label="Notify me of new duties"
          disabled={isAuthenticating}
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

        <div>
          <label htmlFor="updateInterval">
            Check for new duties every
            <NumberInput
              id="updateInterval"
              value={settings.updateInterval}
              onChange={interval => updateSettings({ updateInterval: interval })}
              min={10}
              defaultValue={10}
            />
            seconds
          </label>
        </div>
      </div>
    </div>
  )
}

export default memo(Settings)