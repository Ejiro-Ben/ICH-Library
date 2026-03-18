import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import Library from './LibraryPage/Library'
import PastQuestions from './PastQuestionsPage/PastQuestions'
import SearchResult from './LibraryPage/SearchResults'
import PastQuestionsSearchResult from './PastQuestionsPage/PastQuestionsSearchResult'
import Login from '../Views/Login.jsx'
import AdminBooks from './AdminPage/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/library' element={<Library />} />
            <Route path='/pastquestions' element={<PastQuestions />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/pastquestions/search' element={<PastQuestionsSearchResult />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<ProtectedRoute element={<AdminBooks />} />} />
        </Routes>
    )
  }

export default App