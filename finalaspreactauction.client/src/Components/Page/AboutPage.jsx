//import React from 'react';
//import styles from './AboutPage.module.css';

//const AboutPage = () => {
//    return (
//        <div className={styles.container}>
//            <h1 className={styles.title}>About Auction App</h1>
//            <p className={styles.description}>
//                Welcome to our Auction Platform, where buyers and sellers come together to engage in exciting auctions.
//                Whether you're here to place bids or list your items, our platform offers a seamless and secure environment
//                for both parties. Our goal is to make online auctions fun, accessible, and user-friendly for everyone.
//            </p>

//            <h2 className={styles.subtitle}>How It Works</h2>
//            <p className={styles.description}>
//                1. Making an account to start bidding or listing items.<br />
//                2. Browse through available items or list your own for auction.<br />
//                3. Place bids in real-time and track current offers.<br />
//                4. Win auctions and make purchases directly from sellers.<br />
//            </p>

//            <h2 className={styles.subtitle}>Our Mission</h2>
//            <p className={styles.description}>
//                Our mission is to provide a trustworthy and secure auction platform, where users can easily connect and
//                trade in a transparent and fair manner. We aim to revolutionize the auction experience with innovative
//                features and user-friendly design.
//            </p>

//            <h2 className={styles.subtitle}>Contact Us</h2>
//            <p className={styles.description}>
//                For inquiries or support, feel free to reach out to us via email: <strong>support@auctionapp.com</strong>
//            </p>
//        </div>
//    );
//}

//export default AboutPage;


import React from 'react';
import { Car, Shield, Users, Mail, Clock, Award, Heart } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Welcome to <span className="text-blue-600">Car Auction</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Your premier destination for exclusive car auctions. We connect passionate
                    car enthusiasts with exceptional vehicles through a secure and seamless platform.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {[
                    {
                        icon: <Shield className="w-8 h-8 text-blue-500" />,
                        title: "Secure Bidding",
                        description: "Advanced security measures ensure safe transactions and protect your information."
                    },
                    {
                        icon: <Clock className="w-8 h-8 text-blue-500" />,
                        title: "Real-Time Updates",
                        description: "Stay informed with instant notifications about your bids and favorite items."
                    },
                    {
                        icon: <Award className="w-8 h-8 text-blue-500" />,
                        title: "Verified Sellers",
                        description: "All sellers undergo thorough verification to maintain quality standards."
                    }
                ].map((feature, index) => (
                    <div key={index} className="px-3 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4 mt-2">
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-900 my-auto">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 px-3">{feature.description}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-3">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
                <div className="space-y-6">
                    {[
                        {
                            icon: <Users className="w-6 h-6 text-blue-500" />,
                            title: "Create an Account",
                            description: "Sign up in minutes to start bidding or listing vehicles."
                        },
                        {
                            icon: <Car className="w-6 h-6 text-blue-500" />,
                            title: "Browse & Bid",
                            description: "Explore available vehicles and place competitive bids."
                        },
                        {
                            icon: <Heart className="w-6 h-6 text-blue-500" />,
                            title: "Win & Purchase",
                            description: "Successfully win auctions and complete secure transactions."
                        }
                    ].map((step, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="bg-blue-50 rounded-full p-3">{step.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-blue-600 rounded-xl shadow-sm p-8 text-center text-white p-3 mb-3">
                <Mail className="w-12 h-12 mx-auto mb-3" />
                <h2 className="text-3xl mb-3">Need Assistance?</h2>
                <p className="text-lg mb-6">
                    Our support team is here to help you with any questions or concerns.
                </p>
                <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors px-3">
                    <Mail className="w-5 h-5" />
                    support@caraction.com
                </div>
            </div>
        </div>
    );
};

export default AboutPage;