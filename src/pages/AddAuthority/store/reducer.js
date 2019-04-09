import * as constants from './constants';

const defaultState = {
  value: {
    opName: '',
    opLevel: '',
    modifier: '',
  }
};

export default(state=defaultState, action) => {
  if(action.type == constants.CHANGEINPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.value;
    return newState;
  }
      return state;
}