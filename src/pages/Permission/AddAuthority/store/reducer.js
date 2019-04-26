import * as constants from './constants';

const defaultState = {
  value: {
    opName: '',
    opLevel: '',
  }
};

export default(state=defaultState, action) => {
  if(action.type == constants.CHANGEINPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.value;
    return newState;
  }if(action.type == constants.RESETADDFORM){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value.opName = '';
    newState.value.opLevel = '';
    return newState;
  }
      return state;
}