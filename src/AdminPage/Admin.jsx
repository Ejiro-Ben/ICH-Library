import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheckCircle, faTimesCircle, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../HomePage/NavBar';
import Footer from '../HomePage/Footer';
import { apiGet, apiPostFormData, apiDelete } from '../config/apiClient';

export default function AdminBooks() {
  const [formData, setFormData] = useState({
    course_title: '',
    course_code: '',
    author: '',
    level: '',
    category: '',
    file_type: '',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await apiGet('/books');
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.course_title || !formData.course_code || !formData.author || !formData.level || !formData.category || !formData.file_type || !formData.file) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData for multipart upload
      const uploadFormData = new FormData();
      uploadFormData.append('course_title', formData.course_title);
      uploadFormData.append('course_code', formData.course_code);
      uploadFormData.append('author', formData.author);
      uploadFormData.append('level', formData.level);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('file_type', formData.file_type);
      uploadFormData.append('file', formData.file);

      // Send to backend using apiClient
      await apiPostFormData('/books/upload', uploadFormData);

      // Success
      setMessage({ type: 'success', text: 'Material uploaded successfully!' });
      setFormData({
        course_title: '',
        course_code: '',
        author: '',
        level: '',
        category: '',
        file_type: '',
        file: null
      });

      // Reset file input
      document.getElementById('file-input').value = '';
      
      // Refresh books list
      await fetchBooks();

    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: error.message || 'Upload failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId, courseName) => {
    if (!window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      return;
    }

    try {
      await apiDelete(`/api/books/${bookId}`);

      setMessage({ type: 'success', text: 'Material deleted successfully!' });
      await fetchBooks();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: error.message || 'Delete failed. Please try again.' });
    }
  };

  const getFilteredBooks = () => {
    if (!searchQuery.trim()) {
      return books;
    }
    
    const query = searchQuery.toLowerCase();
    return books.filter(book => 
      book.course_title.toLowerCase().includes(query) ||
      book.course_code.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
    );
  };

  return (
    <>
      <NavBar />
      
      <div className="bg-chem-dark min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Upload Learning Material</h1>
          <p className="text-gray-400 mb-8">Add new course materials to the library</p>

          <div className="bg-chem-dark border border-chem-cyan/20 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Title Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Course Title</label>
                <input
                  type="text"
                  name="course_title"
                  value={formData.course_title}
                  onChange={handleInputChange}
                  placeholder="e.g., Chemistry 101"
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-chem-cyan"
                />
              </div>

              {/* Course Code Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Course Code</label>
                <input
                  type="text"
                  name="course_code"
                  value={formData.course_code}
                  onChange={handleInputChange}
                  placeholder="e.g., CHM-101"
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-chem-cyan"
                />
              </div>

              {/* Author Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="e.g., Dr. John Smith"
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-chem-cyan"
                />
              </div>

              {/* Level Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-chem-cyan"
                >
                  <option value="">Select Level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Category Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-chem-cyan"
                >
                  <option value="">Select Category</option>
                  <option value="Lecture Notes">Lecture Notes</option>
                  <option value="Textbook">Textbook</option>
                  <option value="Study Guide">Study Guide</option>
                  <option value="Practice Problems">Practice Problems</option>
                  <option value="Past Exams">Past Exams</option>
                  <option value="Video">Video</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* File Type Input */}
              <div>
                <label className="block text-white font-semibold mb-2">File Type</label>
                <select
                  name="file_type"
                  value={formData.file_type}
                  onChange={handleInputChange}
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-chem-cyan"
                >
                  <option value="">Select File Type</option>
                  <option value="PDF">PDF</option>
                  <option value="Word">Word Document</option>
                  <option value="PowerPoint">PowerPoint</option>
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* File Input */}
              <div>
                <label className="block text-white font-semibold mb-2">Choose File</label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                  className="w-full bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-chem-cyan file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-chem-cyan/20 file:text-chem-cyan file:cursor-pointer hover:file:bg-chem-cyan/30"
                />
                <p className="text-gray-400 text-sm mt-2">Supported: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Max 20MB)</p>
              </div>

              {/* File Name Display */}
              {formData.file && (
                <p className="text-chem-cyan text-sm">Selected: {formData.file.name}</p>
              )}

              {/* Message Display */}
              {message.text && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                    : 'bg-red-500/20 border border-red-500/50 text-red-400'
                }`}>
                  <FontAwesomeIcon 
                    icon={message.type === 'success' ? faCheckCircle : faTimesCircle} 
                  />
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  loading
                    ? 'bg-chem-cyan/50 text-gray-400 cursor-not-allowed'
                    : 'bg-chem-cyan text-black hover:bg-chem-cyan/90'
                }`}
              >
                <FontAwesomeIcon icon={faUpload} />
                {loading ? 'Uploading...' : 'Upload Material'}
              </button>
            </form>
          </div>
        </div>

        {/* Materials List Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Uploaded Materials</h2>

          {/* Search Section */}
          <div className="mb-6">
            <div className="relative w-full">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-400" 
              />
              <input 
                type="text"
                placeholder="Search by course code, title, author, or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-chem-dark text-white py-2.5 pl-10 pr-4 text-sm focus:border-chem-cyan focus:outline-none focus:ring-chem-cyan" 
              />
            </div>
          </div>
          
          {loadingBooks ? (
            <p className="text-gray-400">Loading materials...</p>
          ) : books.length === 0 ? (
            <p className="text-gray-400">No materials uploaded yet</p>
          ) : getFilteredBooks().length === 0 ? (
            <p className="text-gray-400">No materials found matching "{searchQuery}"</p>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm mb-4">Found {getFilteredBooks().length} of {books.length} materials</p>
              {getFilteredBooks().map((book) => (
                <div key={book.id} className="bg-chem-dark border border-chem-cyan/20 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{book.course_title}</h3>
                    <p className="text-gray-400 text-sm">{book.course_code} • {book.author} • {book.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(book.id, book.course_title)}
                    className="ml-4 bg-red-500/20 border border-red-500/50 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition"
                    title="Delete material"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}