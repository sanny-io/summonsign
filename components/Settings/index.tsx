import React, { useContext, useEffect, useState } from 'react'
import { CheckBox, TextBox, TagTextBox } from '../Inputs'
import { Platform, BossFilter, DS3, DS1 } from '../../types'
import { SettingsContext } from '../../state'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../firebase'
import Select, { SelectItem } from '../Select'

export type SettingsProps = {
  bossFilter: BossFilter,
  bosses: string[],
  updateInterval: number,
  hideFulfilledDuties: boolean,
  shouldNotify: boolean,
  playNotificationSound: boolean,
  platforms: Platform[],
}

export default function Settings() {
  const { settings, updateSetting } = useContext(SettingsContext)
  const [user] = useAuthState(firebase.auth())
  const [platforms, setPlatforms] = useState<unknown>(settings.platforms.map(platform => ({ label: Platform[platform], value: platform })))
  const [bosses, setBosses] = useState<unknown>(settings.bosses.map(boss => ({ label: boss, value: boss })))

  useEffect(() => {
    updateSetting('platforms', (platforms as SelectItem[]).map(platform => platform.value))
  }, [platforms])

  useEffect(() => {
    updateSetting('bosses', (bosses as SelectItem[]).map(boss => boss.value))
  }, [bosses])

  return (
    <div className="w-full my-6 text-left">
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={[Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5, Platform.Switch].map(
          platform => ({ label: Platform[platform], value: platform })
        )}
        value={platforms}
        placeholder="Platforms"
        onChange={setPlatforms}
      />

      <Select
        isMulti
        closeMenuOnSelect={false}
        options={Object.keys({ ...DS1.bosses, ...DS3.bosses }).map(boss => ({ label: boss, value: boss }))}
        value={bosses}
        placeholder="Bosses"
        onChange={setBosses}
      />

      <CheckBox
        checked={settings.hideFulfilledDuties}
        onChange={v => updateSetting('hideFulfilledDuties', v)}
      >
        Hide fulfilled duties
      </CheckBox>

      <CheckBox
        checked={settings.shouldNotify}
        onChange={v => updateSetting('shouldNotify', v)}
      >
        Notify me of new duties
      </CheckBox>

      <CheckBox
        className="ml-6"
        disabled={!settings.shouldNotify}
        checked={settings.playNotificationSound}
        onChange={v => updateSetting('playNotificationSound', v)}
      >
        and play a sound
      </CheckBox>

      <span>
        Check for new duties every

        <TextBox
          type="number"
          className="w-[100px] pl-2 mx-2"
          value={settings.updateInterval}
          onChange={value => updateSetting('updateInterval', Number(value))}
        />

        seconds
      </span>

      {
        !user && <span className="block mt-4">Sign in to save your settings.</span>
      }
    </div>
  )
}