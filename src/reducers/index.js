import { combineReducers } from 'redux';
import { reducer as userFormReducer } from '../pages/UserInfo/store';

const reducer = combineReducers({
  userForm: userFormReducer
});

export default reducer;
