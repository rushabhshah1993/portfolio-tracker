/* Package imports */
import axios from 'axios';

/* Constants imports */
import { API_KEY } from './../../helper';

/* File imports */
import * as actions from './../action-types';

export const fetchStockInfo = symbol => {
    return dispatch => {
        dispatch(fetchDefaultStocksLoading());
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
        .then(response => {
            if(!response.data['Global Quote']) {
                dispatch(fetchDefaultStocksFailure());
            } else {
                dispatch(setStocksData(response.data));
            }
        })
        .catch(() => {
            dispatch(fetchDefaultStocksFailure());
        })
    }
}

export const searchForStocks = text => {
    return dispatch => {
        dispatch(startSearchRequest());
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${API_KEY}`)
        .then(response => {
            if(!response.data.bestMatches) {
                dispatch(searchRequestFailed());
            } else {
                dispatch(addSearchResults(response.data.bestMatches));
            }
        })
        .catch(() => {
            dispatch(searchRequestFailed());
        })
    }
}

export const getStockDetails = symbol => {
    return dispatch => {
        dispatch(requestStockDetailsStart());
        let requests = [
            axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`),
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`),
        ];

        Promise.allSettled(requests)
        .then(responses => {
            if(responses[0].value.data["Note"]) {
                dispatch(requestStockDetailsFail());
            } else {
                let obj = {
                    info: responses[0].value.data,
                    daily: responses[1].value.data
                };
                dispatch(requestStockDetailsSuccess(obj));
            }
        })
        .catch(() => {
            dispatch(requestStockDetailsFail());
        })
    }
}

/* Default stocks */
export const setStocksData = data => {
    return {
        type: actions.SET_STOCK_DATA,
        payload: data
    }
}

export const fetchDefaultStocksLoading = () => {
    return {
        type: actions.FETCHING_DEFAULT_STOCKS_DETAILS
    }
}

export const fetchDefaultStocksFailure = () => {
    return {
        type: actions.FETCHING_DEFAULT_STOCKS_DETAILS_FAILURE
    }
}


/* Search results */
export const addSearchResults = data => {
    return {
        type: actions.SEARCH_REQUEST_SUCCESS,
        payload: data
    }
}

export const startSearchRequest = () => {
    return {
        type: actions.SEARCH_REQUEST
    }
}

export const searchRequestFailed = () => {
    return {
        type: actions.SEARCH_REQUEST_FAIL
    }
}


/* Stock details */
export const requestStockDetailsStart = () => {
    return {
        type: actions.STOCK_DETAILS_REQUEST
    }
}

export const requestStockDetailsFail = () => {
    return {
        type: actions.STOCK_DETAILS_REQUEST_FAILED
    }
}

export const requestStockDetailsSuccess = data => {
    return {
        type: actions.STOCK_DETAILS_REQUEST_SUCCESS,
        payload: data
    }
}
