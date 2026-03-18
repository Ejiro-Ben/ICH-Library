import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProtectedRoute({ element }) {
  const [authState, setAuthState] = useState('checking'); // 'checking', 'authenticated', 'unauthenticated'

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        console.log('Starting authentication verification...');
        
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Verify endpoint response status:', response.status);
        
        const data = await response.json();
        console.log('Verify endpoint response:', data);

        // Strictly check: ONLY 200 status AND authenticated: true allows access
        if (response.status === 200 && data.authenticated === true) {
          console.log('User is authenticated - allowing access');
          setAuthState('authenticated');
        } else {
          console.log('Authentication failed - denying access');
          console.log('Status:', response.status, 'Authenticated:', data.authenticated);
          setAuthState('unauthenticated');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        console.error('Defaulting to unauthenticated due to error');
        setAuthState('unauthenticated');
      }
    };

    verifyAuthentication();
  }, []);

  console.log('ProtectedRoute current state:', authState);

  // While checking - show loading
  if (authState === 'checking') {
    console.log('🔄 Still checking authentication, showing loading screen');
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
    console.log(' User not authenticated - redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // Authenticated - show the protected component
  if (authState === 'authenticated') {
    console.log(' User authenticated - rendering protected component');
    return element;
  }

  // Fallback - should never reach here
  console.log(' Unexpected state, defaulting to login redirect');
  return <Navigate to="/login" replace />;
}
