import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import Library from './LibraryPage/Library'
import AdminBooks from './AdminPage/Admin.jsx'
import SearchResult from './LibraryPage/SearchResults'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/admin/upload' element={<AdminBooks />} />
            <Route path='/search' element={<SearchResult />} />
        </Routes>
    )
  }

export default App