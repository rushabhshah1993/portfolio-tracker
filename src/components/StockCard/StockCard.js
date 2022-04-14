/* Package imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/* Style imports */
import styles from './StockCard.scss';

const StockCard = props => {
    let stockInfo = props.stock['Global Quote'];
    let navigate = useNavigate();

    const cardClickHandler = () => {
        navigate(`/stock/${stockInfo['01. symbol']}`);
    }
    
    return (
        <div className={styles.stockCard} onClick={cardClickHandler}>
            <p className={styles.title}>{stockInfo['01. symbol']}</p>
            <p className={styles.price}>{stockInfo['05. price']}</p>
        </div>
    )
}

export default StockCard;