import * as actionTypes from "./actionTypes";
import API from "../../axiosApi";
import { message } from 'antd';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  try {
    API.post('accounts/blacklist/', {
        "refreshToken": localStorage.getItem("refreshToken")
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return {
      type: actionTypes.AUTH_LOGOUT
    };
    }
    catch (e) {
        console.log(e);
    }
  

};


export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    API.post("token/", {
        email: email,
        password: password,
    })
    .then(res => {
        console.log(res.data.access)
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(authSuccess(accessToken));
        message.success('Sikeresen belépve');
    })
    .catch(err => {
      console.log(err.response.data)
      dispatch(authFail(err.response.data));
    });
  };
};

export const authSignup = (obj) => {
  return dispatch => {
    dispatch(authStart());
    API.post("accounts/register/", {
        email: obj.email,
        password: obj.password,
        password2: obj.password2
      })
      .then(res => {
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(authSuccess(accessToken));
        message.success('Regisztráció sikeres');
      })
      .catch(err => {
        console.log(err.response.data)
        dispatch(authFail(err.response.data));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("accessToken");
    if (token === undefined) {
      dispatch(logout());
    } else {
        dispatch(authSuccess(token));
    }
  };
};