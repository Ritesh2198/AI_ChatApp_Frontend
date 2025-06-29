import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import chatReducer from "../slices/chatSlice"



const rootReducer = combineReducers({
  auth: authReducer,
  chat : chatReducer,
  
})

export default rootReducer