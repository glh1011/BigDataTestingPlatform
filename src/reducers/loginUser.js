/**
 * 登录用户
 */
import qs from 'querystring';
import base from 'js-base64';
import { LOGIN_USER } from '../actions/loginUser';

const initialLoginUser = {
  loginUser: qs.parse(base.Base64.decode(sessionStorage.getItem('USER'))), // 解密 || {},
};

const loginUserReducer = (state = initialLoginUser, action) => {
  switch (action.type) {
    case LOGIN_USER.SAVE_LOGINUSER:
      return {
        ...state,
        loginUser: action.loginUser,
      };
    default:
      return state;
  }
};

export default loginUserReducer;
