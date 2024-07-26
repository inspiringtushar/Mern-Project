import axios from "axios";
import {
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
} from "../constants/userRegistration";

const RegisterUser = (name, email, password, pic) => async (dispatch) => {
  let result;
  try {
    dispatch({ type: USER_REGISTRATION_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users",
      { name, email, password, pic },
      config
    );
    result = data;
    console.log(data);
    dispatch({ type: USER_REGISTRATION_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTRATION_FAIL,
      payload: error?.response?.data?.message ?? error.message,
    });
  }
  return result;
};
export default RegisterUser;
