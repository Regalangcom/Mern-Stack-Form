const express = require("express")
const route = express.Router()
const jwt  = require("jsonwebtoken")


const { RegisterUser , LoginUsers  , logout , resetPassword , verifyOtp  } = require("../controller/UserController")
const { refreshTokens } = require("../controller/refresh_Token") 

// const verifyToken = ( req , res , next ) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if(token == null) return res.status(401).json({Message : "forbidden guys"});
    
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//         if(err) return res.status(403);
//         req.email = decoded.email;
//         next();
//     })
// } 


const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ Message : "Unauthorized" }); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (token) return res.status(200).json({ Message : "Welcome "})
        if (err) return res.status(403).json({ Message : "forbiden "}); // Forbidden

        req.user = user;
        next();
    });
};

module.exports = verifyToken;


route.post('/registrasi' , RegisterUser)
route.post('/login' , LoginUsers)
route.post('/verify-otp'  ,  verifyOtp)
route.delete('/logout' , logout)
route.put('/resetPassword' , resetPassword)
route.get('/refreshToken' ,  refreshTokens )


route.get("/dashboard" ,  verifyToken , ( req , res ) => {
    res.json({Message : "welcome to dashboard" , user : "galang" })
})



module.exports = route