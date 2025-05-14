import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../graphql/client'
import { WRITE_GAME_DATA } from '../../graphql/mutations/gameData'
import { GET_USER } from '../../graphql/queries/user'

import { setBubbleShow } from '../../helpers/bubbleHelper'

export const resetPageAttributes = createAsyncThunk(
  'page/resetPageAttributes',
  async (_, { getState }) => {
    try {
      const value = {}
      const { data } = await client.mutate({
        mutation: WRITE_GAME_DATA,
        variables: {
          username: getState().auth.username,
          documentPath: `DNAliens/pages`,
          value
        }
      })

      if(!data.writeGameData.errors || data.writeGameData.errors.length == 0) {
        return { success: true, pages: {} }
      } else {
        throw new Error(data.writeGameData.errors[0].message)
      }
    } catch (error) {
      console.error("resetPageAttributes error", error)
      throw error      
    }
  }
)

const writePageAttribute = createAsyncThunk(
  'page/writePageAttribute',
  async ({pageId, key, value}, { getState }) => {
    try {
      const { data } = await client.mutate({
        mutation: WRITE_GAME_DATA,
        variables: {
          username: getState().auth.username,
          documentPath: `DNAliens/pages/${pageId}/${key}`,
          value: value
        }
      })

      if(!data.writeGameData.errors || data.writeGameData.errors.length == 0) {
        return { pageId, key, value }
      } else {
        throw new Error(data.writeGameData.errors[0].message)
      }
    } catch (error) {
      console.error("setPageAttribute error", error)
      throw error      
    }
  }
)

export const setPageAttribute = createAsyncThunk(
  'page/setPageAttribute',
  async ({pageId, key, value}, {getState, dispatch }) => {
    const _pageId = pageId ?? getState().app.pageId
    dispatch(writePageAttribute({pageId: _pageId, key, value}))
    return { pageId: _pageId, key, value }
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
      return { data: data.getUser.documentRoot['DNAliens']["pages"] }
    } else {
      throw new Error(data.errors[0].message)
    }
  }
)

export const initializePageAttributes = createAsyncThunk(
  'page/initializePageAttributes',
  async ({pageId, props}, { getState }) => {
    const _pageId = pageId ?? getState().app.pageId
    return { 
      pageId: _pageId, 
      props: Object.keys(props).map((k) => ({
        [k]: selectPageAttribute(getState(), _pageId, k, props[k])
      }))
      .reduce((p,c) => { return Object.assign(p, c) }, {})
    }
  }
)

export const selectPageAttributes = (state, pageId, defaultAttributes) => {
  return {...defaultAttributes, ...state.page?.pages?.[pageId]}
}

const selectPageAttribute = (state, pageId, key, defaultValue) => {
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
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload
    }
  },
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
      .addCase(setBubbleShow.fulfilled, (state, action) => {
        state.loading = false        
        if (!state.pages[action.payload.pageId]) {
          state.pages[action.payload.pageId] = {}
        }
        state.pages[action.payload.pageId][action.payload.key] = action.payload.value
      })
      .addCase(writePageAttribute.rejected, (state, action) => {
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
      .addCase(resetPageAttributes.pending, (state) => {
        state.loading = true
      })
      .addCase(resetPageAttributes.fulfilled, (state, action) => {
        state.loading = false
        state.pages = action.payload.pages
      })
      .addCase(resetPageAttributes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(initializePageAttributes.fulfilled, (state, action) => {
        state.loading = false
        if (!state.pages[action.payload.pageId]) {
          state.pages[action.payload.pageId] = {}
        }
        state.pages[action.payload.pageId] = {...state.pages[action.payload.pageId], ...action.payload.props}
      })
      .addCase(initializePageAttributes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { setPages } = pageSlice.actions

export default pageSlice.reducer