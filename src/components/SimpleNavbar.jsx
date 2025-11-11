import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const SimpleNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';

  const handleNavigation = () => {
    if (isServicesPage) {
      navigate('/');
    } else {
      navigate('/services');
    }
  }
  return (
    <nav style={{
      width: '100%',
      backgroundColor: 'gray/50',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      zIndex: 50,
      padding: '1rem 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem'
      }}>
        <Link to="/" style={{ height: '40px', display: 'block' }}>
          <div style={{ height: '100%' }}>
            <img 
              src="/src/assets/logo.png" 
              alt="Logo" 
              style={{ height: '100%', width: 'auto' }}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
        
<button 
            onClick={handleNavigation}
            style={{
              color: 'white',
              backgroundColor: '#EB0A1E',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'opacity 0.2s',
              opacity: '1',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            {isServicesPage ? 'Home' : 'Services'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
