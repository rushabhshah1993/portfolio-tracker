/* Package imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Style imports */
import styles from './SearchStocks.scss';

/* Image imports */
import SearchIcon from './../../assets/search.svg';

/* Store imports */
import { searchForStocks } from '../../store/actions/stocksActions';
import SearchCard from '../SearchCard/SearchCard';

export class SearchStocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    textChangeHandler = event => {
        this.setState({
            searchText: event.target.value
        });
    }

    keyDownHandler = event => {
        if(event.keyCode === 13) this.searchHandler();
    }

    searchHandler = () => {
        this.props.search(this.state.searchText);
    }

    render() {
        let searchResults = (
            <div className={styles.defaultSearchSection}>
                <img src={SearchIcon} />
                <p>Enter a search term in the input box above to search for stock information.</p>
            </div>
        );

        if(this.props.searchRequestComplete && this.props.searchStocks.length === 0) {
            searchResults = <div className={styles.defaultSearchSection}>
                <h3>Oops!</h3>
                <p>We couldn't find any stocks with the term {this.searchText}</p>
            </div>
        } else if(this.props.searchRequestComplete && this.props.searchRequestFail) {
            searchResults = <div className={styles.defaultSearchSection}>
                <p>Unfortunately, we are facing some technical issues at this moment. Kindly try again after sometime.</p>
            </div>
        } else if(!this.props.searchRequestComplete && this.props.searchRequestStart) {
            searchResults = <div className={styles.defaultSearchSection}>
                <p>Searching...</p>
            </div>
        } else if(this.props.searchRequestComplete && this.props.searchStocks.length) {
            searchResults = this.props.searchStocks.map(stock => {
                return <SearchCard stock={stock} key={stock['1. symbol']} />
            })
        }

        return (
            <div className={styles.searchStocks}>
                <p className={styles.sectionTitle}>Watchlist</p>
                <p className={styles.subTitle}>
                    The world of finance is volatile. Every few seconds could see a major change in every stock's fate.
                    CosmoStocks, powered by Alpha Vantage, helps you search your favorite stocks and keep an eye out on
                    its minute-by-minute changes. Find your favorite stock by entering its symbol or a character in the 
                    input box below:
                </p>
                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        className={styles.searchBox}
                        onChange={this.textChangeHandler}
                        onKeyDown={this.keyDownHandler}
                        value={this.state.searchText}
                        placeholder={'Search stocks using its symbol name by entering characters here...'} />
                    <img src={SearchIcon} onClick={this.searchHandler} />
                </div>
                <div className={styles.resultsContainer}>
                    { searchResults }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchStocks: state.stocks.watchedStocks,
        searchRequestComplete: state.stocks.searchRequestComplete,
        searchRequestStart: state.stocks.searchRequestStart,
        searchRequestFail: state.stocks.searchRequestFail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: text => dispatch(searchForStocks(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStocks);