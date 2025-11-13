import './menu.css';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CustomizePizza from '../../components/CustomizePizza/CustomizePizza';
import FreshSalads from '../../components/FreshSalads/FreshSalads';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getCategories,
    getFilteredMenuData,
    getCategoryBySlug,
    getSlugByCategory
} from '../../utils/menuRouting';

import menupattern1 from '../../assets/images/MenuPage/menu-pattern-1.png';
import menupattern2 from '../../assets/images/MenuPage/menu-pattern-2.png';

const Menu = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuTitleRef = useRef(null);
    const menuContentRef = useRef(null);

    // Memoize categories to prevent unnecessary recalculations
    const categories = useMemo(() => getCategories(), []);

    // Memoize filtered menu data based on active filter
    const filteredMenuData = useMemo(() =>
        getFilteredMenuData(activeFilter), [activeFilter]
    );

    // Handle URL parameter for category
    useEffect(() => {
        if (category) {
            const mappedCategory = getCategoryBySlug(category);
            if (categories.includes(mappedCategory)) {
                setActiveFilter(mappedCategory);
                // Scroll to the specific category section with delay
                setTimeout(() => scrollToCategory(mappedCategory), 100);
            }
        }
    }, [category, categories]);

    // Function to scroll to specific category
    const scrollToCategory = useCallback((categoryName) => {
        const categoryElements = document.querySelectorAll('.menu-category');
        let targetElement = null;

        categoryElements.forEach(element => {
            if (element.textContent === categoryName) {
                targetElement = element.closest('.menu-card');
            }
        });

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            document.documentElement.style.scrollPaddingTop = '200px';
        } else {
            const menuContent = document.querySelector('.menu-content');
            if (menuContent) {
                menuContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                document.documentElement.style.scrollPaddingTop = '200px';
            }
        }
    }, []);

    // Update URL when filter changes
    const handleFilterClick = useCallback((selectedCategory) => {
        // Prevent unnecessary re-renders if clicking the same category
        if (activeFilter === selectedCategory) {
            return;
        }

        setActiveFilter(selectedCategory);

        if (selectedCategory === 'All') {
            navigate('/home#menu');
            // Add scroll padding top for "All" category
            document.documentElement.style.scrollPaddingTop = '200px';

            setTimeout(() => {
                const menuWrapper = document.querySelector('.menu-wrapper');
                if (menuWrapper) {
                    menuWrapper.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }, 100);
        } else {
            // Keep category navigation as /menu/:category for now, or update to /home#menu if needed
            const urlCategory = getSlugByCategory(selectedCategory);
            // For now, keep using /menu/:category to maintain functionality
            navigate(`/menu/${urlCategory}`);
            setTimeout(() => {
                scrollToCategory(selectedCategory);
            }, 100);
        }
    }, [activeFilter, navigate, scrollToCategory]);

    const handleDropdownClick = useCallback((selectedCategory) => {
        handleFilterClick(selectedCategory);
        setIsDropdownOpen(false);
    }, [handleFilterClick]);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen(!isDropdownOpen);
    }, [isDropdownOpen]);

    // Scroll menu title into view and open dropdown when header is clicked
    const handleDropdownHeaderClick = useCallback(() => {
        if (menuTitleRef.current) {
            menuTitleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsDropdownOpen(true);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        if (!isDropdownOpen) return;

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Memoize menu content to prevent unnecessary re-renders
    const menuContent = useMemo(() => {
        if (activeFilter === 'Specialty Pizzas') {
            return <CustomizePizza type="regular" />;
        } else if (activeFilter === 'Indian Specialty Pizzas') {
            return <CustomizePizza type="indian" />;
        } else if (activeFilter === 'Fresh Salads') {
            return <FreshSalads />;
        } else {
            return (
                <>
                    {filteredMenuData.map((menuSection, sectionIndex) => {
                        const isMeatToppings = menuSection['menu-category'] === 'Meat Toppings';
                        const isPastaBread = menuSection['menu-category'] === 'Pasta & Bread';
                        const isBakedWings = menuSection['menu-category'] === 'Baked Chicken Wings';
                        const isBeerFries = menuSection['menu-category'] === 'Beer Batterd Fries';

                        return (
                            <React.Fragment key={sectionIndex}>
                                <div className="menu-card row justify-content-center" data-category={menuSection['menu-category']}>
                                    <div className="col-12 col-lg-8">
                                        <div className="menu-card-heading">
                                            <p className="menu-category">{menuSection['menu-category']}</p>
                                            <p className="menu-category-desc">{menuSection['menu-category-desc']}</p>
                                        </div>
                                    </div>
                                    <div className="menu-card-image">
                                        <img src={menuSection['menu-image']} alt={menuSection['menu-category']} />
                                    </div>
                                    <div className="menu-card-items row">
                                        {menuSection['menu-items'].map((item, itemIndex) => {
                                            const isSubheading = (item['menu-item-name'] === 'Beers' || item['menu-item-name'] === 'Wines') && !item['menu-item-price'];

                                            if (isSubheading) {
                                                return (
                                                    <div key={itemIndex} className="col-12">
                                                        <div className="menu-subheading">{item['menu-item-name']}</div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={itemIndex} className="col-12 col-lg-6 menu-item-card">
                                                    <div className="menu-item d-flex justify-content-between align-items-center">
                                                        <div className="menu-item-name">{item['menu-item-name']}<span className='premium'>{item['premium'] ? '$' : ''}</span></div>
                                                        <div className="menu-item-price">{item['menu-item-price']}</div>
                                                    </div>
                                                    {(item['menu-item-extra-label'] || item['menu-item-extra-price']) && (
                                                        <div className="menu-item-extra-row d-flex justify-content-between align-items-center">
                                                            <div className="menu-item-extra-left">
                                                                {item['menu-item-extra-label'] && (
                                                                    <span className="menu-item-extra-label">{item['menu-item-extra-label']}</span>
                                                                )}
                                                            </div>
                                                            <div className="menu-item-extra-right">
                                                                {item['menu-item-extra-price'] && (
                                                                    <span className="menu-item-extra-price">{item['menu-item-extra-price']}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="menu-item-desc">{item['menu-item-desc']}</div>
                                                </div>
                                            );
                                        })}

                                        {/* Disclaimer for any category that has it */}
                                        {menuSection['disclaimer'] && (
                                            <div className="menu-disclaimer">
                                                <span className="disclaimer-text"><i className="fas fa-bell disclaimer-icon"></i>{menuSection['disclaimer']}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Insert Sauce after Make Your Pizza section */}
                                {(activeFilter === 'All' || activeFilter === 'Make Your Pizza') && menuSection['menu-category'] === 'Make Your Pizza' && (
                                    <>
                                        <CustomizePizza type="sauce" />
                                        <CustomizePizza type="cheese" />
                                    </>
                                )}

                                {/* Insert Specialty Pizzas after Meat Toppings section */}
                                {activeFilter === 'All' && isMeatToppings && (
                                    <>
                                        <CustomizePizza type="regular" />
                                        <CustomizePizza type="indian" />
                                    </>
                                )}

                                {/* Insert Fresh Salads after Appetizers (only after Beer Batterd Fries) when showing all */}
                                {activeFilter === 'All' && isBeerFries && (
                                    <FreshSalads />
                                )}
                            </React.Fragment>
                        );
                    })}
                </>
            );
        }
    }, [activeFilter, filteredMenuData]);

    return (
        <>
            <div className="menu-page">
                <Header />
            </div>

            {/* Menu Header */}
            <div className="menu-header-container">
                <img src={menupattern1} alt="menu-pattern-1" className='menu-pattern menu-pattern-1' />
                <img src={menupattern2} alt="menu-pattern-2" className='menu-pattern menu-pattern-2' />
                <div className="menu-header-content">
                    <h2 className="menu-header-title">Fresh • Delicious • Delivered</h2>
                    <p className="menu-header-description">🌟 From our kitchen to your table, every bite tells a story of tradition, quality ingredients, and culinary passion. Experience the perfect blend of classic Italian flavors and modern innovation. 🌟</p>
                </div>
            </div>

            {/* Menu Section */}
            <div className="menu-wrapper">
                {/* Title */}
                <h2 className="our-menu" ref={menuTitleRef}>Our Menu</h2>

                {/* Desktop Menu Filter */}
                <div className="menu-filter filter-list">
                    <div className="menu-filter-item">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`menu-filter-button ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => handleFilterClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Filter */}
                <div className="dropdown-wrapper">
                    <div className="filter-section" ref={dropdownRef}>
                        <div className="custom-dropdown-header" onClick={handleDropdownHeaderClick}>
                            {activeFilter}
                            <div className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}></div>
                        </div>
                        {isDropdownOpen && (
                            <ul className="custom-dropdown-list">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className={`dropdown-item ${activeFilter === category ? 'selected' : ''}`}
                                        onClick={() => handleDropdownClick(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Menu Content */}
                <div className="menu-content" ref={menuContentRef}>
                    {menuContent}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Menu;
