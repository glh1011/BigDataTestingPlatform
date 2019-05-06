/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import { reducer as selfAuthoritiesReducer } from './pages/Permission/SelfAuthorities/store';
import { reducer as editAuthorityReducer } from './pages/Permission/EditAuthority/store';
import { reducer as addAuthorityReducer } from './pages/Permission/AddAuthority/store';

import { reducer as addSubUserReducer } from './pages/User/AddSubUser/store';
import { reducer as resetPasswordReducer } from './pages/User/ChangeSelfPwd/store';
import { reducer as resetSubUserPasswordReducer } from './pages/User/ChangeSubUserPwd/store';
import { reducer as subUsersReducer } from './pages/User/Dashboard/store';
import { reducer as editSubUserReducer } from './pages/User/EditSubUser/store';
import { reducer as PermissionFormReducer } from './pages/User/EditSubUserPermission/store';
import { reducer as subUserDetailReducer } from './pages/User/SubUserDetail/store';
import { reducer as userFormReducer } from './pages/User/UserInfo/store';

import { reducer as ResourceReducer } from './pages/Resource/store';

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
    addAuthority: addAuthorityReducer,
    PermissionForm: PermissionFormReducer,
    editAuthority: editAuthorityReducer,
    selfAuthorities: selfAuthoritiesReducer,

    addSubUser: addSubUserReducer,
    resetPassword: resetPasswordReducer,
    resetSubUserPassword: resetSubUserPasswordReducer,
    subUsers: subUsersReducer,
    editSubUser: editSubUserReducer,
    subUserDetail: subUserDetailReducer,
    userForm: userFormReducer,
    
    Resource: ResourceReducer,
    ...injectedReducers,
  });
}
