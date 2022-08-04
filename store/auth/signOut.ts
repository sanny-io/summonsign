import { createAsyncThunk } from '@reduxjs/toolkit'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export default createAsyncThunk('auth/signOut', async () => signOut(auth))