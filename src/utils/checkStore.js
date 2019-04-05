import conformsTo from 'lodash/conformsTo';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import invariant from 'invariant';
import qs from 'querystring';
import base from 'js-base64';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    injectedReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store'
  );
}

/**
 * check sessionStorage login
 * name,
   passwd,
   timestamp
 */
const EXPIRES_TIME = 3600 * 24; // 超过一天即为失效
export function checkAuthState() {
  const nowStamp = Math.floor(new Date().getTime() / 1000);

  const USER = qs.parse(base.Base64.decode(sessionStorage.getItem('USER')));
  if (!USER) {
    sessionStorage.clear();
    return {
      isAuth: false,
    };
  }
  const { timestamp } = USER;

  if ((nowStamp - timestamp > EXPIRES_TIME)) {
    sessionStorage.clear();
    return {
      isAuth: false,
    };
  }
  return {
    isAuth: true,
  };
}

/**
 * 每调用一次接口就更新一次 = 「用户token刷新」
 */
export function updateAuthState() {
  let USER = qs.parse(base.Base64.decode(sessionStorage.getItem('USER'))); // 解密
  USER.timestamp = Math.floor(new Date().getTime() / 1000);

  // save
  sessionStorage.setItem('USER', base.Base64.encode(qs.stringify(USER)));
}
