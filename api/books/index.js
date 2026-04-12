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
 * GET /api/books - Fetch all books
 * POST /api/books - Upload a new book
 */
export default async function handler(req, res) {
  // Enable CORS (allow requests from frontend)
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

  try {
    // GET: Fetch all books
    if (req.method === 'GET') {
//  console.log('Fetching all books from Supabase...');
      
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

//      console.log(`Found ${data.length} books`);
      return res.status(200).json(data);
    }

    // POST: Upload a new book
    if (req.method === 'POST') {
//      console.log('Processing file upload...');
      
      // Parse multipart form data
      await runMiddleware(req, res, upload.single('file'));

      const { course_title, course_code, author, level, category, file_type } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

//      console.log(`Uploading file: ${file.originalname}`);

      // Create unique filename
      const fileName = `${Date.now()}-${file.originalname}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('books')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('books').getPublicUrl(fileName);
      const fileUrl = publicUrlData?.publicUrl;

      console.log(`File uploaded. URL: ${fileUrl}`);

      // Insert into database
      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            course_title,
            course_code,
            author,
            level,
            category,
            file_type,
            file_name: fileName,
            file_url: fileUrl,
          },
        ])
        .select();

      if (error) throw error;

      console.log('Book record created in database');
      return res.status(200).json({ message: 'File uploaded successfully', book: data[0] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
