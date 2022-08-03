import { createAsyncThunk } from '@reduxjs/toolkit'
import { Route } from '../../types'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

export default createAsyncThunk('auth/signOut', async () => await signOut(auth))