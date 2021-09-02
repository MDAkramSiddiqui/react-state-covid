import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app';
import allReducers from './reducers';

const reduxStore = () => {
    const data = localStorage.getItem("APP_STATE");
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
    localStorage.setItem('APP_STATE', JSON.stringify(store.getState()))
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
