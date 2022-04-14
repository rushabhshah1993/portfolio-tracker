/* Package imports */
import axios from 'axios';

/* Constants imports */
import { API_KEY } from './../../helper';

/* File imports */
import * as actions from './../action-types';

export const fetchStockDetails = symbol => {
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
            dispatch(searchRequestFailed())
        })
    }
}

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
