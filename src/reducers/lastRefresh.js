const lastRefreshReducer = (timeStamp = Date.now(), action) => {
    switch (action.type) {
        case 'UPDATE_LAST_REFRESH':
            return action.data;
        default:
            return timeStamp;
    }
};

export default lastRefreshReducer;
