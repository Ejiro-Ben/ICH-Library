import multer from 'multer';
import { supabase } from '../../config/supabaseServerClient.js';

// Configure multer for serverless (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'));
    } else {
      cb(null, true);
    }
  },
});

// Helper to run middleware in serverless
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

/**
 * POST /api/books/upload - Upload a book/material
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

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Run multer middleware
    await runMiddleware(req, res, upload.single('file'));

    const {
      course_title,
      course_code,
      author,
      level,
      category,
      file_type
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Unique filename
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload to books storage bucket
    const { error: uploadError } = await supabase.storage
      .from('books')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from('books')
      .getPublicUrl(fileName);
    
    const fileUrl = publicUrlData?.publicUrl;

    // Insert metadata into database
    const { data, error } = await supabase
      .from('books')
      .insert([{
        course_title,
        course_code,
        author,
        level,
        category,
        file_type,
        file_name: fileName,
        file_url: fileUrl
      }])
      .select();

    if (error) throw error;

    res.status(200).json({ message: 'Book uploaded successfully', book: data[0] });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
}
