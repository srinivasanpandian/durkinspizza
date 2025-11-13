import React, { useEffect } from 'react';
import './HomeBanner.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import AOS from 'aos';
// Image imports (replacing require calls)
import BannerFullPizza1 from '../../assets/images/Banner/home-banner-pattern/full-pizza-pattern.png';
import BannerPizzaPattern from '../../assets/images/Banner/home-banner-pattern/pizza-pattern.png';
import BannerGreenChilli from '../../assets/images/Banner/home-banner-pattern/green-chilli-pattern.png';
import BannerTomato from '../../assets/images/Banner/home-banner-pattern/tomato-pattern.png';
import BannerLeaf from '../../assets/images/Banner/home-banner-pattern/leaf-pattern.png';
import BannerMushroom from '../../assets/images/Banner/home-banner-pattern/mushroom-pattern.png';
import PizzaLargeWebp from '../../assets/images/Banner/pizza-large.webp';

const HomeBanner = () => {
    // useEffect(() => {
    //     // Initialize AOS only on the very first page load of homepage
    //     if (window.location.pathname === '/' && !localStorage.getItem('homePageVisited')) {
    //         AOS.init({
    //             duration: 1000,
    //             easing: 'ease-in-out',
    //             once: true,
    //             mirror: false
    //         });
    //         // Mark that homepage has been visited permanently
    //         localStorage.setItem('homePageVisited', 'true');
    //     }
    // }, []);

    return (
        <section className="banner-section">
            <Header />

            {/* ! Floating Banner Pattern */}
            <div className="banner-image-container">
                <img src={BannerFullPizza1} alt="Pizza" className="banner-pattern banner-pattern-1 img-fluid" />
                <img src={BannerPizzaPattern} alt="Pizza" className="banner-pattern banner-pattern-2 img-fluid" />
                <img src={BannerGreenChilli} alt="Pizza" className="banner-pattern banner-pattern-3 img-fluid" />
                <img src={BannerTomato} alt="Pizza" className="banner-pattern banner-pattern-4 img-fluid" />
                <img src={BannerLeaf} alt="Pizza" className="banner-pattern banner-pattern-5 img-fluid" />
                <img src={BannerFullPizza1} alt="Pizza" className="banner-pattern banner-pattern-6 img-fluid" />
                <img src={BannerPizzaPattern} alt="Pizza" className="banner-pattern banner-pattern-7 img-fluid" />
                <img src={BannerMushroom} alt="Pizza" className="banner-pattern banner-pattern-8 img-fluid" />
            </div>

            <img
                rel="preload"
                src={PizzaLargeWebp}
                alt="Pizza"
                className="pizza-image img-fluid"
                type="image/webp"
                // data-aos="zoom-in"
                // data-aos-delay="500"
                // data-aos-duration="1500"
            />

            <div className="banner-container">
                <div className="banner-content">
                    <p className="banner-title"> Crafted Fresh. Served Loud. Loved Always.</p>
                    <p className="banner-description">Gather the crew. Crank the tunes. We're firing up real-deal pizzas with bold flavors and zero compromise.</p>
                </div>
                <div className="banner-button">
                    <Link to="/home#menu">View Our Menu</Link>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;