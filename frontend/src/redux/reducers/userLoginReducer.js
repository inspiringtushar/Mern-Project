import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userLoginConstant";
import {
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from "../constants/userRegistration";
const initialState = {
  loading: false,
  error: "",
  userInfo: null,
};
const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      console.log("abc", action);
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      console.log("def", action);
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case USER_LOGIN_FAIL:
      console.log("xyz", action);
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return initialState;
    default:
      return initialState;
  }
};
const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      console.log("abc", action);
      return { ...state, loading: true, error: "" };
    case USER_REGISTRATION_SUCCESS:
      console.log("def", action);
      return { ...state, loading: false, error: "", userInfo: action.payload };
    case USER_REGISTRATION_FAIL:
      console.log("xyz", action);
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return initialState;
    default:
      return initialState;
  }
};
export { userLoginReducer, userRegistrationReducer };
