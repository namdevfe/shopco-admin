import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: {
    accessToken: string
    refreshToken: string
  } | null
}

const initialState: AuthState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.token = action.payload
    },
    logout(state) {
      state.token = null
    }
  }
})

export const { actions, reducer: authReducer } = authSlice
export const { setToken, logout } = actions
export default authReducer
