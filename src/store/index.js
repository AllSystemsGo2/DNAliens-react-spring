import { configureStore } from '@reduxjs/toolkit'
import crashSiteReducer from './slices/crashSiteSlice'
import frisbeeReducer from './slices/frisbeeSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    crashSite: crashSiteReducer,
    frisbee: frisbeeReducer,
    auth: authReducer,
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
