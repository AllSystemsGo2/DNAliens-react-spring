import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import pageReducer from './slices/pageSlice'
import responseReducer from './slices/responseSlice'
import appReducer from './slices/appSlice'

export const store = configureStore({
  reducer: {
    response: responseReducer,
    page: pageReducer,
    auth: authReducer,
    app: appReducer
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
