import { supabase } from '../../config/supabaseServerClient.js';

/**
 * GET /api/books/search?q=<query>
 * Search books by title, code, author, or category
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

    console.log(`Searching for: "${searchQuery}"`);

    if (!searchQuery.trim()) {
      console.log('Empty search query, returning empty array');
      return res.json([]);
    }

    // Search across multiple fields using Supabase's full-text search
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`course_title.ilike.%${searchQuery}%,course_code.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    console.log(`Found ${data.length} results`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Search Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
