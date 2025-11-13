import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';

import footerPattern1 from '../../assets/images/Footer/top.png'
import footerPattern2 from '../../assets/images/Footer/bottom.png'

import durkinFooterLogo from '../../assets/images/Footer/footer-logo.png'
import lineSeperation from '../../assets/images/Footer/line-seperation.png'
import maghilLogo from '../../assets/images/Logo/maghil-logo.png'


const Footer = () => {
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        e.preventDefault();
        navigate('/home#menu');
    };

    return (
        <footer>
            <div className="footer-container py-5">

                <img src={footerPattern1} alt="footer-bg-1" className='footer-bg footer-bg-1' />
                <img src={footerPattern2} alt="footer-bg-2" className='footer-bg footer-bg-2' />

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 footer-about-section mb-5 mb-lg-4 order-1 order-sm-1 order-lg-1 text-center">
                            <Link to="/"><img src={durkinFooterLogo} alt="logo" className="img-fluid footer-logo mb-3" /></Link>
                            {/* <p>Hot, fresh, and made with love — your favorite neighborhood pizza place. Serving happiness one slice at a time.</p> */}
                            <div className='social-media-container'>
                                <p className="social-media-title"><i className="fa-solid fa-mobile-screen-button me-2"></i> Follow Us</p>
                                <div className="footer-social-icons">
                                    <a href="https://www.facebook.com/durkinspizza5" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/durkinspizza/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                                    <a href="https://x.com/durkinspizza" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                                    {/* <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-youtube"></i></a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 footer-contact-section mb-5 mb-lg-4 order-2 order-sm-3 order-lg-2">
                            <a className='footer-contact-section-link' href="https://www.google.com/maps/place/8930+State+Hwy+121+STE+594,+McKinney,+TX+75070/@33.130065,-96.732395,1191m/data=!3m1!1e3!4m6!3m5!1s0x864c1636dbe3bd29:0xc653962d1785b236!8m2!3d33.1300646!4d-96.7323946!16s%2Fg%2F11fhvys0gd?hl=en&entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D" target='_blank' rel='noreferrer'><i className="fa-solid fa-location-dot me-2"></i> Visit Us - McKinney Location</a>
                            <p className='address'>8930 Hwy 121 Ste 594 McKinney, TX</p>
                            <a className='footer-contact-section-link' href="tel:+19727278400" target='_blank' rel='noreferrer'><i className="fa-solid fa-phone me-2"></i> Call Us : +1 (972) 727-8400</a>
                            <a className='footer-contact-section-link' href="mailto:contact@durkinspizza.com" target='_blank' rel='noreferrer'><i className="fa-solid fa-envelope me-2"></i> Email :  contact@durkinspizza.com</a>
                            <div className="opening-hours mt-4">
                                <p className='opening-hours-title'><i className="fa-solid fa-clock me-2"></i> Working Hours</p>
                                <p className='opening-time'>Mon – Thur : 11:00 AM – 10:00 PM</p>
                                <p className='opening-time'>Fri : 11:00 AM – 10:30 PM</p>
                                <p className='opening-time'>Sat : 10:30 AM – 10:30 PM</p>
                                <p className='opening-time'>Sun : 10:30 AM – 10:00 PM</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 footer-contact-section mb-5 mb-lg-4 order-3 order-sm-4 order-lg-3">
                            <a className='footer-contact-section-link' href="https://www.google.com/maps/place/4350+Main+St+Suite+140,+Frisco,+TX+75033/@33.154571,-96.849893,1191m/data=!3m1!1e3!4m6!3m5!1s0x864c3be40b3bcab5:0xa8da8a7983f6430!8m2!3d33.1545714!4d-96.8498935!16s%2Fg%2F11pvcvj0yn?hl=en&entry=ttu&g_ep=EgoyMDI1MDgwMy4wIKXMDSoASAFQAw%3D%3D" target='_blank' rel='noreferrer'><i className="fa-solid fa-location-dot me-2"></i> Visit Us - Frisco Location </a>
                            <p className='address'>4350 N. Main Street, Suite 140  Frisco, Texas 75033</p>
                            <a className='footer-contact-section-link' href="tel:+19722945979" target='_blank' rel='noreferrer'><i className="fa-solid fa-phone me-2"></i>  Call Us : +1 (972) 294-5979</a>
                            <a className='footer-contact-section-link' href="mailto:contact@durkinspizza.com" target='_blank' rel='noreferrer'><i className="fa-solid fa-envelope me-2"></i> Email : contact@durkinspizza.com</a>
                            <div className="opening-hours mt-4">
                                <p className='opening-hours-title'><i className="fa-solid fa-clock me-2"></i> Working Hours</p>
                                <p className='opening-time'>Mon – Thur : 4:00 PM – 10:00 PM</p>
                                <p className='opening-time'>Fri : 4:00 PM – 10:30 PM</p>
                                <p className='opening-time'>Sat : 10:15 AM – 10:30 PM</p>
                                <p className='opening-time'>Sun : 10:15 AM – 10:00 PM</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 footer-links-section mb-4 mb-lg-4 order-4 order-sm-2 order-lg-4">
                            <p className="footer-links-section-title">🔗 Quick Links</p>
                            <li><Link className='footer-links-section-link' to="/">Home</Link></li>
                            <li><Link className='footer-links-section-link' to="/home#menu" onClick={handleMenuClick}>Menu</Link></li>
                            <li><Link className='footer-links-section-link' to="/coupons">Coupons</Link></li>
                            <li><Link className='footer-links-section-link' to="/merchandise">Merchandise</Link></li>
                            <li><Link className='footer-links-section-link' to="/catering">Catering</Link></li>
                            <li><Link className='footer-links-section-link' to="/contact">Contact</Link></li>
                            <li><Link className='footer-links-section-link' to="/blog">Blog</Link></li>
                            {/* <div className='social-media-container d-none d-sm-block mt-3'>
                                <p className="social-media-title"><i className="fa-solid fa-mobile-screen-button me-2"></i> Follow Us</p>
                                <div className="footer-social-icons">
                                    <a href="https://www.facebook.com/durkinspizza5" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                                    <a href="https://www.instagram.com/durkinspizza/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                                    <a href="https://x.com/durkinspizza" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="footer-line-seperation">
                    <img src={lineSeperation} alt="line-seperation" className="img-fluid" />
                </div>

                <div className="footer-copyright-section d-block d-sm-none">
                    <p>2025 © Durkin’s Pizza  All Right Reserved.  Powered by </p>
                    <Link to="https://maghil.com/" target='_blank' rel='noreferrer'><img src={maghilLogo} alt="logo" className='maghil-logo' /></Link>
                </div>

                <div className="footer-copyright-section d-none d-sm-block">
                    <p>2025 © Durkin’s Pizza  All Right Reserved.  Powered by <Link to="https://maghil.com/" target='_blank' rel='noreferrer'><img src={maghilLogo} alt="logo" className='maghil-desktop-logo ms-2' /></Link></p>
                </div>

                <div className='footer-up text-center'>
                    <a
                        href="#"
                        className='footer-up-link'
                        onClick={e => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <i className="fa-solid fa-angle-up"></i>
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
