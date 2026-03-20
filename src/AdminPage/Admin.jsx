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
    file: null,
    material_type: 'book' // 'book' or 'pastquestion'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('book'); // 'book' or 'pastquestion'

  // Fetch materials on component mount and when viewType changes
  useEffect(() => {
    fetchMaterials();
  }, [viewType]);

  const fetchMaterials = async () => {
    setLoadingBooks(true);
    try {
      const endpoint = viewType === 'pastquestion' ? '/books/pastquestions' : '/books';
      console.log('Fetching from endpoint:', endpoint, 'ViewType:', viewType);
      const data = await apiGet(endpoint);
      console.log('Fetched data:', data);
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setMessage({ type: 'error', text: 'Error fetching materials' });
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
    if (formData.material_type === 'pastquestion') {
      if (!formData.course_title || !formData.course_code || !formData.author || !formData.level || !formData.file_type || !formData.file) {
        setMessage({ type: 'error', text: 'Please fill in all fields for past questions' });
        return;
      }
    } else {
      if (!formData.course_title || !formData.course_code || !formData.author || !formData.level || !formData.category || !formData.file_type || !formData.file) {
        setMessage({ type: 'error', text: 'Please fill in all fields' });
        return;
      }
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
      uploadFormData.append('file_type', formData.file_type);
      uploadFormData.append('material_type', formData.material_type);
      uploadFormData.append('file', formData.file);
      
      // Only add category for books
      if (formData.material_type === 'book') {
        uploadFormData.append('category', formData.category);
      }

      // Send to appropriate endpoint
      const endpoint = formData.material_type === 'pastquestion' ? '/books/upload-pastquestion' : '/books/upload';
      await apiPostFormData(endpoint, uploadFormData);

      // Success
      setMessage({ type: 'success', text: `${formData.material_type === 'pastquestion' ? 'Past Question' : 'Material'} uploaded successfully!` });
      setFormData({
        course_title: '',
        course_code: '',
        author: '',
        level: '',
        category: '',
        file_type: '',
        file: null,
        material_type: 'book'
      });

      // Reset file input
      document.getElementById('file-input').value = '';
      
      // Refresh materials list
      await fetchMaterials();

    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: error.message || 'Upload failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (materialId, courseName) => {
    if (!window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      return;
    }

    try {
      const endpoint = viewType === 'pastquestion' 
        ? `/books/pastquestions/${materialId}` 
        : `/books/${materialId}`;
      await apiDelete(endpoint);

      setMessage({ type: 'success', text: 'Material deleted successfully!' });
      await fetchMaterials();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: error.message || 'Delete failed. Please try again.' });
    }
  };

  const getFilteredMaterials = () => {
    if (!searchQuery.trim()) {
      return books;
    }
    
    const query = searchQuery.toLowerCase();
    if (viewType === 'pastquestion') {
      return books.filter(item => 
        item.course_title.toLowerCase().includes(query) ||
        item.course_code.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.level.toLowerCase().includes(query)
      );
    } else {
      return books.filter(item => 
        item.course_title.toLowerCase().includes(query) ||
        item.course_code.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
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
              {/* Material Type Selector */}
              <div>
                <label className="block text-white font-semibold mb-2">Material Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="material_type"
                      value="book"
                      checked={formData.material_type === 'book'}
                      onChange={handleInputChange}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white">Book/Notes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="material_type"
                      value="pastquestion"
                      checked={formData.material_type === 'pastquestion'}
                      onChange={handleInputChange}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-white">Past Question</span>
                  </label>
                </div>
              </div>

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

              {/* Category Input - Only show for Books */}
              {formData.material_type === 'book' && (
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
                    <option value="Video">Video</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

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

          {/* View Type Selector */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">View Materials</label>
            <select
              value={viewType}
              onChange={(e) => {
                setViewType(e.target.value);
                setSearchQuery('');
              }}
              className="w-48 bg-chem-dark border border-chem-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-chem-cyan"
            >
              <option value="book">Books & Notes</option>
              <option value="pastquestion">Past Questions</option>
            </select>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <div className="relative w-full">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-slate-400" 
              />
              <input 
                type="text"
                placeholder={viewType === 'pastquestion' ? "Search by course code, title, author, or level..." : "Search by course code, title, author, or category..."} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-chem-dark text-white py-2.5 pl-10 pr-4 text-sm focus:border-chem-cyan focus:outline-none focus:ring-chem-cyan" 
              />
            </div>
          </div>
          
          {loadingBooks ? (
            <p className="text-gray-400">Loading materials...</p>
          ) : books.length === 0 ? (
            <p className="text-gray-400">No {viewType === 'pastquestion' ? 'past questions' : 'books and notes'} uploaded yet</p>
          ) : getFilteredMaterials().length === 0 ? (
            <p className="text-gray-400">No materials found matching "{searchQuery}"</p>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm mb-4">Found {getFilteredMaterials().length} of {books.length} materials</p>
              {getFilteredMaterials().map((item) => (
                <div key={item.id} className="bg-chem-dark border border-chem-cyan/20 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.course_title}</h3>
                    <p className="text-gray-400 text-sm">
                      {item.course_code} • {item.author} • {viewType === 'pastquestion' ? item.level : item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id, item.course_title)}
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