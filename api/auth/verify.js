import jwt from 'jsonwebtoken';

function getCookie(name, cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = decodeURIComponent(value || '');
    return acc;
  }, {});
  return cookies[name] || null;
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from cookies header
    const cookieHeader = req.headers.cookie;
    console.log('Cookie header:', cookieHeader);
    
    const token = getCookie('token', cookieHeader);
    console.log('Token found:', !!token);
    
    if (!token || token === '') {
      console.log('No token found');
      return res.status(401).json({ error: 'Unauthorized - No token' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified for user:', decoded.id);
    
    return res.status(200).json({ authenticated: true, userId: decoded.id });
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Unauthorized - Token invalid' });
  }
}
