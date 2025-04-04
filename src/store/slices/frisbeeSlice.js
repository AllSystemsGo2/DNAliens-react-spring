import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFlying: false,
  showUfoTimer: false,
  showUfo: false,
  showText: true,
  showCrash: false,
}

export const frisbeeSlice = createSlice({
  name: 'frisbee',
  initialState,
  reducers: {
    setIsFlying: (state, action) => {
      state.isFlying = action.payload
    },
    setShowUfoTimer: (state, action) => {
      state.showUfoTimer = action.payload
    },
    setShowUfo: (state, action) => {
      state.showUfo = action.payload
    },
    setShowText: (state, action) => {
      state.showText = action.payload
    },
    setShowCrash: (state, action) => {
      state.showCrash = action.payload
    },
  },
})

export const { 
  setIsFlying,
  setShowUfoTimer,
  setShowUfo,
  setShowText,
  setShowCrash,
} = frisbeeSlice.actions

export default frisbeeSlice.reducer
