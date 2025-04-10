import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  lesson: "DNAliens.Test",
  error: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setLoading, setError } = appSlice.actions

export default appSlice.reducer