import express from 'express';
import multer from 'multer';
import { supabase } from '../config/supabaseServerClient.js';

const router = express.Router();

// Handle preflight requests for all routes
router.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

//File restrictions + size limit (20mb)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, //20mb
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ]

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'))
    } else {
      cb(null, true)
    }
  }
})

// Admin Upload Past Questions Route
router.post('/upload-pastquestion', upload.single('file'), async (req, res) => {
  try {
    const {
      course_title,
      course_code,
      author,
      level,
      file_type
    } = req.body

    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Unique filename
    const fileName = `${Date.now()}-${file.originalname}`

    // Upload to pastquestions storage bucket
    const { error: uploadError } = await supabase.storage
    .from('pastquestions')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
    .from('pastquestions')
    .getPublicUrl(fileName)
    
    const fileUrl = publicUrlData?.publicUrl

    const { data, error } = await supabase
    .from('pastquestions')
    .insert([{
      course_title,
      course_code,
      author,
      level,
      file_type,
      file_name: fileName,
      file_url: fileUrl
    }])
    .select()

    if (error) throw error

    res.status(200).json({ message: 'Past question uploaded successfully', question: data[0] })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Admin Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const {
      course_title,
      course_code,
      author,
      level,
      category,
      file_type
    } = req.body

    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Unique filename
    const fileName = `${Date.now()}-${file.originalname}`

    // Upload to storage bucket
    const { error: uploadError } = await supabase.storage
    .from('books')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
    .from('books')
    .getPublicUrl(fileName)
    
    const fileUrl = publicUrlData?.publicUrl

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
    .select()

    if (error) throw error

    res.status(200).json({ message: 'File uploaded successfully', book: data[0] })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Search books endpoint
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.q || ''
    
    if (!searchQuery.trim()) {
      return res.json([])
    }

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`course_title.ilike.%${searchQuery}%,course_code.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Search past questions endpoint
router.get('/search-pastquestions', async (req, res) => {
  try {
    const searchQuery = req.query.q || ''
    
    if (!searchQuery.trim()) {
      return res.json([])
    }

    const { data, error } = await supabase
      .from('pastquestions')
      .select('*')
      .or(`course_title.ilike.%${searchQuery}%,course_code.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%,level.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all books
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all past questions
router.get('/pastquestions', async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('pastquestions')
    .select('*')
    .order('created_at', { ascending: false })

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// secure download route
router.get('/:id/download', async (req, res) => {
  try {
    const { id } = req.params

    const { data: book, error} = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single()

    if (error || !book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    // create signed url (valid 60 seconds)
    const { data, error: signedError } = await supabase.storage
    .from('books')
    .createSignedUrl(book.file_name, 60)

    if (signedError) throw signedError

    res.json({ url: data.signedUrl })

  } catch (err) {
    res.status(500).json({ error: err.message})
  }
})

// delete book

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params

    const { data: book, error} = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single()

    if (error || !book) {
      return res.status(404).json({ error: 'Book not found'})
    }

    // delete from storage
    await supabase.storage
    .from('books')
    .remove([book.file_name])

    //delete from DB
    await supabase
    .from('books')
    .delete()
    .eq('id', id)

    res.json({message: 'Deleted successfully'})

  } catch (err) {
    res.status(500).json({ error: err.message})
  }
})

// delete past question
router.delete('/pastquestions/:id', async (req, res) => {
  try{
    const { id } = req.params

    const { data: question, error} = await supabase
    .from('pastquestions')
    .select('*')
    .eq('id', id)
    .single()

    if (error || !question) {
      return res.status(404).json({ error: 'Past question not found'})
    }

    // delete from storage
    await supabase.storage
    .from('pastquestions')
    .remove([question.file_name])

    //delete from DB
    await supabase
    .from('pastquestions')
    .delete()
    .eq('id', id)

    res.json({message: 'Deleted successfully'})

  } catch (err) {
    res.status(500).json({ error: err.message})
  }
})

export default router