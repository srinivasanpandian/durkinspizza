import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't scroll to top for menu category routes or /home#menu
    if (location.pathname.startsWith('/menu/') && location.pathname !== '/menu') {
      return;
    }
    // Don't scroll to top when navigating to /home#menu
    if (location.pathname === '/home' && location.hash === '#menu') {
      return;
    }
    
    // Use instant behavior for better performance
    window.scrollTo(0, 0, { behavior: 'instant' });
  }, [location]);

  return null;
};

export default ScrollToTop;
