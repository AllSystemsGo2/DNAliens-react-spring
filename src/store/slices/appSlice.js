import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  name: "DNAliens",
  lesson: "DNAliens.Test",
  pageId: "",
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
    },
    setPageId: (state, action) => {
      state.pageId = action.payload
    }
  }
})

export const { setLoading, setError, setPageId } = appSlice.actions

export default appSlice.reducer