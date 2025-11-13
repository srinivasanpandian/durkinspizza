import React, { useState } from 'react';
import './Home.css';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { getSlugByCategory } from '../../utils/menuRouting';
import emailjs from 'emailjs-com';


import pizzaBg from '../../assets/images/homePage/newsLetter/newLetter-bg.png';

import galleryImage1 from '../../assets/images/homePage/gallery/image-1.webp'
import galleryImage2 from '../../assets/images/homePage/gallery/image-7.webp'
import galleryImage3 from '../../assets/images/homePage/gallery/image-8.webp'
import galleryImage4 from '../../assets/images/homePage/gallery/image-9.webp'
import galleryImage5 from '../../assets/images/homePage/gallery/image-10.webp'

import AboutPizza from '../../assets/images/homePage/about/about-pizza.png';
import AboutSectionImage from '../../assets/images/homePage/about/ab.png'

import MenuMadeToOrder from '../../assets/images/homePage/pizzaMenu/madeToOrderPizzas_1.png';
import MenuSpecialty from '../../assets/images/homePage/pizzaMenu/specialtyPizzas_1.png';
import MenuAppetizers from '../../assets/images/homePage/pizzaMenu/bakedChickenWings_1.png';
import MenuSandwiches from '../../assets/images/homePage/pizzaMenu/sandwichesCalzones_1.png';
import MenuPastaBread from '../../assets/images/homePage/pizzaMenu/pastaBread_1.png';
import MenuFreshSalads from '../../assets/images/homePage/pizzaMenu/freshSalads_1.png';
import MenuSweetDesserts from '../../assets/images/homePage/pizzaMenu/sweetDesserts_1.png';
import MenuBeverages from '../../assets/images/homePage/pizzaMenu/beverages_1.png';

// Floating pizza images
import FloatImg1 from '../../assets/images/homePage/pizzaMenu/Floating-Images/f1.png';
import FloatImg2 from '../../assets/images/homePage/pizzaMenu/Floating-Images/f2.png';
import FloatImg3 from '../../assets/images/homePage/pizzaMenu/Floating-Images/f3.png';
import FloatImg4 from '../../assets/images/homePage/pizzaMenu/Floating-Images/f4.png';

// Steps images
import Step1 from '../../assets/images/homePage/steps/step-1.png';
import Step2 from '../../assets/images/homePage/steps/step-2.png';
import Step3 from '../../assets/images/homePage/steps/step-3.png';
import StepsImage from '../../assets/images/homePage/steps/steps-image.png';


const homePageAboutContent = [
    {
        title: 'Make Your Pizza',
        description: 'Your pizza, your way. Choose from hand-tossed classics to gluten-free & cauliflower crusts.',
        image: AboutPizza
    },
    {
        title: 'Specialty Pizzas',
        description: 'From BBQ Chicken to Kitchen Sink, our signature creations fit every craving.',
        image: AboutPizza
    },
    {
        title: 'Indian-Inspired Pizzas',
        description: 'East meets West. Paneer Tikka and Chicken Tikka on a cheesy crust.',
        image: AboutPizza
    },
    {
        title: 'Fresh Toppings Galore',
        description: 'Load it up—over 20 fresh and premium toppings to customize your pie.',
        image: AboutPizza
    }
]

const pizzaMenuData = [
    {
        title: 'Make Your Pizza',
        image: MenuMadeToOrder
    },
    {
        title: 'Specialty Pizzas',
        image: MenuSpecialty
    },
    {
        title: 'Appetizers',
        image: MenuAppetizers
    },
    {
        title: 'Sandwiches & Calzones',
        image: MenuSandwiches
    },
    {
        title: 'Pasta & Bread',
        image: MenuPastaBread
    },
    {
        title: 'Fresh Salads',
        image: MenuFreshSalads
    },
    {
        title: 'Sweet Desserts',
        image: MenuSweetDesserts
    },
    {
        title: 'Beverages',
        image: MenuBeverages
    }
]

