const defaultState = {
  tableData: []
};

export default(state=defaultState, action) => {
  if(action.type == 'dispaly_self_authorities'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.tableData = action.tableData;
    return newState;
  }if(action.type == 'clear_permission_table'){
    const newState = JSON.parse(JSON.stringify(state));
    newState.tableData = [];
    return newState;
  }
  return state;
}