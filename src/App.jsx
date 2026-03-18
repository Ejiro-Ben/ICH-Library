import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import Library from './LibraryPage/Library'
import SearchResult from './LibraryPage/SearchResults'
import Login from '../Views/Login.jsx'
import AdminBooks from './AdminPage/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<ProtectedRoute element={<AdminBooks />} />} />
        </Routes>
    )
  }

export default App