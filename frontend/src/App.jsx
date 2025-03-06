import { BrowserRouter , Routes, Route } from 'react-router-dom'
import RegisterForm from './components/Register'
import LoginForm from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterForm/>}/> 
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/add" element={<AddUser/>}/>
          <Route path="/edit/:id" element={<EditUser/>}/>   */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
