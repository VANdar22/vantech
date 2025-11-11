import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminPortal from './pages/AdminPortal';
import Dashboard from './pages/admin/Dashboard';
import Notifications from './pages/admin/Notifications';
import AppointmentsList from './pages/admin/AppointmentsList';
import SimpleNavbar from './components/SimpleNavbar';
import Footer from './components/footer';
import ServicePage from './pages/ServicePage';

// ClerkProvider has been moved to main.jsx

// Wrapper component to conditionally show the navbar and footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && !isAdminPage && <SimpleNavbar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
          {/* Public routes */}
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Public home page */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/services"
            element={
              <AppLayout>
                <ServicePage />
              </AppLayout>
            }
          />
          
          {/* Admin portal */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AdminPortal />
                </AppLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<AppointmentsList />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          
          {/* Add more protected routes as needed */}
          {/* 
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          */}
        </Routes>
      </Router>
  );
};

export default App;