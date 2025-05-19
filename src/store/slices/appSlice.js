import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPageId } from '../../helpers/locationHelper'


export const navigateTo = createAsyncThunk(
  'app/navigateTo',
  async ({navigate, path }, { dispatch }) => {
    console.log("Navigating to", path)
    navigate(path)
    dispatch(setPageId(getPageId(path)))
    return true
  }
)


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
  },
  extraReducers: (builder) => {
    builder
      .addCase(navigateTo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(navigateTo.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(navigateTo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setLoading, setError, setPageId } = appSlice.actions

export default appSlice.reducer