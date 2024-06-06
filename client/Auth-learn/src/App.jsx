// import './App.css'
import SignUp from '@eli/components/Signup'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from '@eli/components/Login.jsx'
import Dashboard from '@eli/components/Dashboard.jsx'
import ResetPassword from '@eli/components/resetPassword.jsx'
function App() {


  return (
    <>
      <BrowserRouter>
      <div>
      <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetPassword' element={< ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </div>
      </BrowserRouter>

    </>
  )
}

export default App
