/* Package imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/* Store import */
import store from './store';

/* Components imports */
import Home from './pages/Home/Home';

/* Style imports */
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);