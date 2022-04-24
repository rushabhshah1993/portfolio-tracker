/* Package imports */
import {
    createStore, combineReducers,
    applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';

/* Reducer imports */
import stocksReducer from './reducers/stocksReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        stocks: stocksReducer
    }),
    {},
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
