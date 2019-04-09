//import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = {
  subUserInfo: {
    // username: '',
    // userRank: '',
    // upperId: '',
    // passwd: '',
    // displayName: '',
    // email: '',
   }
};

export default (state = defaultState, action) => {
  if(action.type == constants.SETSUBUSERINFO){
    const newState = JSON.parse(JSON.stringify(state));
    // newState.value.displayName = action.displayName;
    // newState.value.email = action.email;
    // newState.value.passwd = action.passwd;
    newState.subUserInfo = action.data;
    return newState;
  }
  return state;
}