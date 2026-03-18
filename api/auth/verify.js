import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from cookies header
    const cookieHeader = req.headers.cookie;
    
    if (!cookieHeader) {
      console.log('No cookie header found');
      return res.status(401).json({ authenticated: false, error: 'No authentication token' });
    }

    // Parse cookies manually
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    const token = cookies.token;

    if (!token || token === '' || token === 'undefined') {
      console.log('Token missing or invalid:', token);
      return res.status(401).json({ authenticated: false, error: 'No valid token' });
    }

    try {
      // Verify the token - this will throw if invalid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified successfully for admin ID:', decoded.id);
      
      return res.status(200).json({ authenticated: true, userId: decoded.id });
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      return res.status(401).json({ authenticated: false, error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Verification error:', error.message);
    return res.status(401).json({ authenticated: false, error: 'Unauthorized' });
  }
}
