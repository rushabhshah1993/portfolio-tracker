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
import { fetchStockDetails } from '../../store/actions/stocksActions';

export class Home extends Component {
    componentDidMount() {
        /* Fetch data of default stocks */
        if(this.props.defaultStockSymbols) {
            for(let symbol of this.props.defaultStockSymbols) {
                this.props.fetchStockDetails(symbol);
            }
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div className={styles.content}>
                    <Hero />
                    <TopStocks />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        defaultStockSymbols: state.stocks.defaultStockSymbols
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStockDetails: symbol => dispatch(fetchStockDetails(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);