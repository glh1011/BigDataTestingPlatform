import * as constants from './constants';

const defaultState = {
  subUserInfo: {}
};

export default (state = defaultState, action) => {
  if(action.type == constants.SETSUBUSERINFO){
    const newState = JSON.parse(JSON.stringify(state));
    newState.subUserInfo = action.data;
    return newState;
  }
  return state;
}