import React, { useContext } from 'react'
import { CheckBox, TextBox, TagTextBox } from '../Inputs'
import { Platform, BossFilter } from '../../types'
import { SettingsContext } from '../../state'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'

export type SettingsProps = {
  bossFilter: BossFilter,
  updateInterval: number,
  hideFulfilledDuties: boolean,
  shouldNotify: boolean,
  playNotificationSound: boolean,
  platforms: Platform[],
}

export default function Settings() {
  const { settings, updateSetting } = useContext(SettingsContext)
  const [user] = useAuthState(firebase.auth())

  return (
    <div className="w-full my-6 text-left">
      <TagTextBox
        className="mb-4"
        placeholder="Platforms" />

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
          value={settings.updateInterval.toString()}
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