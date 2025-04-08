import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../graphql/client'
import { GET_USER } from '../../graphql/queries/user'
import { login } from '../../auth'
import { setPages } from '../slices/pageSlice'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await login(username, password)    
    if(response.message == "Authentication failed") {
      alert('Login failed. Please check your credentials and try again.')
      throw new Error('Login failed. Please check your credentials and try again.')
    }
    else if(response.message == "Authentication successful") {
      localStorage.setItem('username', response.user_profile.Username)
      localStorage.setItem('auth_token', response.auth_response.AuthenticationResult.IdToken)
      localStorage.setItem('refresh_token', response.auth_response.AuthenticationResult.RefreshToken)
      return {
        token: response.auth_response.AuthenticationResult.IdToken,
        username: response.user_profile.Username
      } 
    }
    else {
      alert('Login failed. Please check your credentials and try again.')
      throw new Error('Login failed. Please check your credentials and try again.')
    }
  }
)

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { dispatch }) => {
    const username = localStorage.getItem('username')
    const { data } = await client.query({
      query: GET_USER,  
      variables: {
        username
      }
    })
    dispatch(setPages(JSON.parse(data.getUser.gameData.documentRoot).DNAliens))
    return {username, ...data.getUser}
  }
)

const initialState = {
  username: localStorage.getItem('username'),
  isLoggedIn: false,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.username = ''
      state.isLoggedIn = false
      state.token = null
      state.error = null
      localStorage.removeItem('auth_token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.token = action.payload.token
        state.username = action.payload.username
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.username = action.payload.username
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        if (action.error.message.includes('unauthorized')) {
          state.isLoggedIn = false
          state.token = null
          localStorage.removeItem('auth_token')
        }
      })
  },
})

export const { setUsername, setIsLoggedIn, setToken, logout } = authSlice.actions

export default authSlice.reducer
