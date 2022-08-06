import { createAsyncThunk } from '@reduxjs/toolkit'
import { Duty } from '../../types'

export default createAsyncThunk('duties/refresh', async () => {
  return Promise.resolve([] as Duty[])
})