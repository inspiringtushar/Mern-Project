import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  userRegistrationReducer,
  userLoginReducer,
} from "./redux/reducers/userLoginReducer";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegistrationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
export default store;
