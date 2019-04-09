import * as constants from './constants';
// import { fromJS } from 'immutable';

const defaultState = {
  selectedRowKeys: [],
  authorities: [{
    id: 100306660940,
    name: '查看下级人员列表',
    description: '所有用户都具有的权限所有用户都具有的权限',
    type: '所有用户拥有',
    time: 2000,
  },{
    id: 100306660941,
    name: '查看下级人员列表',
    description: '所有用户都具有的权限所有用户都具有的权限',
    type: '所有用户拥有',
    time: 2001,
  },{
    id: 100306660942,
    name: '查看下级人员列表',
    description: '所有用户都具有的权限所有用户都具有的权限',
    type: '所有用户拥有',
    time: 2002,
  }]
};

export default(state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_SELECTED:
      const newState = JSON.parse(JSON.stringify(state));
      newState.selectedRowKeys = action.ids;
      console.log(newState.selectedRowKeys);
      return newState;
    default:
      return state;
  }
}