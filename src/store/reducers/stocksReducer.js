const initialState = {
    watchedStocks: [],
    defaultStocks: ['DIS', 'GS', 'MDC', 'MSFT', 'AMZN']
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state;
    }
}

export default reducer;
