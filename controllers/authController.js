import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseServerClient.js';


const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

export default {
  login_get: (req, res) => {
    res.json({ message: 'Login GET endpoint' });
  },
  login_post: async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .single();
    
    if (!admin.data) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const adminData = admin.data;
    const passwordMatch = await bcryptjs.compare(password, adminData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(adminData.id);
    res.cookie('token', token, cookiesOptions);
    res.json({ message: 'Login successful', token });
  },

  verify_get: (req, res) => {
    try {
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(401).json({ authenticated: false, error: 'No token' });
      }

      jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ authenticated: true });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ authenticated: false, error: 'Invalid token' });
    }
  },

  admin_uploads_get: (req, res) => {
    res.json({ message: 'Admin uploads GET endpoint', user: req.user });
  }
};
