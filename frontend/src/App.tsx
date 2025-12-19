import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Feed from './components/Feed'
import Profile from './components/Profile'
import WriteBlog from './components/WriteBlog'
import ReadBlog from './components/ReadBlog'
import Landing from './components/Landing'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/feed' element={<Feed/>}/>
    <Route path='/profile' element = {<Profile/>}/>
    <Route path='/new-post' element = {<WriteBlog/>}/>
    <Route path='/' element={<Landing/>}/>
    <Route path='/blog/:id' element={<ReadBlog/>}/>
    <Route path ='/blog' element={<Feed/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
