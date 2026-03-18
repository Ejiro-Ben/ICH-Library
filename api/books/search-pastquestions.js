import { supabase } from '../../config/supabaseServerClient.js';

/**
 * GET /api/books/search-pastquestions
 * Search for past questions by course title, code, author, or level
 */
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const searchQuery = req.query.q || '';

    if (!searchQuery.trim()) {
      return res.json([]);
    }

    const { data, error } = await supabase
      .from('pastquestions')
      .select('*')
      .or(`course_title.ilike.%${searchQuery}%,course_code.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,level.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
}
