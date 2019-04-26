import * as constants from './constants';

const defaultState = {
   current: 1,
   total: 0,
   subUsers: []
};

export default(state=defaultState, action) => {
  switch(action.type) {
    case constants.CHANGESUBUSERLIST:
      const newState = JSON.parse(JSON.stringify(state));
      newState.subUsers = action.subUsers;
      newState.total = action.total;
      return newState;
    default:
      return state;
  }
}