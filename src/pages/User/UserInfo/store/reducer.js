//import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = {
   value: {}
};
//输入框中改变state改变
export default (state = defaultState, action) => {
  if(action.type == constants.CHANGEINPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.value.name = action.name;
    newState.value.email = action.email;
    return newState;
  }
  //获取到接口数据并设置state
  if(action.type == constants.SETSELFINFO) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.value = action.data;
    return newState;
  }
  return state;
}