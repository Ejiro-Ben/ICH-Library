import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import Library from './LibraryPage/Library'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/library' element={<Library />} />
    </Routes>
  )
}

export default App
