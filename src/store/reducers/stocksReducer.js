/* Package imports */
import cloneDeep from "lodash/cloneDeep";

/* File imports */
import * as actions from './../action-types';

const initialState = {
    watchedStocks: [],
    defaultStockSymbols: ['DIS', 'MSFT', 'AMZN'],
    defaultStocks: [],
    defaultStocksFetch: false,
    defaultStocksFetchComplete: false,
    defaultStocksFetchFail: false
};

const reducer = (state = initialState, action) => {
    let clonedState = cloneDeep(state);

    switch(action.type) {
        case actions.FETCHING_DEFAULT_STOCKS_DETAILS:
            clonedState.defaultStocksFetch = true;
            return clonedState;
        case actions.FETCHING_DEFAULT_STOCKS_DETAILS_FAILURE:
            clonedState.defaultStocksFetch = false;
            clonedState.defaultStocksFetchFail = true;
            return clonedState;
        case actions.FETCHING_DEFAULT_STOCKS_DETAILS:
            clonedState.defaultStocksFetch = true;
            return clonedState;
        case actions.SET_STOCK_DATA:
            clonedState.defaultStocks.push(action.payload);
            if(
                clonedState.defaultStocksFetch && 
                clonedState.defaultStocks.length === clonedState.defaultStockSymbols.length
            ) {
                clonedState.defaultStocksFetch = false;
                clonedState.defaultStocksFetchComplete = true;
            }
            return clonedState;
        default: return state;
    }
}

export default reducer;
