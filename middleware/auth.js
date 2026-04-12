import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseServerClient.js';

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        // Also check for Authorization header
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: admin, error } = await supabase
            .from('admin')
            .select('*')
            .eq('id', decoded.id)
            .single();
        
        if (error || !admin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = admin;
        next();

    } catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export default authMiddleware;