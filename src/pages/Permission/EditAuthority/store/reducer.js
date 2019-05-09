import * as constants from './constants';

const defaultState = {
  value: {
    opName: '',
    opLevel: '',
    modifier: '',
    description: ''
  }
};

export default(state=defaultState, action) => {
  if(action.type == constants.CHANGEINPUT){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.value;
    return newState;
  }
  if(action.type == constants.DISPLAYAUTHORITYINFO){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value.opName = action.value.opName;
    newState.value.opLevel = action.value.opLevel;
    newState.value.modifier = action.value.modifier;
    newState.value.description = action.value.description;
    return newState;
  }
  return state;
}