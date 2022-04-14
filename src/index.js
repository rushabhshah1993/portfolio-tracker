/* Package imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Store import */
import store from './store';

/* Components imports */
import Home from './pages/Home/Home';
import Stock from './components/Stock/Stock';

/* Style imports */
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stock/:id" element={<Stock />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);