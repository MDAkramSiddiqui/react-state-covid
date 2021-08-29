import { combineReducers } from 'redux';

import statesReducer from './states';

const allReducers = combineReducers({
    states: statesReducer,
});

export default allReducers;
