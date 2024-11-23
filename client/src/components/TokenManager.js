import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TokenManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove the token when navigating away from the Cart page
    if (location.pathname !== '/cart') {
      localStorage.removeItem('token');
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default TokenManager;
