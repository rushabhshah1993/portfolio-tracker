/* Package imports */
import React from 'react';

/* Style imports */
import styles from './StockCard.scss';

const StockCard = props => {
    let stockInfo = props.stock['Global Quote'];
    return (
        <div className={styles.stockCard}>
            <p className={styles.title}>{stockInfo['01. symbol']}</p>
            <p className={styles.price}>{stockInfo['05. price']}</p>
        </div>
    )
}

export default StockCard;