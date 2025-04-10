import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../graphql/client'
import { WRITE_RESPONSE_DATA } from '../../graphql/mutations/responseData'

const writeResponse = createAsyncThunk(
  'response/writeResponse',
  async ({ key, value }, { getState }) => {
    try {
      const lesson = getState().app.lesson
      const { data } = await client.mutate({
        mutation: WRITE_RESPONSE_DATA,
        variables: {
          username: getState().auth.username,
          lesson,
          key,
          value
        }
      })

      if(!data.writeResponse.errors || data.writeResponse.errors.length == 0) {
        return { lesson, key, value, delivered: true }
      } else {
        throw new Error(data.writeResponse.errors[0].message)
      }
    } catch (error) {
      console.error("writeResponseData error", error)
      throw error      
    }
  }
)

export const setResponse = createAsyncThunk(
  'response/setResponse',
  async ({ key, value }, { dispatch, getState }) => {
    dispatch(writeResponse({ key, value}))
    return { lesson: getState().app.lesson, key, value, delivered:false }
  }
)


const initialState = {
  loading: false,
  responses: {},
  error: null
}

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponses: (state, action) => {
      state.responses = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(setResponse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(setResponse.fulfilled, (state, action) => {
        state.loading = false
        if (!state.responses[action.payload.lesson]) {
          state.responses[action.payload.lesson] = {}
        }
        state.responses[action.payload.lesson][action.payload.key] = action.payload
      })
      .addCase(setResponse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(writeResponse.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(writeResponse.fulfilled, (state, action) => {
        state.loading = false
        if (!state.responses[action.payload.lesson]) {
          state.responses[action.payload.lesson] = {}
        }
        state.responses[action.payload.lesson][action.payload.key] = action.payload
      })
  }
})

export const { setResponses } = responseSlice.actions

export default responseSlice.reducer