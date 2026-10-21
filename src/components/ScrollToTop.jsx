import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop guarantees that whenever route changes, the window scrolls
 * back to top with instant zero-flicker alignment.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
