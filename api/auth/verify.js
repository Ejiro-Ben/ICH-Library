import jwt from 'jsonwebtoken';

function getCookie(name, cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
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
    const token = getCookie('token', cookieHeader);
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET);
    
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
