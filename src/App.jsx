import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import Library from './LibraryPage/Library'
import AdminBooks from './AdminPage/Admin.jsx'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/admin/upload' element={<AdminBooks />} />
        </Routes>
    )
  }

export default App