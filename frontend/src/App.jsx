import { BrowserRouter , Routes, Route } from 'react-router-dom'
import RegisterForm from './components/Register'
import LoginForm from './components/Login'
import Dashboard from './components/Dashboard'
import AddCaketwaForm from './components/AddCaketwa'
import EditCaketwaForm from './components/EditCaketwa'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterForm/>}/> 
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/add" element={<AddCaketwaForm/>}/>
          <Route path="/edit/:id" element={<EditCaketwaForm/>}/>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