const reviewsData = {
    "West McKinney": [
        {
            stars: 4,
            text: "The pizza was very good with a perfectly done thin crust—no flop and light on the grease. The atmosphere was quiet and cozy. Service was okay, but the guy behind the register seemed more interested in his phone. The wings were good, and the buffalo sauce was excellent. I wish they offered blue cheese, which, in my opinion, always pairs well with buffalo wings.",
            user: "Adam Crain",
            location: "West McKinney",
            breakdown: [75, 20, 5, 0, 0],
            total: 2500
        },
        {
            stars: 3,
            text: "Let me start by saying the pizza was delicious. Best pizza we've had in a long time. Super flavorful & tasty. The cleanliness of the restaurant is terrible, no one has dusted or cleaned surfaces in years. The dusty vents and light fixtures which are directly above the customer tables are gross. The torn and ripped chairs need replacing also.",
            user: "Justin Parker",
            location: "West McKinney",
            breakdown: [60, 25, 15, 0, 0],
            total: 1800
        },
        {
            stars: 5,
            text: "The pizza was great! I loved it! They had a Monday special on the large sized pizza which was nice. My boyfriend and I finished it! Now, the place was pretty cold so not sure if that's the norm so if it is, take a sweater. It was probably in the 60s in there but I don't mind it so it didn't affect my experience. Will definitely be back, it was delicious!! Music was great as well!",
            user: "Cindy Anzora",
            location: "West McKinney",
            breakdown: [85, 12, 3, 0, 0],
            total: 1200
        }
    ],
    "Frisco": [
        {
            stars: 4,
            text: "I placed an order online and appreciated the 20% discount for first-time customers—great deal! I ordered the cheesy bread, which was flavorful, but I'd recommend asking for an extra cup of sauce. My main issue was the sauce placement; instead of being on the side, it was poured right on top. It made the bread soggy and messy, which was disappointing. The inside of the restaurant looks fantastic, but I was just doing a to-go order this time. Overall, decent experience, but a little attention to presentation would go a long way!",
            user: "Jeff W",
            location: "Frisco",
            breakdown: [75, 20, 5, 0, 0],
            total: 1800
        },
        {
            stars: 5,
            text: "We tried Durkin's for the first time this evening and the most important part (the pizza) was really good! My wife is recently gluten free so we keep trying new gluten free pizza places and this one might be our most favorite yet. Three things I didn't like about Durkin's: 1. The ranch is not homemade. Fresh ranch is such a huge difference maker with pizza. 2. No one answers the phone. I tried calling to ask about the difference between the ancient grains crust and the rice flour crust but I found the answer on google instead. 3. For some reason half of my pepperoni & jalapeños came back as half without pepperoni but it was fine, the cheese pizza was still really good. Anyhow, 5 Stars!",
            user: "John Jackson",
            location: "Frisco",
            breakdown: [85, 12, 3, 0, 0],
            total: 1500
        },
        {
            stars: 5,
            text: "Some of the best pizza I've ever had… Definitely the best pizza in Frisco!! The service is always spotty and the atmosphere inside is very odd. Nevertheless I'm a very loyal patron and I hope it doesn't close. I can confidently recommend any of the salads, the wings are good and regardless off the toppings you choice the pizza will be delicious",
            user: "Anthony Francis",
            location: "Frisco",
            breakdown: [90, 8, 2, 0, 0],
            total: 900
        }
    ]
};

const starLabels = [
    '★★★★★',
    '★★★★☆',
    '★★★☆☆',
    '★★☆☆☆',
    '★☆☆☆☆'
];

const galleryImages = [
    galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5
];

