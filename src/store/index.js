import { configureStore } from '@reduxjs/toolkit'
import crashSiteReducer from './slices/crashSiteSlice'
import authReducer from './slices/authSlice'
import pageReducer from './slices/pageSlice'

export const store = configureStore({
  reducer: {
    crashSite: crashSiteReducer,
    page: pageReducer,
    auth: authReducer,
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
