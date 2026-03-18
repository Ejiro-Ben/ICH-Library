import { supabase } from '../../../config/supabaseServerClient.js';

/**
 * DELETE /api/books/pastquestions/[id]
 * Delete a past question by ID (removes file from storage and record from database)
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
      return res.status(400).json({ error: 'Question ID is required' });
    }

    console.log(`Deleting past question with ID: ${id}`);

    // Fetch the question to get file_name
    const { data: question, error: fetchError } = await supabase
      .from('pastquestions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !question) {
      return res.status(404).json({ error: 'Past question not found' });
    }

    console.log(`Found past question, deleting file: ${question.file_name}`);

    // Delete from storage
    await supabase.storage.from('pastquestions').remove([question.file_name]);

    console.log('File deleted from storage, now deleting from database');

    // Delete from database
    const { error: deleteError } = await supabase
      .from('pastquestions')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    console.log('Past question deleted successfully');
    return res.status(200).json({ message: 'Past question deleted successfully' });
  } catch (error) {
    console.error('Error deleting past question:', error);
    return res.status(500).json({ error: error.message });
  }
}
