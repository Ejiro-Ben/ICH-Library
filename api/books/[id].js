import { supabase } from '../../config/supabaseServerClient.js';

/**
 * DELETE /api/books/[id]
 * Delete a book by ID (removes file from storage and record from database)
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

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Book ID is required' });
    }

    console.log(`Deleting book with ID: ${id}`);

    // Fetch the book to get file_name
    const { data: book, error: fetchError } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    console.log(`Found book, deleting file: ${book.file_name}`);

    // Delete from storage
    await supabase.storage.from('books').remove([book.file_name]);

    // Delete from database
    const { error: deleteError } = await supabase.from('books').delete().eq('id', id);

    if (deleteError) throw deleteError;

    console.log('Book deleted successfully');
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
