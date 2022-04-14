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
    defaultStocksFetchFail: false,
    searchRequestStart: false,
    searchRequestFail: false,
    searchRequestComplete: false,
    stockDetailsFetchStart: false,
    stockDetailsFetchComplete: false,
    stockDetailsFetchFail: false,
    stockDetails: {}
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
        case actions.SEARCH_REQUEST:
            clonedState.searchRequestStart = true;
            return clonedState;
        case actions.SEARCH_REQUEST_FAIL:
            clonedState.searchRequestStart = false;
            clonedState.searchRequestComplete = true;
            clonedState.searchRequestFail = true;
            return clonedState;
        case actions.SEARCH_REQUEST_SUCCESS:
            clonedState.watchedStocks = cloneDeep(action.payload);
            clonedState.searchRequestStart = false;
            clonedState.searchRequestComplete = true;
            return clonedState;
        case actions.STOCK_DETAILS_REQUEST:
            clonedState.stockDetailsFetchStart = true;
            return clonedState;
        case actions.STOCK_DETAILS_REQUEST_SUCCESS: 
            clonedState.stockDetailsFetchStart = false;
            clonedState.stockDetailsFetchComplete = true;
            clonedState.stockDetails = cloneDeep(action.payload);
            return clonedState;
        case actions.STOCK_DETAILS_REQUEST_FAILED:
            clonedState.stockDetailsFetchStart = false;
            clonedState.stockDetailsFetchComplete = true;
            clonedState.stockDetailsFetchFail = true;
            return clonedState;
        default: return state;
    }
}

export default reducer;
