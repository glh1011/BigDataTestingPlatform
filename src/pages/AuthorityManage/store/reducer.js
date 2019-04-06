// import * as constants from './constants';

const defaultState = {
  selectedRowKeys: [],
  authorities: [
    {
      id: 100306660940,
      // name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      name: '查看下级人员列表',
      description: '所有用户都具有的权限所有用户都具有的权限',
      type: '所有用户拥有',
      time: 2000,
    },{
      id: 100306660941,
      // name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      name: '查看下级人员列表',
      description: '所有用户都具有的权限所有用户都具有的权限',
      type: '所有用户拥有',
      time: 2000,
    }
  ]
};

export default (state = defaultState, action) => {
  // if(action.type == constants.CHANGEINPUTVALUE){
    
  //   return newState;
  // }
  return state;
}