const Home = () => {
    const [currentWestMcKinney, setCurrentWestMcKinney] = React.useState(0);
    const [currentFrisco, setCurrentFrisco] = React.useState(0);
    const westMcKinneyReviews = reviewsData["West McKinney"];
    const friscoReviews = reviewsData["Frisco"];
    const currentWestMcKinneyReview = westMcKinneyReviews[currentWestMcKinney];
    const currentFriscoReview = friscoReviews[currentFrisco];

    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterError, setNewsletterError] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState('');

    const validateNewsletterEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNewsletterChange = (e) => {
        setNewsletterEmail(e.target.value);
        setNewsletterError('');
        setNewsletterSuccess('');
    };

    // ✅ EMAIL SEND HANDLER (emailjs-com)
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();

        if (!newsletterEmail.trim()) {
            setNewsletterError('Email is required');
            setNewsletterSuccess('');
            return;
        } else if (!validateNewsletterEmail(newsletterEmail)) {
            setNewsletterError('Please enter a valid email address');
            setNewsletterSuccess('');
            return;
        }

        const templateParams = {
            user_email: newsletterEmail,
        };

        emailjs.send(
            "service_r14hm7r",     // ✅ Service ID
            "template_axcg2gx",    // ✅ Template ID
            templateParams,
            "SkBoQWMCjE4qc8kHP"    // ✅ Public Key
        )
        .then(() => {
            setNewsletterSuccess("You're in! Check your inbox for exclusive Durkin's deals 🍕🔥");
            setNewsletterError('');
            setNewsletterEmail('');
        })
        .catch(() => {
            setNewsletterError("Something went wrong. Try again.");
            setNewsletterSuccess('');
        });
    };

    return (
        <>
            <HomeBanner />

            {/* ! About Us Section */}
            <section className="aboutus-container">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                            <div className="about-content">
                                <p className='about-title'>Durkin’s Signature Services</p>
                                <p className='about-description'>We’re more than just pizza—we bring the full flavor experience to your table!</p>
                                <div className="about-row row">
                                    {homePageAboutContent.map((item, index) => (
                                        <div className="col-12 col-sm-6" key={index}>
                                            <div className="about-item">
                                                <img src={item.image} alt={item.title} className="about-item-image img-fluid" />
                                                <p className="about-item-title">{item.title}</p>
                                                <p className="about-item-description">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className='about-image'>
                                <img src={AboutSectionImage} alt="Hot Spicy Pizza" className="about-main-img" />
                                <div className="location-cards-overlay">
                                    <div className="location-card-overlay">
                                        <h3 className="location-card-title">West McKinney</h3>
                                        <p className="location-card-phone">+1 (972) 727-8400</p>
                                        <a href="tel:+19727278400" className="location-call-btn">
                                            Call Now
                                        </a>
                                    </div>
                                    <div className="location-card-overlay">
                                        <h3 className="location-card-title">Frisco</h3>
                                        <p className="location-card-phone">+1 (972) 294-5979</p>
                                        <a href="tel:+19722945979" className="location-call-btn">
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ! Pizza Menu Section */}
            <section className='pizza-container'>
                {/* ! Floating Images */}
                <img src={FloatImg1} alt="float1" className="floating-img float1" />
                <img src={FloatImg2} alt="float2" className="floating-img float2" />
                <img src={FloatImg4} alt="float3" className="floating-img float3" />
                <img src={FloatImg3} alt="float4" className="floating-img float4" />
                {/* Heading */}
                <div className="section-heading">
                    <p className="pizza-title">Crispy Crust, Melty Cheese</p>
                    <p className="pizza-subtitle">Pizza Perfection In Every Bite Made Hot, Made Fresh, Made For You!</p>
                </div>
                {/* cards grid */}
                <div className="container">
                    <div className="cards-grid">
                        <div className="row">
                            {pizzaMenuData.map((item, index) => (
                                <div className="col-12 col-sm-6 col-lg-3 mb-4" key={index}>
                                    <div className="pizza-card">
                                        <img src={item.image} alt={item.title} className="pizza-card-img" />
                                        <p className="pizza-card-title">{item.title}</p>
                                        <Link to={`/menu/${getSlugByCategory(item.title)}`} className="pizza-card-link">
                                            <span className='pizza-card-link-text'>Explore More</span>
                                            <span className='pizza-card-link-icon'><i className="fa-solid fa-circle-chevron-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ! Steps Section */}
            <section className='steps-container d-none d-lg-block'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="steps-content">
                            {/* section heading */}
                            <div className="section-heading">
                                <p className='section-heading-title'>SIMPLE. FAST. DELICIOUS.</p>
                                <p className='section-heading-subtitle'>Get Your Pizza in 3 Easy Steps</p>
                            </div>

                            {/* steps content */}
                            <div className="row">
                                <div className="col-3">
                                    <div className="step-item">
                                        <img src={Step1} alt="step-1" />
                                        <p className='step-item-title'>Pick Your Cravings</p>
                                        <p className='step-item-description'>Dive into our loaded menu — handcrafted pizzas, crispy wings, gooey pastas, and cheesy breads waiting for you.</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="step-item">
                                        <img src={Step2} alt="step-2" />
                                        <p className='step-item-title'>Build It Your Way</p>
                                        <p className='step-item-description'>Customize your order with premium toppings, crust options, and bold flavors. You're the boss of your pie!</p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="step-item">
                                        <img src={Step3} alt="step-2" />
                                        <p className='step-item-title'>Sit Back & Enjoy</p>
                                        <p className='step-item-description'>Order in seconds. We'll handle the heat and bring the flavor — straight to your door or ready for pickup.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* steps image */}
                        <img src={StepsImage} alt="steps-img" className='steps-img' />
                    </div>
                </div>
            </section>

            {/* ! Steps mobile Section */}
            <section className='steps-mobile-container d-block d-lg-none'>
                <div className="container">
                    <div className="row">
                        <div className="steps-mobile-content">
                            {/* section heading */}
                            <div className="section-mobile-heading">
                                <p className='section-mobile-heading-title'>SIMPLE. FAST. DELICIOUS.</p>
                                <p className='section-mobile-heading-subtitle'>Get Your Pizza in 3 Easy Steps</p>
                            </div>

                            {/* steps content */}
                            <div className="row">
                                <div className="step-mobile-item">
                                    <img src={Step1} alt="step-1" />
                                    <p className='step-mobile-item-title'>Pick Your Cravings</p>
                                    <p className='step-mobile-item-description'>Dive into our loaded menu — handcrafted pizzas, crispy wings, gooey pastas, and cheesy breads waiting for you.</p>
                                </div>
                                <div className="step-mobile-item">
                                    <img src={Step2} alt="step-2" />
                                    <p className='step-mobile-item-title'>Build It Your Way</p>
                                    <p className='step-mobile-item-description'>Customize your order with premium toppings, crust options, and bold flavors. You're the boss of your pie!</p>
                                </div>
                                <div className="step-mobile-item">
                                    <img src={Step3} alt="step-2" />
                                    <p className='step-mobile-item-title'>Sit Back & Enjoy</p>
                                    <p className='step-mobile-item-description'>Order in seconds. We'll handle the heat and bring the flavor — straight to your door or ready for pickup.</p>
                                </div>
                                <img src={StepsImage} alt="steps-mobile-img" className='steps-mobile-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ! Review Section */}
            <section className="review-section-container">
                <div className="container">
                    <div className="section-heading text-center mb-4">
                        <h2 className="review-section-title">What Our Customers Say</h2>
                        <p className="review-section-subtitle">Real reviews from our valued customers across all locations</p>
                    </div>
                    <div className="reviews-grid">

                        <script src="https://elfsightcdn.com/platform.js" async></script>
                        <div className="elfsight-app-408cd973-974d-4dee-ba5d-d44baff9307b" data-elfsight-app-lazy></div>
                        {/* <div className="review-location-card">
                            <div className="location-header">
                                <h3 className="location-title">
                                    <a
                                        href="https://www.google.com/search?sca_esv=2335eb9854f65b90&sxsrf=AE3TifOMMdie0Yzwy5oIuDslhnjyA1ZTGQ:1754301389396&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s4RnXCs7nyuBqeU_16hnaxYbtXUOY5I_TYxwJcxZnOs13RrhYbjZophOZa91-j6EgShY7A93839YrXCmUpPk9lw3Okv0&q=Durkin%27s+Pizza+Reviews&sa=X&ved=2ahUKEwjYlpP58fCOAxUSxjgGHdm7FDAQ0bkNegQIMxAE&biw=1536&bih=695&dpr=1.25"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="location-title-link"
                                    >
                                        West McKinney
                                    </a>
                                </h3>
                                <div className="location-rating">
                                    <span className="rating-number">{currentWestMcKinneyReview.stars.toFixed(1)}</span>
                                    <span className="rating-label">/ 5</span>
                                </div>
                            </div>
                            <div className="review-content">
                                <div className="review-card">
                                    <div className="review-stars">{'★'.repeat(currentWestMcKinneyReview.stars) + '☆'.repeat(5 - currentWestMcKinneyReview.stars)}</div>
                                    <div className="review-text">"{currentWestMcKinneyReview.text}"</div>
                                    <div className="review-author">
                                        <div className="author-name">{currentWestMcKinneyReview.user}</div>
                                        <div className="author-status">Weekend Regular</div>
                                    </div>
                                </div>
                                <div className="review-pagination">
                                    {westMcKinneyReviews.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={"review-dot" + (currentWestMcKinney === idx ? " active" : "")}
                                            onClick={() => setCurrentWestMcKinney(idx)}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="review-location-card">
                            <div className="location-header">
                                <h3 className="location-title">
                                    <a
                                        href="https://www.google.com/search?sca_esv=2335eb9854f65b90&sxsrf=AE3TifMV-SCBRnNs5uMh_sHHHmR4CHBr9g:1754301104754&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E0rVv0PNfuupFmXt_XhK0D0qPcvYGKBALzrb27Gq692GgM69mD89LBJMIAhLB3BMk2o4tdu_1IW9XNlf1NQjrC2hdf2U&q=Durkin%27s+Pizza+Reviews&sa=X&ved=2ahUKEwj3gbbx8PCOAxV2UGcHHZZ1EF8Q0bkNegQINBAE&biw=1536&bih=695&dpr=1.25"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="location-title-link"
                                    >
                                        Frisco
                                    </a>
                                </h3>
                                <div className="location-rating">
                                    <span className="rating-number">{currentFriscoReview.stars.toFixed(1)}</span>
                                    <span className="rating-label">/ 5</span>
                                </div>
                            </div>
                            <div className="review-content">
                                <div className="review-card">
                                    <div className="review-stars">{'★'.repeat(currentFriscoReview.stars) + '☆'.repeat(5 - currentFriscoReview.stars)}</div>
                                    <div className="review-text">"{currentFriscoReview.text}"</div>
                                    <div className="review-author">
                                        <div className="author-name">{currentFriscoReview.user}</div>
                                        <div className="author-status">Weekend Regular</div>
                                    </div>
                                </div>
                                <div className="review-pagination">
                                    {friscoReviews.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={"review-dot" + (currentFrisco === idx ? " active" : "")}
                                            onClick={() => setCurrentFrisco(idx)}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* ! Gallery Section */}
            <section className="gallery-section">
                <div className="gallery-container">
                    <div className="gallery-row">
                        {galleryImages.map((img, idx) => (
                            <div className="gallery-item" key={idx}>
                                <img src={img} alt={`gallery-image-${idx + 1}`} className='gallery-image' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <div className="newsletter-section-container">
                <section className="newsletter-section" style={{ backgroundImage: `url(${pizzaBg})` }} >
                    <div className="newLetter-content">
                        <p className="newLetter-label">SPECIAL OFFERS</p>
                        <p className="newLetter-title">Get Exclusive Durkin's Deals!</p>
                        <p className="newLetter-desc">
                            Subscribe to receive exclusive pizza offers, weekly specials, and insider deals.
                        </p>

                        <div className="newsletter-feedback-stack">
                            <div className="newsletter-feedback-wrapper">
                                {newsletterError ? (
                                    <div className="invalid-feedback d-block text-start">
                                        <i className="fa-solid fa-circle-exclamation me-2"></i>{newsletterError}
                                    </div>
                                ) : newsletterSuccess ? (
                                    <div className="valid-feedback d-block text-start">
                                        <i className="fa-solid fa-circle-check me-2"></i>{newsletterSuccess}
                                    </div>
                                ) : (
                                    <div className="invalid-feedback d-block text-start">&nbsp;</div>
                                )}
                            </div>

                            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} autoComplete="off">
                                <input
                                    className="newsletter-input"
                                    type="email"
                                    placeholder="Enter your email for exclusive deals"
                                    value={newsletterEmail}
                                    onChange={handleNewsletterChange}
                                />
                                <button className="newsletter-btn" type="submit">Get Offers</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default Home;