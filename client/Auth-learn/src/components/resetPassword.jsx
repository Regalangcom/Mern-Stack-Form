import React , {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '@eli/style/Resetpassword.css'

const ResetPassword = () => {
    const [email , setEmail] = useState("")
    const [newPassword , setnewPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [message , setMessage] = useState("")
    

    const navigate = useNavigate()

    const handleResetPassword =  async (e) => {
        e.preventDefault()
        // const emailRegex = /^(?![^<>&"']+$)[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // setEmail(emailRegex)

        try {
          const response =  await axios.put(`${import.meta.env.VITE_PORT_LOCAL}/resetPassword` , { email , newPassword , confirmPassword })
            setEmail("")
            setnewPassword("")
            setConfirmPassword("")  
            setMessage(response.data.Message)
            navigate('/login')
        } catch (error) {
            console.log(error);
            setMessage(error.response.data.Message)
        }

    }


  return (
    <div className="reset-password-container">
    <h2>Reset Password</h2>
    <form onSubmit={handleResetPassword} className="reset-password-form">
      <div className="form-group">
        <label htmlFor="email"><strong>Email</strong></label>
        <input
          type="email"
          placeholder=""
          name="email"
          maxLength="25"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"><strong>New Password</strong></label>
        <input
          type="password"
          placeholder=""
          name="password"
          maxLength="25"
          onChange={(e) => setNewPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password"><strong>Confirm Password</strong></label>
        <input
          type="password"
          placeholder=""
          name="password"
          maxLength="25"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="submit-button">Reset Password</button>
      {message && <p className="message">{message}</p>}
    </form>
  </div>
  )
}

export default ResetPassword
