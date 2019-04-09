/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as userFormReducer } from './pages/UserInfo/store';
import { reducer as selfAuthoritiesReducer } from './pages/SelfAuthorities/store';
import { reducer as allAuthoritiesReducer } from './pages/AuthorityManage/store';
import { reducer as editAuthorityReducer } from './pages/EditAuthority/store';
import { reducer as subUsersReducer } from './pages/Dashboard/components/primaryUser/store';
import { reducer as subUserDetailReducer } from './pages/SubUserDetail/store';
import { reducer as addAuthorityReducer } from './pages/AddAuthority/store';
import { reducer as resetPasswordReducer } from './pages/ChangeSelfPwd/store';
import { reducer as addSubUserReducer } from './pages/AddSubUser/store';
import { reducer as editSubUserReducer } from './pages/EditSubUser/store';

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, { location: action.payload });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    userForm: userFormReducer,
    selfAuthorities: selfAuthoritiesReducer,
    allAuthorities: allAuthoritiesReducer,
    subUsers: subUsersReducer,
    editAuthority: editAuthorityReducer,
    subUserDetail: subUserDetailReducer,
    addAuthority: addAuthorityReducer,
    resetPassword: resetPasswordReducer,
    addSubUser: addSubUserReducer,
    editSubUser: editSubUserReducer,
    ...injectedReducers,
  });
}
