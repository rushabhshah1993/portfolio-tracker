/* Package imports */
import React, { Component } from 'react';

/* Component imports */
import NavigationBar from '../../components/NavigationBar';
import Hero from './../../components/Hero';
import TopStocks from '../../components/TopStocks';

/* Style import */
import styles from './Home.scss';

export class Home extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Hero />
                <div className={styles.content}>
                    <TopStocks />
                </div>
            </div>
        )
    }
}

export default Home;