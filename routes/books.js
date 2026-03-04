import express from 'express';
import multer from 'multer';
import { supabase } from '../config/supabaseServerClient.js';

const router = express.Router();

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

    res.json({message: 'Deleta successfully'})

  } catch (err) {
    res.status(500),json({ error: err.message})
  }
})

export default router