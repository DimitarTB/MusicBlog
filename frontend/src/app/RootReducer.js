import { combineReducers } from "redux"

import userReducer from '../features/User/userSlice'
import generalReducer from '../features/General/GeneralSlice'
import albumReducer from '../features/Albums/AlbumsSlice'

export default combineReducers({
    user: userReducer,
    general: generalReducer,
    album: albumReducer
})