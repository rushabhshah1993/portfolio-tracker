/* Package imports */
import axios from 'axios';

/* Constants imports */
import { API_KEY } from './../../helper';

/* File imports */
import * as actions from './../action-types';

export const fetchStockDetails = symbol => {
    console.log("Here");
    return dispatch => {
        console.log("symbol:   ", symbol);
        dispatch(fetchDefaultStocksLoading());
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
        .then(response => {
            if(!response.data['Global Quote']) {
                console.log("Failure");
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
