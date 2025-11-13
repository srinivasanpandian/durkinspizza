import './Header.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DurkinLogo from "../../assets/images/Logo/Durkins-logo.png";

const navLinks = [
    { name: "Home", to: "/" },
    { name: "Menu", to: "/menu" },
    { 
        name: "Locations", 
        to: null, 
        hasDropdown: true, 
        dropdownItems: [
            { name: "Frisco", to: "/frisco-tx" },
            { name: "McKinney", to: "/mckinney-tx" }
        ]
    },
    { name: "Order Online", to: "/durkins-pizza-orderOnline" },
    { name: "Coupons", to: "/coupons" },
    { name: "Durkins's Merchandise", to: "/merchandise" },
    { name: "Catering", to: "/catering" },
    { name: "Contact", to: "/contact" },
    { name: "Blog", to: "/blog" },
];

const Header = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // desktop
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // mobile
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768) {
                setMobileNavOpen(false);
                setMobileDropdownOpen(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownOpen && window.innerWidth > 1199 && !event.target.closest('.dropdown-container')) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    useEffect(() => {
        return () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        };
    }, [hoverTimeout]);

    // ✅ Active logic for parent dropdown (Locations)
    const isActive = (to, link) => {
        if (!to && link?.hasDropdown) {
            return link.dropdownItems.some(item => location.pathname.startsWith(item.to));
        }
        if (!to) return false;
        if (to === "/") return location.pathname === "/";
        // Check for menu active state - either /menu or /home#menu
        if (to === "/menu") {
            return location.pathname === "/menu" || (location.pathname === "/home" && location.hash === "#menu");
        }
        return location.pathname.startsWith(to);
    };

    const handleDropdownToggle = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownItemClick = (to) => {
        setDropdownOpen(false);
        setMobileDropdownOpen(false);
        setMobileNavOpen(false);
        navigate(to);
    };

    const handleMouseEnter = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setDropdownOpen(false);
        }, 150);
        setHoverTimeout(timeout);
    };

    const forceMobileHeader = location.pathname === '/durkins-pizza-orderOnline';

    return (
        <header className={forceMobileHeader ? 'force-mobile-header' : ''}>
            <div className="container-fluid container-lg">
                <div className="row">
                    <div className={`col-12 ${forceMobileHeader ? 'ms-start' : 'mx-xl-auto'} logo-container`}>
                        <Link to="/">
                            <img src={DurkinLogo} alt="logo" className='logo' />
                        </Link>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="nav-container d-none d-xl-block">
                    <ul className='nav-links'>
                        {navLinks.map((link) => (
                            <li
                                className={`nav-link${isActive(link.to, link) ? ' active' : ''}${link.hasDropdown ? ' dropdown-container' : ''}`}
                                key={link.name}
                            >
                                {link.hasDropdown ? (
                                    <div
                                        className="dropdown-container"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <a
                                            href="#"
                                            onClick={handleDropdownToggle}
                                            className={isActive(link.to, link) ? 'active' : ''}
                                        >
                                            {link.name} <i className="fas fa-chevron-down"></i>
                                        </a>
                                        {dropdownOpen && (
                                            <div className="dropdown-menu">
                                                {link.dropdownItems.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.to}
                                                        className={`dropdown-item${location.pathname.startsWith(item.to) ? ' active' : ''}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDropdownItemClick(item.to);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : link.to === "/menu" ? (
                                    <Link
                                        to="/home#menu"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMobileNavOpen(false);
                                            navigate('/home#menu');
                                        }}
                                        className={isActive(link.to, link) ? 'active' : ''}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <Link
                                        to={link.to}
                                        onClick={() => setMobileNavOpen(false)}
                                        className={isActive(link.to, link) ? 'active' : ''}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Nav */}
                <div className={`hamburger d-xl-none${mobileNavOpen ? ' active' : ''}`} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`overlay${mobileNavOpen ? ' active' : ''}`} onClick={() => setMobileNavOpen(false)}></div>

                <div className={`mobile-nav${mobileNavOpen ? ' active' : ''}`}>
                    <ul className="mobile-nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                {link.hasDropdown ? (
                                    <>
                                        <div
                                            className="mobile-nav-link"
                                            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span className={isActive(link.to, link) ? 'active' : ''}>
                                                {link.name} <i className="fas fa-chevron-down"></i>
                                            </span>
                                        </div>
                                        {mobileDropdownOpen && (
                                            <div className="mobile-dropdown">
                                                {link.dropdownItems.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        className={`mobile-dropdown-item${location.pathname.startsWith(item.to) ? ' active' : ''}`}
                                                        onClick={() => handleDropdownItemClick(item.to)}
                                                    >
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : link.to === "/menu" ? (
                                    <div
                                        className="mobile-nav-link"
                                        onClick={() => {
                                            setMobileNavOpen(false);
                                            navigate('/home#menu');
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className={isActive(link.to, link) ? 'active' : ''}>{link.name}</span>
                                    </div>
                                ) : (
                                    <div
                                        className="mobile-nav-link"
                                        onClick={() => {
                                            setMobileNavOpen(false);
                                            navigate(link.to);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span className={isActive(link.to, link) ? 'active' : ''}>{link.name}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
