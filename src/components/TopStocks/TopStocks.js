/* Package imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Component imports */
import StockCard from '../StockCard/StockCard';

/* Style imports */
import styles from './TopStocks.scss';

export class TopStocks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let stockDetails = null;
        if(this.props.stocks.defaultStocksFetchComplete) {
            stockDetails = this.props.stocks.defaultStocks.map(stock => {
                let symbol = stock['Global Quote']['01. symbol'];
                return <StockCard stock={stock} key={symbol} />
            });
        }
        return (
            <div className={styles.container}>
                <p className={styles.sectionTitle}>Top stocks this week</p>
                <div className={styles.content}>
                    { stockDetails }
                    { 
                        this.props.stocks.defaultStocksFetch &&
                        <p>Loading...</p>
                    }
                    {
                        this.props.stocks.defaultStocksFetchFail &&
                        <p>Unfortunately, we are facing some technical issues at the moment. Kindly check again after some time.</p>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stocks: state.stocks
    }
}

export default connect(mapStateToProps)(TopStocks);