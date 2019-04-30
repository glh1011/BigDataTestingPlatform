/**
 * 登录用户
 */
export const LOGIN_USER = {
  SAVE_LOGINUSER: 'SAVE_LOGINUSER',
  // GET_LOGINUSER: 'GET_LOGINUSER',
};

export const saveLoginUser = (loginUser) => ({
  type: 'SAVE_LOGINUSER',
  loginUser,
});
