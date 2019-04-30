
import { createHashHistory } from 'history';

import configureStore from './configureStore';

// Create hashHistory
export const history = createHashHistory();

// Create redux store with history
const initialState = {};

// Configure Store
export const store = configureStore(initialState, history);

