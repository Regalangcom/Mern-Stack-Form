const EmployeeUser = require("../model/register")
const jwt = require("jsonwebtoken")



const refreshTokens = ( req , res ) => {
    
    const refreshToken = req.cookies.refreshToken;
    
        if (!refreshToken) return res.status(401)
    
    
        EmployeeUser.findOne({ refresh_Token: refreshToken })
        .then(result => {
                if (!result) return res.status(401)
    
    
                jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , (err , decode) => {
                    if (err) return res.status(403)                
    
                    const id = result.id
                    const name = result.name
                    const email = result.email
    
                    
                    const accessToken = jwt.sign({ id , name , email } , process.env.ACCESS_TOKEN_SECRET , {
                        expiresIn: "5m"
                    }) 
                    
                    
                    res.json({accessToken})
                })
        })
}


module.exports = { refreshTokens };