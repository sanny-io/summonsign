import type { Duty, Settings } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import refreshDuties from './refreshDuties'
import { setSettings } from '../settings'

const filterDuties = (duties: Duty[], settings: Settings) => {
  let filteredDuties = [...duties]

  if (settings.hideFulfilledDuties) {
    filteredDuties = filteredDuties.filter(duty => !duty.isFulfilled)
  }

  if (settings.bosses.length > 0) {
    filteredDuties = filteredDuties.filter(duty => duty.boss && settings.bosses.includes(duty.boss))
  }

  if (settings.platforms.length > 0) {
    filteredDuties = filteredDuties.filter(duty => settings.platforms.includes(duty.platform))
  }

  return filteredDuties
}

type DutiesState = {
  duties: Duty[],
  filteredDuties: Duty[],
}

const initialState: DutiesState = {
  duties: [],
  filteredDuties: [],
}

const dutiesSlice = createSlice({
  name: 'duties',
  initialState,
  reducers: {
    setDuties(state, { payload: duties }: PayloadAction<Duty[]>) {
      state.duties = duties
    },
  },

  extraReducers: builder => {
    builder.addCase(setSettings, (state, { payload: settings }) => {
      state.filteredDuties = filterDuties(state.duties, settings)
    })

    builder.addCase(refreshDuties.fulfilled, (state, { payload: { duties, settings } }) => {
      state.duties = duties
      state.filteredDuties = filterDuties(state.duties, settings)
    })
  },
})

export default dutiesSlice
export { refreshDuties }