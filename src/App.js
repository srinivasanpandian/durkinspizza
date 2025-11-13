import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import Home from './Pages/HomePage/Home';
import Contact from './Pages/ContactPage/contact';
import Catering from './Pages/CateringPage/catering';
import Menu from './Pages/MenuPage/menu';
import Coupons from './Pages/Coupons/Coupons';
import Blog from './Pages/BlogPage/blog';
import BlogDetails from './components/BlogDetails/BlogDetails';
import FriscoOrderOnline from './Pages/OrderOnlinePage/FriscoOrderOnline';
// import McKinneyOrderOnline from './Pages/OrderOnlinePage/McKinneyOrderOnline';
import Merchandise from './Pages/MerchandisePage/Merchandise';
import Frisco from './Pages/Locations/Frisco';
import McKinney from './Pages/Locations/McKinney';

function App() {
  useEffect(() => {
    // Only initialize AOS on the initial page load
    if (window.location.pathname === '/') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }, []);

  // Component to handle /home route with hash checking
  const HomeWrapper = () => {
    // Check hash on mount and when it changes
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
      // Set initial hash
      setHash(window.location.hash);
      
      const handleHashChange = () => {
        setHash(window.location.hash);
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return hash === '#menu' ? <Menu /> : <Home />;
  };

  // Component to redirect /menu to /home#menu
  const MenuRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/home#menu', { replace: true });
    }, [navigate]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<HomeWrapper />} />
            <Route path="/frisco-tx" element={<Frisco />} />
            <Route path="/mckinney-tx" element={<McKinney />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/menu" element={<MenuRedirect />} />
            <Route path="/menu/:category" element={<Menu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogTitle" element={<BlogDetails />} />
            <Route path="/durkins-pizza-orderOnline" element={<FriscoOrderOnline />} />
            {/* <Route path="/frisco-orderOnline" element={<FriscoOrderOnline />} /> */}
            {/* <Route path="/mckinney-orderOnline" element={<McKinneyOrderOnline />} /> */}
            <Route path="/merchandise" element={<Merchandise />} />
          </Routes>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
