import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: '1rem'
      }}>
        <SignUp 
          routing="path"
          path="/signup"
          signInUrl="/login"
          afterSignUpUrl="/admin"
          redirectUrl="/admin"
        />
        
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>Already have an account?</p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              color: '#374151',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
