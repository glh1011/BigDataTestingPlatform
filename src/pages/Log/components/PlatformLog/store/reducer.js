import * as constants from './constants';

const defaultState = {
   current: 1,
   total: 0,
   value:'',
   url:'',
   PlatformLog: [],
   cluserName:[]
};

export default(state=defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case constants.CHANGELOGLIST:
      newState.PlatformLog = action.PlatformLog;
      newState.total = action.total;
      return newState;
    case constants.CHANGECLUSERNAME:
      newState.cluserName = action.cluserName;
      return newState;
    case constants.CHANGEURL:
      newState.url = action.url;
      return newState;
    default:
      return state;
  }
}