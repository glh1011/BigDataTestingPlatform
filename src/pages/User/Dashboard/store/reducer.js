import * as constants from './constants';

const defaultState = {
   current: 1,
   total: 0,
   subUsers: []
};

export default(state=defaultState, action) => {
  if(action.type == constants.CHANGESUBUSERLIST){
    const newState = JSON.parse(JSON.stringify(state));
    newState.subUsers = action.subUsers;
    newState.total = action.total;
    return newState;
  }if(action.type == constants.CLEARTABLE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.subUsers = [];
    newState.total = 0;
    return newState;
  }
  return state;
}