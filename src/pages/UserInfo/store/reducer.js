//import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = {
   value: {
    // username: '用户一',
    // userRank: '',
    // upperId: '',
    // passwd: '',
    // displayName: '',
    // email: '',
   }
};

export default (state = defaultState, action) => {
  if(action.type == constants.CHANGEINPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    // newState.value.displayName = action.displayName;
    // newState.value.email = action.email;
    // newState.value.passwd = action.passwd;
    newState.value = action.value;
    return newState;
  }
  if(action.type == 'display_user_info') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.data.value;
    return newState;
  }
  return state;
}