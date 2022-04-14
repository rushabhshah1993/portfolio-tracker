/* Package imports */
import React from 'react';

/* Style imports */
import styles from './SearchCard.scss';

const SearchCard = props => {
    return (
        <div className={styles.searchCard}>
            <div className={styles.header}>
                <div className={styles.stockInfo}>
                    <p className={styles.symbol}>{props.stock['1. symbol']}</p>
                    <p className={styles.name}>{props.stock['2. name']}</p>
                </div>
                <div className={styles.locationInfo}>
                    <span className={styles.region}>{props.stock['4. region']}</span>
                    <span className={styles.timezone}>({props.stock['7. timezone']})</span>
                </div>
            </div>
            <div className={styles.otherInfoContainer}>
                <div className={styles.section}>
                    <p className={styles.title}>Type</p>
                    <p className={styles.value}>{props.stock['3. type']}</p>
                </div>
                <div className={styles.section}>
                    <p className={styles.title}>Currency</p>
                    <p className={styles.value}>{props.stock['8. currency']}</p>
                </div>
                <div className={styles.section}>
                    <p className={styles.title}>Market Open</p>
                    <p className={styles.value}>{props.stock['5. marketOpen']}</p>
                </div>
                <div className={styles.section}>
                    <p className={styles.title}>Market Close</p>
                    <p className={styles.value}>{props.stock['6. marketClose']}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchCard;