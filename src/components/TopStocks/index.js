/* Package imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Style imports */
import styles from './TopStocks.scss';

export class TopStocks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.container}>
                <p className={styles.sectionTitle}>Top stocks this week</p>
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