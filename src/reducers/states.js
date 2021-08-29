const statesReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_STATES_DATA':
            return [...action.data];
        default:
            return [...state];
    }
};

export default statesReducer;
