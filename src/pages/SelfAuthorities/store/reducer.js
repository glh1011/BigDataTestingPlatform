const defaultState = {
  tableData: []
    // name: '',
    // creator: '',
    // description: ''
};

export default(state=defaultState, action) => {
  switch(action.type) {
    case 'dispaly_self_authorities':
      const newState = JSON.parse(JSON.stringify(state));
      newState.tableData = action.tableData;
      console.log(newState.tableData);
      return newState;
    default:
      return state;
  }
}