import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import pageReducer from './slices/pageSlice'
import responseReducer from './slices/responseSlice'
import appReducer from './slices/appSlice'
import movableCharacterReducer from './slices/movableCharacterSlice'

export const store = configureStore({
  reducer: {
    response: responseReducer,
    page: pageReducer,
    auth: authReducer,
    app: appReducer,
    movableCharacters: movableCharacterReducer
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
