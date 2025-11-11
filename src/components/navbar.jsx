import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 50,
      padding: '0.75rem 1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem'
      }}>
        <Link 
          to="/" 
          style={{ 
            fontWeight: 'bold', 
            fontSize: '1.5rem', 
            color: '#111827', 
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          AutoCare
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link 
            to="/services" 
            className="nav-link"
            style={{
              color: '#111827',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'color 0.2s ease'
            }}
          >
            Services
          </Link>
          <Link 
            to="/book" 
            className="nav-link"
            style={{
              color: '#111827',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'color 0.2s ease'
            }}
          >
            Book Service
          </Link>
          <Link 
            to="/contact" 
            className="nav-link"
            style={{
              color: '#2563eb',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              padding: '0.5rem 0',
              position: 'relative',
              transition: 'color 0.2s ease'
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
      <style jsx global>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #2563eb;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: #2563eb;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
