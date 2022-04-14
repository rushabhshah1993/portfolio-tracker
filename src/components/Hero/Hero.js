/* Package imports */
import React from 'react';

/* Style imports */
import styles from './Hero.scss';

/* Images imports */
import Logo from './../../assets/logo.png';

const Hero = () => {
    return (
        <div className={styles.heroContainer}>
            <div className={styles.imgContainer}>
                <img src={Logo} />
            </div>
            <div className={styles.infoContainer}>
                <h1 className={styles.title}>CosmoStocks</h1>
                <h3 className={styles.subtitle}>Bringing the world of stocks to your universe!</h3>
                <p>
                    CosmoStocks brings the universe of stocks to your pocket.
                    Browse through IPOs or keep them in a single watchlist.
                </p>
            </div>
        </div>
    )
}

export default Hero;