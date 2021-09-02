import { combineReducers } from 'redux';

import statesReducer from './states';
import lastRefreshReducer from './lastRefresh';

const allReducers = combineReducers({
    states: statesReducer,
    lastRefresh: lastRefreshReducer,
});

export default allReducers;
