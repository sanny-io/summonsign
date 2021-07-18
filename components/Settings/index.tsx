import React, { useRef, useEffect, useState, useContext } from 'react'
import CheckBox from '../CheckBox'
import useLocalStorage from 'use-local-storage'
import { Platform } from '../../types'
import Loading from '../Loading'
import firebase from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SettingsContext } from '../../state'

export type SettingsProps = {
  bossFilter: BossFilter,
  updateInterval: number,
  hideFulfilledDuties: boolean,
  shouldNotify: boolean,
  playNotificationSound: boolean,
  platforms: Platform[],
}

export enum BossFilter {
  Include,
  Exclude,
}

export type Setting =
  'bossFilter' | 'updateInterval' | 'hideFulfilledDuties' |
  'shouldNotify' | 'playNotificationSound' | 'platforms'

const includeBossFilter = (bosses: string[], boss: string) => bosses.includes(boss)
const excludeBossFilter = (bosses: string[], boss: string) => !bosses.includes(boss)

const bossFilters = {
  [BossFilter.Include]: includeBossFilter,
  [BossFilter.Exclude]: excludeBossFilter,
}

export default function Settings(props: SettingsProps) {
  const [settings, setSettings] = useState<SettingsProps>(props)
  const [user] = useAuthState(firebase.auth())
  const context = useContext(SettingsContext)

  console.log('CONTEXT IS', context)

  const updateSetting = (setting: Setting, value: any) => {
    setSettings({ ...settings, [setting]: value })

    if (user) {
      firebase
        .firestore()
        .doc(`settings/${user.uid}`)
        .set({ [setting]: value }, { merge: true })
    }
  }

  return (
    <div className="w-full mb-6">
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

        <input
          type="number"
          className="w-[100px] pl-2 mx-2"
          value={settings.updateInterval}
          onChange={e => updateSetting('updateInterval', Number(e.target.value))}
          min={10}
        />

        seconds
      </span>
    </div>
  )
}

// export default function Settings({ }) {
//   const [bossFilter, setBossFilter] = useLocalStorage<BossFilter>('bossFilter', BossFilter.Include)
//   const [updateInterval, setUpdateInterval] = useLocalStorage<number>('updateInterval', 10)
//   const [hideFulfilledDuties, setHideFulfilledDuties] = useLocalStorage<boolean>('hideFulfilledDuties', false)
//   const [shouldNotify, setShouldNotify] = useLocalStorage<boolean>('shouldNotify', false)
//   const [playNotificationSound, setPlayNotificationSound] = useLocalStorage<boolean>('playNotificationSound', false)
//   const echoSound = useRef<HTMLAudioElement>(null)
//   const [platforms, setPlatforms] = useLocalStorage<Platform[]>('platforms',
//     [
//       Platform.PC, Platform.Xbox, Platform.PS4, Platform.PS5, Platform.Switch
//     ]
//   )

//   const handleUpdateIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUpdateInterval(Number(e.target.value))
//   }

//   return (
//     <div className="w-full mb-6">
//       <CheckBox checked={hideFulfilledDuties} onChange={setHideFulfilledDuties}>
//         Hide fulfilled duties
//       </CheckBox>

//       <CheckBox checked={shouldNotify} onChange={setShouldNotify}>
//         Notify me of new duties
//       </CheckBox>

//       <CheckBox className="ml-6" disabled={!shouldNotify} checked={playNotificationSound} onChange={setPlayNotificationSound}>
//         and play a sound
//       </CheckBox>

//       <span>Check for new duties every <input type="number" className="w-[100px] pl-2 mx-2" value={updateInterval} onChange={handleUpdateIntervalChange} min={10} /> seconds</span>
//       <audio src="/audio/echo.mp3" ref={echoSound} />
//     </div>
//   )
// }

// bossFilter,
  // updateInterval,
  // hideFulfilledDuties,
  // shouldNotify,
  // playNotificationSound,
  // platforms,
  // const [settingsDocument, loading, error] = useDocument(
  //   firebase.firestore().doc(`settings/${firebase.auth().currentUser?.uid}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // )