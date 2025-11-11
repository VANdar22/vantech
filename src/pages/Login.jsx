import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
        <SignIn 
          routing="path"
          path="/login"
          signUpUrl=""
          afterSignInUrl="/admin"
          afterSignUpUrl="/admin"
          redirectUrl="/admin"
          appearance={{
            elements: {
              footerAction: {
                display: 'none',
              },
              footerActionLink: {
                display: 'none',
              },
              formButtonPrimary: {
                backgroundColor: '#EB0A1E',
                '&:hover': {
                  backgroundColor: '#c9081a',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
