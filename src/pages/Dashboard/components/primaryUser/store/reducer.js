import * as constants from './constants';

const defaultState = {
   current: 1,
   total: 0,
   subUsers: []
  // current: 1,
  // subUsers: [{
  //   name: "用户一",
  //   id: 1,
  //   upperID: "001",
  //   nickName: "fdghg",
  //   email: "2101317923@qq.com"
  // },{
  //   name: "用户二",
  //   id: 2,
  //   upperID: "001",
  //   nickName: "dsfvgh",
  //   email: "2101317923@qq.com"
  // }]
};

export default(state=defaultState, action) => {
  switch(action.type) {
    case constants.CHANGESUBUSERLIST:
      const newState = JSON.parse(JSON.stringify(state));
      //newState.current = action.current;
      newState.subUsers = action.subUsers;
      newState.total = action.total;
      console.log(newState);
      return newState;
    default:
      return state;
  }
}