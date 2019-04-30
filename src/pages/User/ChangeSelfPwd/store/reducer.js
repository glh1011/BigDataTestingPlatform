import * as constants from './constants';

const defaultState = {
  value: {
    passwd: '',
    rePasswd: '',
    oldPasswd: '',
  }
};

export default(state=defaultState, action) => {
  if(action.type == constants.CHANGEPASSWORDINPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value.passwd = action.value.passwd;
    newState.value.rePasswd = action.value.rePasswd;
    newState.value.oldPasswd = action.value.oldPasswd;
    return newState;
  }if(action.type == constants.RESETPWDFORM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value.passwd = '';
    newState.value.rePasswd = '';
    newState.value.oldPasswd = '';
    return newState;
  }
      return state;
}