import { configureStore } from '@reduxjs/toolkit'
import crashSiteReducer from './slices/crashSiteSlice'

export const store = configureStore({
  reducer: {
    crashSite: crashSiteReducer,
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
