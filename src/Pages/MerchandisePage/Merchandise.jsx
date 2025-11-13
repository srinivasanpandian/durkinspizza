import './Merchandise.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MerchTee from '../../assets/images/Merchandise/durkin-tees.webp';
import CouponImg1 from '../../assets/images/Coupons/coupons_1.png';
import { Link } from 'react-router-dom';

// Merchandise items data (defined above the component, similar to Home page data patterns)
const merchandiseItems = [
    {
        title: "Durkin's T Shirt",
        description: "Wrap yourself in the irresistible charm of Durkin's Pizza with our exclusive T-shirt. Crafted with the perfect blend of comfort and style, it's not just clothing; it's a slice of the Durkin's experience. Showcase your love for great pizza with every wear.",
        price: "$15.99",
        label: "Durkin's T Shirt",
        image: MerchTee,
        available: true,
        cta: { text: 'Buy Now', ariaLabel: 'Buy T Shirt', href: '/' }
    },
    {
        title: 'Gift Cards',
        description: 'Give the gift of great taste. We can customize your gift cards for any occasion, and we have offers up to 25% off.',
        offerText: 'Up to 25% off',
        label: 'Gift Cards',
        image: CouponImg1,
        available: false,
        cta: { text: 'Buy Now', ariaLabel: 'Buy Gift Card', href: '/' }
    }
];

const Merchandise = () => {
    return (
        <div className="merchandise-page-container">
            <Header />

            <div className="merchandise-page-content py-5 pt-4">
                <div className="container">
                    <div className="row g-4 align-items-stretch">

                        <div className="merch-header-content">
                            <p className="merch-page-content-title">Exclusive Durkin’s Merchandise</p>
                            <p className="merch-page-content-desc">
                                Take home a slice of the Durkin’s experience! Explore our exclusive range of T-shirts and customizable gift cards — perfect for showing your love for great pizza and good vibes.
                            </p>
                        </div>

                        {merchandiseItems.map((item, idx) => (
                            <div className="col-12 col-lg-6" key={idx}>
                                <div className="merch-card h-100">
                                    <div className="merch-content">
                                        <h2 className="merch-title mb-2">{item.title}</h2>
                                        <p className="merch-text">{item.description}</p>
                                        <div className="merch-bottom">
                                            {item.price && <div className="merch-price">{item.price}</div>}
                                            {item.offerText && <div className="merch-offer">{item.offerText}</div>}
                                            <Link to={item.cta?.href || '/'} className="btn merch-buy" aria-label={item.cta?.ariaLabel || 'Buy Now'}>{item.cta?.text || 'Buy Now'}</Link>
                                        </div>
                                    </div>
                                    <div className={`merch-media ${item.available === false ? 'is-coming-soon' : ''}`}>
                                        <img
                                            src={item.image.startsWith('/') ? item.image : '/' + item.image.replace(/^\/+/, '')}
                                            alt={item.label || item.title}
                                        />
                                        <div className="merch-label">{item.label || item.title}</div>
                                        {item.available === false && (
                                            <div className="merch-coming-soon" aria-label="Coming soon">Coming Soon..</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Merchandise;