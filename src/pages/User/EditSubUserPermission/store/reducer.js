//import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = {
   value: {}
};
//输入框中改变state改变
export default (state = defaultState, action) => {
  if(action.type == constants.CHANGEINPUTVALUE){
    console.log("1111")
    const newState = JSON.parse(JSON.stringify(state));
    console.log(newState)
    return newState;
  }
  //获取到接口数据并设置state
  if(action.type == constants.GETPERMISSIONS) {
    console.log(action);
    const newState = JSON.parse(JSON.stringify(state));
    newState.permissions = action.permissions;
    newState.checkedArr = action.checkedArr;
    newState.allCheckedArr = action.allCheckedArr;
    return newState;
  }
  if(action.type == constants.SELECTCHECKBOX) {
    console.log(action);
    const newState = JSON.parse(JSON.stringify(state));
    newState.checkedArr = action.selectedItems;
    return newState;
  }
  if(action.type == constants.CLEARCHECKBOX) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.permissions = [];
    newState.checkedArr = [];
    return newState;
  }
  if(action.type == constants.SELECTALL) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.permissions = [];
    newState.checkedArr = [];
    return newState;
  }
  return state;
}