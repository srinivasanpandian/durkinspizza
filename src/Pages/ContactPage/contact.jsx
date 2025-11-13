import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './contact.css';
import LocLeft from '../../assets/images/contactPage/loc-left.png';
import LocRight from '../../assets/images/contactPage/loc-right.png';
import LeafLeft from '../../assets/images/contactPage/leaf-left.png';
import LeafRight from '../../assets/images/contactPage/leaf-right.png';

const Contact = () => {

    const locations = [
        {
            title: 'West McKinney',
            subtitle: 'Custer & SH 121',
            address: '8930 Hwy 121 Ste 594, McKinney, TX',
            addressNote: 'NE corner of Custer and 121 Next to QuikTrip',
            phone: '(972) 727-8400',
            email: 'contact@durkinspizza.com',
        },
        {
            title: 'Frisco',
            subtitle: 'Main & Legacy',
            address: '4350 N. Main Street, Suite 140, Frisco, Texas 75033',
            addressNote: '',
            phone: '(972) 294-5979',
            email: 'contact@durkinspizza.com',
        },
    ];

    const mapData = [
        {
            title: 'West McKinney',
            address: '8930 Hwy 121 Ste 594, McKinney, TX',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393964243527!2d-96.7331236848137!3d33.14831598086409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19e2e2e2e2e2%3A0x1234567890abcdef!2s8930%20State%20Hwy%20121%20STE%20594%2C%20McKinney%2C%20TX%2075070!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus',
        },
        {
            title: 'Frisco',
            address: '4350 n. Main Street, Suite 140, Frisco, TX 75033',
            mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393964243527!2d-96.8131236848137!3d33.17831598086409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19e2e2e2e2e2%3A0xabcdef1234567890!2s4350%20Main%20St%20Suite%20140%2C%20Frisco%2C%20TX%2075033!5e0!3m2!1sen!2sus!4v1680000000001!5m2!1sen!2sus',
        },
    ];

    // Remove reasonOptions, only keep state for reason
    const [reason, setReason] = useState('');

    // Form state and validation
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: '',
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
        if (!reason) {
            newErrors.reason = 'Reason for inquiry is required';
        }
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
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
            from_name: formData.firstName,
            from_email: formData.email,
            from_phone: formData.phoneNumber,
            reason: reason,
            subject: formData.subject,
            message: formData.message,
            full_message: `New Contact Form Submission

            Contact Information:
            Name: ${formData.firstName}
            Email: ${formData.email}
            Phone: ${formData.phoneNumber}

            Inquiry Details:
            Reason: ${reason}
            Subject: ${formData.subject}

            Message:
            ${formData.message}`
        };

        // Send email using EmailJS
        emailjs.send(
            'service_27m9avr',
            'template_m2fm5lj',
            templateParams
        )
            .then((response) => {
                console.log('Email sent successfully:', response);
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({
                    firstName: '',
                    phoneNumber: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setReason('');
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
            <div className="contact-page">
                <Header />
            </div>

            {/* ! Location Section */}
            <div className="location-section py-5">

                <img src={LocLeft} alt="location-bg" className='location-bg location-1' />
                <img src={LocRight} alt="location-bg" className='location-bg location-2' />

                <div className="container">
                    <div className="section-title">
                        <h2 className="section-title-text">Our Locations</h2>
                        <p className="section-title-desc">Visit us at either of our convenient locations</p>
                    </div>
                    <div className="row">
                        {locations.map((loc, idx) => (
                            <div className="location-cards col-12 col-lg-6 mb-5" key={idx}>
                                <div className="location-card">
                                    <div className="location-name">{loc.title}</div>
                                    <div className="location-subName">{loc.subtitle}</div>
                                    <div className="location-address mb-2 text-start">
                                        <a href={loc.mapSrc} target='_blank' rel='noreferrer' className='address-text loc-text-link'><i class="fa-solid fa-location-dot me-2"></i>{loc.address}</a>
                                    </div>
                                    {/* {loc.addressNote && <p className='address-note'>{loc.addressNote}</p>} */}
                                    <div className="location-contact mb-2 text-start">
                                        <a href={`tel:${loc.phone}`} className='contact-text loc-text-link'><i class="fa-solid fa-phone me-2"></i>{loc.phone}</a>
                                    </div>
                                    <div className="location-mail mb-2 text-start">
                                        <a href={`mailto:${loc.email}`} className='mail-text loc-text-link'><i class="fa-solid fa-envelope me-2"></i>{loc.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ! Map Section */}
            <div className="map-section">
                {/* floating leaf */}
                <img src={LeafLeft} alt="leaf left" className="map-leaf map-leaf-left" />
                <img src={LeafRight} alt="leaf right" className="map-leaf map-leaf-right" />
                <div className="container">
                    <div className="section-title">
                        <h2 className="section-title-text">Find Us</h2>
                        <p className="section-title-desc">Easy to locate with convenient parking</p>
                    </div>
                    <div className="row">
                        {mapData.map((map, idx) => (
                            <div className="col-12 col-lg-6 mb-5" key={idx}>
                                <div className="map-title"><h3>{map.title}</h3></div>
                                <div className="map-address"><p>{map.address}</p></div>
                                <div className="map-card">
                                    <div className="map-iframe-wrapper">
                                        <iframe
                                            src={map.mapSrc}
                                            width="100%"
                                            height="320"
                                            style={{ border: 0, borderRadius: '20px' }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title={map.title}
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ! Community Section */}
            <div className="community-section">
                <div className="container">
                    <div className="section-title">
                        <h2 className="section-title-text">Giving Back to Our Community</h2>
                        <p className="section-title-desc">At Durkin's Pizza, we believe in supporting the community that supports us. From donating pizzas to local causes to partnering with schools and shelters, we're proud to give back.</p>
                    </div>
                    <div className="community-content">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-8 text-center">
                                <p className="community-text">Have a cause you'd like us to support? Reach out through the form below.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ! Contact Section */}
            <div className="contact-section">
                <div className="container">

                    {/* ! Section Title */}
                    <div className="section-title">
                        <h2 className="section-title-text">Get In Touch</h2>
                        <p className="section-title-desc">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    {/* ! Contact Form */}
                    <div className="contact-form">
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            {/* Success Message above the first row of the form */}
                            {isSubmitted && (
                                <div className="contact-success-message">
                                    <i className="fa-solid fa-check-circle me-2"></i>
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}
                            <div className="row g-3">
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-start w-100">First Name</label>
                                    <input
                                        type="text"
                                        className={`form-control${errors.firstName ? ' is-invalid' : ''}`}
                                        placeholder=""
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.firstName && <div className="invalid-feedback d-block text-start">{errors.firstName}</div>}
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-start w-100">Phone Number</label>
                                    <input
                                        type="text"
                                        className={`form-control${errors.phoneNumber ? ' is-invalid' : ''}`}
                                        placeholder=""
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        maxLength={10}
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback d-block text-start">{errors.phoneNumber}</div>}
                                </div>
                                <div className="col-12 col-md-4">
                                    <label className="form-label text-start w-100">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control${errors.email ? ' is-invalid' : ''}`}
                                        placeholder=""
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="invalid-feedback d-block text-start">{errors.email}</div>}
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-start w-100">Reason for Inquiry</label>
                                    <select className={`form-select${errors.reason ? ' is-invalid' : ''}`} value={reason || ''} onChange={e => setReason(e.target.value)} required>
                                        <option value="" disabled></option>
                                        <option value="order">Order</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="catering">Catering</option>
                                        <option value="char">Charity</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.reason && <div className="invalid-feedback d-block text-start">{errors.reason}</div>}
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label text-start w-100">Subject</label>
                                    <input
                                        type="text"
                                        className={`form-control${errors.subject ? ' is-invalid' : ''}`}
                                        placeholder=""
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                    />
                                    {errors.subject && <div className="invalid-feedback d-block text-start">{errors.subject}</div>}
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-start w-100">Message</label>
                                    <textarea
                                        className={`form-control${errors.message ? ' is-invalid' : ''}`}
                                        style={{ resize: 'none' }}
                                        rows="5"
                                        placeholder="Tell us more about your inquiry"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex justify-content-center mt-3">
                                    <button type="submit" className="contact-btn" disabled={isSubmitting} style={{ minWidth: '160px', fontWeight: 700, fontSize: '1.2rem', borderRadius: '20px' }}>
                                        {isSubmitting ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin me-2"></i> Sending...
                                            </>
                                        ) : (
                                            'SEND MESSAGE'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default Contact;