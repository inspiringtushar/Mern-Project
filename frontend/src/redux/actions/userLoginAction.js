import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userLoginConstant";
const Login = (email, password) => async (dispatch) => {
  console.log("123", { email });
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users/login",
      {
        email,
        password,
      },
      config
    );
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log({ error });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error?.response?.data?.message ?? error.message,
    });
  }
};
const Logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};
export { Login, Logout };
