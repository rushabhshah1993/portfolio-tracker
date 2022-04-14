/* Package imports */
import React from 'react';

/* Style imports */
import styles from './NavigationBar.scss';

/* Images imports */
import Logo from './../../assets/logo.png';

const NavigationBar = () => {
    return (
        <div className={styles.navigationBar}>
            <img src={Logo} className={styles.logo} />
            <p className={styles.title}>CosmoStocks</p>
        </div>
    )
}

export default NavigationBar;