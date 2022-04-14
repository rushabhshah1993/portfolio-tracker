/* Package imports */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams, useState } from 'react-router-dom';
import { isEmpty } from 'lodash';

/* Style imports */
import styles from './Stock.scss';

/* Component imports */
import NavigationBar from '../NavigationBar/NavigationBar';

/* Store imports */
import { getStockDetails } from '../../store/actions/stocksActions';

const Stock = props => {
    let params = useParams();
    let stockId = params.id;
    let element = <p>Loading...</p>;

    useEffect(() => {
        props.fetchDetails(stockId);
    }, []);

    if(!isEmpty(props.stockDetails)) {
        let info = props.stockDetails.info;
        let daily = props.stockDetails.daily;

        let lastRefreshed = new Date(daily['Meta Data']['3. Last Refreshed']).toLocaleString();

        let dailyData = daily['Time Series (60min)'];
        
        let dailyElement = Object.keys(dailyData).map(timeKey => {
            let date = new Date(timeKey).toLocaleString();
            let time = dailyData[timeKey];
            return (
                <div className={styles.timeZone} key={timeKey}>
                    <p className={styles.time}>{date}</p>
                    <div className={styles.data}>
                        <div className={styles.section}>
                            <p className={styles.title}>Open</p>
                            <p className={styles.value}>{time["1. open"]}</p>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.title}>High</p>
                            <p className={styles.value}>{time["2. high"]}</p>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.title}>Low</p>
                            <p className={styles.value}>{time["3. low"]}</p>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.title}>Close</p>
                            <p className={styles.value}>{time["4. close"]}</p>
                        </div>
                        <div className={styles.section}>
                            <p className={styles.title}>Volume</p>
                            <p className={styles.value}>{time["5. volume"]}</p>
                        </div>
                    </div>
                </div>
            )
        })

        element = (
            <div className={styles.content}>
                <Link to="/">Home Page</Link>
                <p className={styles.title}>{info["Name"]} ({info["Symbol"]})</p>
                <p className={styles.address}>{info["Address"]}</p>
                <p className={styles.desc}>{info["Description"]}</p>

                <div className={styles.infoContainer}>
                    <p className={styles.infoRow}><span className={styles.key}>Exchange:</span> {info["Exchange"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Country:</span> {info["Country"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Currency:</span> {info["Currency"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Sector:</span> {info["Sector"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>PE Ratio:</span> {info["PERatio"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>PEG Ratio:</span> {info["PEGRatio"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Book Value:</span> {info["BookValue"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Dividend/Share:</span> {info["DividendPerShare"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Revenue/Share:</span> {info["RevenuePerShareTTM"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>Profit Margin:</span> {info["ProfitMargin"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>52 Week High:</span> {info["52WeekHigh"]}</p>
                    <p className={styles.infoRow}><span className={styles.key}>52 Week Low:</span> {info["52WeekLow"]}</p>
                </div>

                <div className={styles.dailyContainer}>
                    <p className={styles.infoRow}><span className={styles.key}>Last Refreshed:</span> {lastRefreshed}</p>

                    <div className={styles.allData}>
                        { dailyElement }
                    </div>
                </div>
            </div>
        )
    } else {
        element = (
            <div>
                <p>Unfortunately, we are facing some technical difficulties. Kindly try again after some time.</p>
            </div>
        )
    }

    return (
        <div>
            <NavigationBar />
            <div className={styles.content}>
                { element }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        stockDetails: state.stocks.stockDetails,
        stockDetailsFetchStart: state.stocks.stockDetailsFetchStart,
        stockDetailsFetchComplete: state.stocks.stockDetailsFetchComplete,
        stockDetailsFetchFail: state.stocks.stockDetailsFetchFail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetails: symbol => dispatch(getStockDetails(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);