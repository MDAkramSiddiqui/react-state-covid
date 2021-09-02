import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app';
import allReducers from './reducers';
import constants from './constants';

const reduxStore = () => {
    const data = localStorage.getItem(constants.global.APP_NAME);
    if (data) {
        return JSON.parse(data);
    }
    return {
        statesData: [],
        lastRefresh: Date.now()
    };
};


const store = createStore(allReducers, reduxStore());

store.subscribe(()=>{
    localStorage.setItem(constants.global.APP_NAME, JSON.stringify(store.getState()))
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
