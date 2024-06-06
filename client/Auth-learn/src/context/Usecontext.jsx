// import React, { createContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const AuthContext = createContext()


// export const AuthProvider = ( { children } ) => {
    
//     const navigate = useNavigate();

//     const [ user , setuser ] = useState("")
//     const [ message , setmessage ] = useState("")


//     const Login  = async ( { email , password } ) => {
//         try {
//             const response = await axios.post("http://localhost:4000/api/v1/users/login" , {
//                 email ,
//                 password
//             }) 
            
//             navigate("/dashboard")
//             setmessage(response.data.msg)
            

//         } catch (error) {
//             setmessage(error.response.data.msg)
//             console.log("error pak!" , error);
//         }
//     }


//     const Register = async ({ name , email , password , repassword }) => {

//         try {
//             const response = await axios.post("http://localhost:4000/api/v1/users/registrasi" , {
//                 name,
//                 email,
//                 password,
//                 repassword
//             }) 
//             navigate("/login")
//             setmessage(response.data.msg)

//         } catch (error) {
//             setmessage(error.response.data.msg)
//             console.log("error !" , error);
//         }
//     }



//     // const ResetPassword = async ( {} ) => {
//     //     try {
//     //         const response = await 
//     //     } catch (error) {
            
//     //     }
//     // }

// }

