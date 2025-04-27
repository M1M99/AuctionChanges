import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>About Auction App</h1>
            <p className={styles.description}>
                Welcome to our Auction Platform, where buyers and sellers come together to engage in exciting auctions.
                Whether you're here to place bids or list your items, our platform offers a seamless and secure environment
                for both parties. Our goal is to make online auctions fun, accessible, and user-friendly for everyone.
            </p>

            <h2 className={styles.subtitle}>How It Works</h2>
            <p className={styles.description}>
                1. Making an account to start bidding or listing items.<br />
                2. Browse through available items or list your own for auction.<br />
                3. Place bids in real-time and track current offers.<br />
                4. Win auctions and make purchases directly from sellers.<br />
            </p>

            <h2 className={styles.subtitle}>Our Mission</h2>
            <p className={styles.description}>
                Our mission is to provide a trustworthy and secure auction platform, where users can easily connect and
                trade in a transparent and fair manner. We aim to revolutionize the auction experience with innovative
                features and user-friendly design.
            </p>

            <h2 className={styles.subtitle}>Contact Us</h2>
            <p className={styles.description}>
                For inquiries or support, feel free to reach out to us via email: <strong>support@auctionapp.com</strong>
            </p>
        </div>
    );
}

export default AboutPage;
