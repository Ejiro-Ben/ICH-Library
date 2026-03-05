import { supabase } from '../../../config/supabaseServerClient.js';

/**
 * GET /api/books/[id]/download
 * Get a signed URL to download a book file
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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    console.log(`Generating download URL for book: ${id}`);

    // Fetch the book
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    console.log(`Book found, generating signed URL for file: ${book.file_name}`);

    // Create signed URL (valid for 60 seconds)
    const { data, error: signedError } = await supabase.storage
      .from('books')
      .createSignedUrl(book.file_name, 60);

    if (signedError) throw signedError;

    console.log('Signed URL created successfully');
    return res.status(200).json({ url: data.signedUrl });
  } catch (error) {
    console.error('Download Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
