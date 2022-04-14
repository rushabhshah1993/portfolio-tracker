/* Package imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Component imports */
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Hero from './../../components/Hero/Hero';
import TopStocks from '../../components/TopStocks/TopStocks';

/* Style import */
import styles from './Home.scss';

/* File imports */
import { fetchStockInfo } from '../../store/actions/stocksActions';
import SearchStocks from '../../components/SearchStocks/SearchStocks';

export class Home extends Component {
    componentDidMount() {
        /* Fetch data of default stocks */
        if(this.props.defaultStockSymbols && this.props.defaultStocks.length === 0) {
            for(let symbol of this.props.defaultStockSymbols) {
                this.props.fetchStockInfo(symbol);
            }
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div className={styles.content}>
                    <Hero />
                    <div className={styles.mainContent}>
                        <SearchStocks />
                        <TopStocks />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        defaultStockSymbols: state.stocks.defaultStockSymbols,
        defaultStocks: state.stocks.defaultStocks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStockInfo: symbol => dispatch(fetchStockInfo(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);