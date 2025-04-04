import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPlaying: true,
  volume: 0.5,
  isLoading: true,
  showPrompt: false,
  showSpeechBubble: false,
  showEnd: false,
}

export const crashSiteSlice = createSlice({
  name: 'crashSite',
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setVolume: (state, action) => {
      state.volume = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setShowPrompt: (state, action) => {
      state.showPrompt = action.payload
    },
    setShowSpeechBubble: (state, action) => {
      state.showSpeechBubble = action.payload
    },
    setShowEnd: (state, action) => {
      state.showEnd = action.payload
    },
  },
})

export const { 
  setIsPlaying, 
  setVolume, 
  setIsLoading, 
  setShowPrompt, 
  setShowSpeechBubble, 
  setShowEnd 
} = crashSiteSlice.actions

export default crashSiteSlice.reducer