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
}

export default (state = defaultState, action) => {
  if(action.type ===  constants.CHANGE_FIRST_LEVEL_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourcePoolList = action.resourcePoolList;
    newState.resourcePoolListTotal = action.resourcePoolListTotal;
    console.log(newState);
    return newState;
  }
  if(action.type === constants.CHANGE_ADMAIN_RESOURCE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourceUseData = action.resourceUseData;
    console.log(newState);
    return newState;
  }
  if(action.type ===  constants.CHANGE_CLUSTER_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.clusterList = action.clusterList;
    newState.clusterListTotal = action.clusterListTotal;
    console.log(newState);
    return newState;
  }
  if(action.type === constants.CHANGE_FIRST_LEVEL_RESOURCE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.resourceUseData = action.resourceUseData;
    console.log(newState);
    return newState;
  }
  //分配一级资源部分,显示没有资源的一级用户
  if(action.type === constants.CHANGE_FIRST_LEVEL_USER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.firstLevelUser = action.data;
    console.log(newState.firstLevelUser);
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
    console.log(newState.unboundSecondUser);
    return newState;
  } 
  if(action.type ===   constants.CHANGE_BOUND_SECOND_LEVEL_USER){
    const newState = JSON.parse(JSON.stringify(state));
    newState.boundSecondUser = action.boundSecondUser;
    console.log(newState.boundSecondUser);
    return newState;
  } 

  return state;
}