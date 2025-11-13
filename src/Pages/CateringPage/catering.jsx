import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import emailjs from 'emailjs-com';
import './catering.css';

import FooterLogo from '../../assets/images/Footer/footer-logo.png';

import PremiumIngredientIcon from '../../assets/images/cateringPage/premiumIngredient.png';
import ExpertPizzaChefsIcon from '../../assets/images/cateringPage/expertPizzaChefs.png';
import HotFreshDeliveryIcon from '../../assets/images/cateringPage/hotFreshDelivery.png';
import EasyOrderingSupportIcon from '../../assets/images/cateringPage/easyOrderingSupport.png';

import CateringAbout1 from '../../assets/images/cateringPage/catering-about-1.png';
import Flakes from '../../assets/images/cateringPage/flakes.png';
import PizzaSlice from '../../assets/images/cateringPage/pizza-slice.png';

const Catering = () => {
    const features = [
        {
            icon: PremiumIngredientIcon,
            title: 'Premium Ingredients',
            desc: 'We use top-quality mozzarella, sauces, and hand-cut veggies in every catered order.',
        },
        {
            icon: ExpertPizzaChefsIcon,
            title: 'Expert Pizza Chefs',
            desc: 'Decades of experience crafting handmade pizzas for every type of event.',
        },
        {
            icon: HotFreshDeliveryIcon,
            title: 'Hot, Fresh Delivery',
            desc: 'Right out of the oven to your location – always fast, never cold.',
        },
        {
            icon: EasyOrderingSupportIcon,
            title: 'Easy Ordering Support',
            desc: 'Our team helps you plan portions, toppings, and timing to perfection.',
        },
    ];

    // Form state and validation
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        country: '',
        address1: '',
        city: '',
        state: '',
        zip: '',
        details: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init("lr2sxHbG0L7lF_Q6w");
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobileNumber = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const validateZipCode = (zip) => {
        const zipRegex = /^\d{5}$/;
        return zipRegex.test(zip);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!validateMobileNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.country) {
            newErrors.country = 'Country is required';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }
        if (!formData.zip.trim()) {
            newErrors.zip = 'ZIP Code is required';
        } else if (!validateZipCode(formData.zip)) {
            newErrors.zip = 'ZIP Code must be exactly 5 digits';
        }
        if (!formData.address1.trim()) {
            newErrors.address1 = 'Address Line 1 is required';
        }
        if (!formData.details.trim()) {
            newErrors.details = 'Catering Order Details are required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        // Prepare template parameters for EmailJS
        const templateParams = {
            to_email: 'durkins@durkinspizza.com',
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            from_phone: formData.phoneNumber,
            country: formData.country,
            address: formData.address1,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            details: formData.details,
            message: `New Catering Order Request

Contact Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}

Address:
${formData.address1}
${formData.city}, ${formData.state} ${formData.zip}
${formData.country}

Catering Order Details:
${formData.details}`
        };

        // Send email using EmailJS
        emailjs.send(
            'service_27m9avr',
            'template_hwhg79l',
            templateParams
        )
            .then((response) => {
                console.log('Email sent successfully:', response);
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    country: '',
                    address1: '',
                    city: '',
                    state: '',
                    zip: '',
                    details: '',
                });
                setErrors({});
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                setIsSubmitting(false);
                alert('Failed to send email. Please try again or contact us directly.');
            });
    };

    return (
        <>
            <div className="catering-page">
                <Header />
                <div className="catering-banner">
                    <div className="catering-banner-content container-fluid">
                        <p className="catering-banner-title">Place your catering order today!</p>
                        <h2 className="catering-banner-logo"><img src={FooterLogo} alt="durkin-logo" className='img-fluid catering-banner-logo' /></h2>
                        <p className="catering-banner-desc">Fast, hot & made with love – Delivered fresh to your event!</p>
                        <div className="catering-contact-links">
                            <p className="catering-contact-link d-flex align-items-center"><i className="fa-solid fa-phone me-1 me-sm-2"></i> <span>(972) 727-8400</span></p>
                            <p className="catering-contact-link d-flex align-items-center"><i className="fa-solid fa-phone me-1 me-sm-2"></i> <span>(972) 294-5979</span></p>
                            <p className="catering-contact-link d-flex align-items-center"><i className="fa-solid fa-envelope me-1 me-sm-2"></i> <span>inquiry@durkinspizza.com</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ! Catering About Section */}
            <div className="catering-about-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                            <h2 className="catering-about-title">Why Choose Durkin's Pizza For Your Catering?</h2>
                            <div className="row">
                                {features.map((feature, index) => (
                                    <div key={index} className="col-12 col-md-6 mb-4">
                                        <div className="catering-about-feature">
                                            <div className="catering-about-feature-icon">
                                                <img src={feature.icon} alt={feature.title} />
                                            </div>
                                            <p className='catering-about-feature-title'>{feature.title}</p>
                                            <p className='catering-about-feature-desc'>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="catering-about-image">
                                <img src={CateringAbout1} alt="" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ! Catering Form Section */}
            <div className="catering-form-section">
                <img src={Flakes} alt="" className='catering-flakes catering-flakes-1' />
                <img src={Flakes} alt="" className='catering-flakes catering-flakes-2' />
                <div className="container">
                    <div className="catering-form-container">
                        {/* floating Pizza */}
                        <img src={PizzaSlice} alt="" className='catering-pizza-slice' />
                        <div className="catering-form-header-container">
                            <h2 className="catering-form-title">Catering Order Form</h2>
                            <p className="catering-form-desc">We're here to help you plan the perfect event. Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>
                        <div className="catering-form-body-container">
                            <form className="row g-3 catering-order-form" autoComplete="off" onSubmit={handleSubmit}>
                                {/* Success Message above the first row of the form */}
                                {isSubmitted && (
                                    <div className="contact-success-message">
                                        <i className="fa-solid fa-check-circle me-2"></i>
                                        Thank you for your message! We'll get back to you soon.
                                    </div>
                                )}
                                {/* First Name */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className={`form-control${errors.firstName ? ' is-invalid' : ''}`} id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                    {errors.firstName && <div className="invalid-feedback d-block text-start">{errors.firstName}</div>}
                                </div>
                                {/* Last Name */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                </div>
                                {/* Phone Number */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className={`form-control${errors.phoneNumber ? ' is-invalid' : ''}`} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} maxLength={10} />
                                    {errors.phoneNumber && <div className="invalid-feedback d-block text-start">{errors.phoneNumber}</div>}
                                </div>
                                {/* Email Address */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className={`form-control${errors.email ? ' is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} />
                                    {errors.email && <div className="invalid-feedback d-block text-start">{errors.email}</div>}
                                </div>
                                {/* Country */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className={`form-select${errors.country ? ' is-invalid' : ''}`} id="country" name="country" value={formData.country} onChange={handleInputChange} >
                                        <option value="">Select Country</option>
                                        <option value="USA">USA</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Mexico">Mexico</option>
                                    </select>
                                    {errors.country && <div className="invalid-feedback d-block text-start">{errors.country}</div>}
                                </div>
                                {/* Address Line 1 */}
                                <div className="col-12 col-md-6">
                                    <label htmlFor="address1" className="form-label">Address Line 1</label>
                                    <input type="text" className={`form-control${errors.address1 ? ' is-invalid' : ''}`} id="address1" name="address1" value={formData.address1} onChange={handleInputChange} />
                                    {errors.address1 && <div className="invalid-feedback d-block text-start">{errors.address1}</div>}
                                </div>
                                {/* City */}
                                <div className="col-12 col-md-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className={`form-control${errors.city ? ' is-invalid' : ''}`} id="city" name="city" value={formData.city} onChange={handleInputChange} />
                                    {errors.city && <div className="invalid-feedback d-block text-start">{errors.city}</div>}
                                </div>
                                {/* State */}
                                <div className="col-12 col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" className={`form-control${errors.state ? ' is-invalid' : ''}`} id="state" name="state" value={formData.state} onChange={handleInputChange} />
                                    {errors.state && <div className="invalid-feedback d-block text-start">{errors.state}</div>}
                                </div>
                                {/* ZIP Code */}
                                <div className="col-12 col-md-4">
                                    <label htmlFor="zip" className="form-label">ZIP Code</label>
                                    <input type="text" className={`form-control${errors.zip ? ' is-invalid' : ''}`} id="zip" name="zip" value={formData.zip} onChange={handleInputChange} maxLength={5} pattern="\d{5}" inputMode="numeric" />
                                    {errors.zip && <div className="invalid-feedback d-block text-start">{errors.zip}</div>}
                                </div>
                                {/* Catering Order Details */}
                                <div className="col-12">
                                    <label htmlFor="details" className="form-label">Catering Order Details</label>
                                    <textarea className={`form-control${errors.details ? ' is-invalid' : ''}`} id="details" name="details" rows="5" style={{ resize: 'none' }} placeholder="Let us know your order, event details, and delivery time..." value={formData.details} onChange={handleInputChange}></textarea>
                                    {errors.details && <div className="invalid-feedback d-block text-start">{errors.details}</div>}
                                </div>
                                {/* Submit Button */}
                                <div className="col-12 d-flex justify-content-center">
                                    <button type="submit" className="catering-order-btn" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin me-2"></i> Sending...
                                            </>
                                        ) : (
                                            'SUBMIT CATERING ORDER'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Catering;
