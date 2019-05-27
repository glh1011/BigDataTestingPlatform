import { actionCreators, constants } from ".";

const defaultState = {
  resourcePoolListCurrent: 1,
  clusterListCurrent: 1,
  resourcePoolListTotal: 0,
  clusterListTotal: 0,
  resourcePoolList: [],
  clusterList: [],
  resourceUseData: [],
  allocateInputValue: {},
  firstLevelUser: [],
  unboundSecondUser: [],
  boundSecondUser: [],
  clusterTableLoadingVisible: false 
}

export default (state = defaultState, action) => {
  if(action.type === constants.RESET_STATE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourcePoolList = [];
    newState.clusterList = [];
    newState.resourceUseData = [];
    newState.allocateInputValue = {};
    newState.firstLevelUser = [];
    newState.unboundSecondUser = [];
    newState.boundSecondUser = [];
    return newState;
  }
  if(action.type ===  constants.CHANGE_FIRST_LEVEL_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourcePoolList = action.resourcePoolList;
    newState.resourcePoolListTotal = action.resourcePoolListTotal;
    return newState;
  }
  if(action.type === constants.CHANGE_ADMAIN_RESOURCE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourceUseData = action.resourceUseData;
    return newState;
  }
  if(action.type ===  constants.CHANGE_CLUSTER_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.clusterList = action.clusterList;
    newState.clusterListTotal = action.clusterListTotal;
    return newState;
  }
  if(action.type === constants.CHANGE_FIRST_LEVEL_RESOURCE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourceUseData = action.resourceUseData;
    return newState;
  }
  //分配一级资源部分,显示没有资源的一级用户
  if(action.type === constants.CHANGE_FIRST_LEVEL_USER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.firstLevelUser = action.data;
    return newState;
  } 
  //分配一级资源部分,输入框中改变state改变
  if(action.type === constants.CHANGE_ALLOCATE_INPUTVALUE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.allocateInputValue.username = action.userName;
    newState.allocateInputValue.cpu = action.cpu;
    newState.allocateInputValue.memory = action.memory;
    newState.allocateInputValue.disk = action.disk;
    return newState;
  }
  //绑定集群和二级用户，查看无关联二级用户
  if(action.type ===   constants.CHANGE_UNBOUND_SECOND_LEVEL_USER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.unboundSecondUser = action.unboundSecondUser;
    return newState;
  } 
  if(action.type ===   constants.CHANGE_BOUND_SECOND_LEVEL_USER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.boundSecondUser = action.boundSecondUser;
    return newState;
  } 

  if(action.type === constants.UPDATE_CLUSTER_TABLE_LOADING_VISIBLE){
    const newState = JSON.parse(JSON.stringify(state));
    newState.clusterTableLoadingVisible = action.clusterTableLoadingVisible;
    console.log(newState.clusterTableLoadingVisible);
    return newState;
  }

  return state;
}