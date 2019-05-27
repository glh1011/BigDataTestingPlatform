import * as constants from './constants';

const defaultState = {
   current: 1,
   total: 0,
   value:'',
   url:'',
   PlatformLog: [],
   cluserName:[],
   loginUrl: '',
   loginUserName: '',
   loginPassword: ''
};

export default(state=defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case constants.CHANGELOGLIST:
      newState.PlatformLog = action.PlatformLog;
      newState.total = action.total;
      return newState;
    case constants.CHANGECLUSERNAME:
      newState.cluserName = action.cluserName;
      return newState;
    case constants.CHANGEURL:
      newState.url = action.url;
      return newState;
    case constants.SETPOSTLOGIN:
      newState.loginUrl = action.url;
      newState.loginPassword = action.j_password;
      newState.loginUserName = action.j_username;
      localStorage.setItem('CDHLoginUrl', action.url);
      localStorage.setItem('CDHLoginPassword', action.j_password);
      localStorage.setItem('CDHLoginUserName', action.j_username);
      return newState;
    default:
      return state;
  }
}