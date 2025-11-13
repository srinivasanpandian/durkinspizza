import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Location.css';
import mckinneyImage from '../../assets/images/location/twoloc.webp';

const McKinney = () => {
    return (
        <>
            <div className="location-page">
                <Header />
            </div>

            <div className="location-content">
                <div className="container">
                    <div className="row justify-content-center align-items-center mb-4">
                        <div className="col-12 col-lg-10">
                            <div className="location-card d-lg-flex">
                                {/* IMAGE COLUMN */}
                                <div className="location-img-col">
                                    <img 
                                        src={mckinneyImage} 
                                        alt="McKinney Location" 
                                    />
                                </div>

                                {/* INFO COLUMN */}
                                <div className="location-info-col">
                                    <h1 className="location-title mb-3">Durkin's Pizza - McKinney</h1>
                                    <div className="location-info">
                                        <div className="info-section mb-2">
                                            <h3>Address</h3>
                                            <p>
                                                8930 Hwy 121 Ste 594,<br/>
                                                McKinney, TX<br/>
                                                <span style={{ fontStyle:'italic', fontSize:'0.98rem' }}>
                                                    NE corner of Custer and 121 Next to QuikTrip
                                                </span>
                                            </p>
                                        </div>
                                        <div className="info-section mb-2">
                                            <h3>Phone</h3>
                                            <p>(972) 727-8400</p>
                                        </div>
                                        <div className="info-section mb-2">
                                            <h3>Email</h3>
                                            <p>contact@durkinspizza.com</p>
                                        </div>
                                       
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-lg-10">
                            <div className="location-card">
                                <h2 className="location-title">Find Us</h2>
                                <div className="map-title"><h3>West McKinney</h3></div>
                                <div className="map-address"><p>8930 Hwy 121 Ste 594, McKinney, TX</p></div>
                                <div className="map-iframe-wrapper">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393964243527!2d-96.7331236848137!3d33.14831598086409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19e2e2e2e2e2%3A0x1234567890abcdef!2s8930%20State%20Hwy%20121%20STE%20594%2C%20McKinney%2C%20TX%2075070!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                                        width="100%"
                                        height="320"
                                        style={{ border: 0, borderRadius: '20px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="McKinney Location Map"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default McKinney;
