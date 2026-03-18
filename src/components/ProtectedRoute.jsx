import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ element }) {
  const [authState, setAuthState] = useState('checking'); // 'checking', 'authenticated', 'unauthenticated'

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        console.log('🔐 Starting authentication verification...');
        
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('📊 Verify endpoint response status:', response.status);
        
        const data = await response.json();
        console.log('📋 Verify endpoint response:', data);

        // Only accept 200 status with authenticated: true
        if (response.status === 200 && data.authenticated === true) {
          console.log('✅ User is authenticated');
          setAuthState('authenticated');
        } else {
          console.log('❌ Authentication failed - user not authorized');
          setAuthState('unauthenticated');
        }
      } catch (error) {
        console.error('⚠️ Error during authentication check:', error);
        setAuthState('unauthenticated');
      }
    };

    verifyAuthentication();
  }, []);

  // Still checking authentication
  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-chem-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Verifying access...</div>
          <div className="w-8 h-8 border-4 border-chem-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (authState === 'unauthenticated') {
    console.log('🚫 Redirecting unauthenticated user to login');
    return <Navigate to="/login" replace />;
  }

  // Authenticated - show the protected component
  console.log('🔓 Rendering protected component');
  return element;
}
