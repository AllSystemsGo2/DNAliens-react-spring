import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../graphql/client'
import { WRITE_GAME_DATA } from '../../graphql/mutations/gameData'
import { GET_USER } from '../../graphql/queries/user'

export const setPageAttribute = createAsyncThunk(
  'page/setPageAttribute',
  async ({pageId, key, value}, { getState }) => {
    try {
      const { data } = await client.query({
        query: WRITE_GAME_DATA,
        variables: {
          username: getState().auth.username,
          documentPath: `DNAliens/${pageId}/${key}`,
          value: value
        }
      })

      if(data.errors.length == 0) {
        return { pageId, key, value }
      } else {
        throw new Error(data.errors[0].message)
      }
    } catch { // (error) {
      // throw error
      // TECH-DEBT: Store the changed value locally even if the cloud write fails 
      return { pageId, key, value }
    }
  }
)

export const getPages = createAsyncThunk(
  'page/getPages',
  async (_, { getState }) => {
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        username: getState().auth.username
      }
    })

    if(data.errors.length == 0) {
      return { data: data.getUser.documentRoot['DNAliens'] }
    } else {
      throw new Error(data.errors[0].message)
    }
  }
)
export const initializePageAttribute = createAsyncThunk(
  'page/initializePageAttribute',
  async ({pageId, key, defaultValue}, { getState }) => {
    // if (!getState().page?.pages?.[pageId]?.[key]) {
      // await dispatch(setPageAttribute({pageId, key, value:defaultValue}))
    // }
    console.log(pageId, key, defaultValue)
    return { 
      pageId, 
      key, 
      value: selectPageAttribute(getState(), pageId, key, defaultValue) 
    }
  }
)


export const selectPageAttribute = (state, pageId, key, defaultValue) => {
  return state.page?.pages?.[pageId]?.[key] ?? defaultValue
}



const initialState = {
  loading: false,
  pages: {},
  error: null
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPageAttribute.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(setPageAttribute.fulfilled, (state, action) => {
        state.loading = false
        if (!state.pages[action.payload.pageId]) {
          state.pages[action.payload.pageId] = {}
        }
        state.pages[action.payload.pageId][action.payload.key] = action.payload.value
      })
      .addCase(setPageAttribute.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getPages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.loading = false
        state.pages = action.payload.data
      })
      .addCase(getPages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(initializePageAttribute.fulfilled, (state, action) => {
        state.loading = false
        console.log("action.payload", action.payload)
        if (!state.pages[action.payload.pageId]) {
          state.pages[action.payload.pageId] = {}
        }
        state.pages[action.payload.pageId][action.payload.key] = action.payload.value
      })
  }
})

export default pageSlice.reducer