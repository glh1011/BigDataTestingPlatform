import * as constants from './constants';

const defaultState = {
  value: {
    userName: '',
    userLevel: '',
    name: '',
    email: '',
    passwd: ''
  }
};

export default(state=defaultState, action) => {
  if(action.type == constants.ADDSUBUSERFORMCHANGE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.value;
    return newState;
  }if(action.type == constants.RESETADDSUBUSER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = {};
    return newState;
  }
      return state;
}