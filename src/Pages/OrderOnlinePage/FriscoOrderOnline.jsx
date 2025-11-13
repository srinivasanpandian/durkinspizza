import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './OrderOnline.css';

const FriscoOrderOnline = () => {
    useEffect(() => {
        // Set the page title
        document.title = "Order Online - Durkin's Pizza";
    }, []);

    return (
        <div className="order-online-page-layout">
            <Header />
            <div className="order-online-page order-online-page-layout">
                {/* <div className="order-online-banner">
                    <div className="container">
                        <div className="order-online-banner-content">
                            <h1 className="order-online-title">Order Online</h1>
                            <h2 className="order-online-location">Frisco - Main & Legacy</h2>
                            <p className="order-online-desc">Order your favorite Durkin's Pizza online for pickup or delivery!</p>
                        </div>
                    </div>
                </div> */}

                <div className="order-online-content">
                    <div className="container-fluid p-0">
                        <div className="order-online-iframe-container">
                            <iframe
                                src="https://direct.chownow.com/order/16885/locations"
                                title="Order Online - Frisco Location"
                                className="order-online-iframe"
                                frameBorder="0"
                                allowFullScreen
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default FriscoOrderOnline; 