const EmployeeUser = require("../model/register.js");
const OtpSchema    = require("../model/Otp.js");
const bcrypt       = require("bcrypt");
const jwt          = require("jsonwebtoken");
const nodemailer   = require("nodemailer");
const randomize    = require("randomatic");



// sent otp email







const RegisterUser =  async ( req , res ) => {
    const { name , email , password , repassword , otp } = req.body;

    // create regex 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    if (!emailRegex.test(email)) {
        res.status(400).json({ Message: "Invalid email" })
        return 
    }

    if (password !== repassword) {
        res.status(400).json({Message : "password dan confirm password tidak cocok!"})
        return
    }


    try {
        const existingUser = await EmployeeUser.findOne({ email : email })

        if (existingUser) return res.status(200).json({Message : "email already registered"})



// =======================================CREATE HASH PASSWORD=======================================================================
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const EmployesRegis = new EmployeeUser ({
            name : name, 
            email : email,
            password : hashedPassword,
            refresh_Token  : null,
            otp : otp
        }) 
        await EmployesRegis.save()

        

        res.status(200).json({ Message : "Register successfully"  , data : { name , email } })

    } catch (error) {
        res.status(500).json({ Message : "internal server error", error })        
        return
    }
}




const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await EmployeeUser.findOne({ otp });

        if (!user) {
            return res.status(404).json({ Message: "OTP not found!" });
        }

        const accessToken = jwt.sign({ id: user._id, Name: user.name, Email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });

        user.otp = "";
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
            secure: true, 
            sameSite: "none" 
        });

        return res.status(200).json({ Message: "OTP successfully verified", Login: true , accessToken : accessToken});
    } catch (error) {
        console.error('Error during OTP verification:', error.message);
        return res.status(500).json({ Message: 'An error occurred during OTP verification' });
    }
}


// 
const SendOtpEmail = async (email , otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass:  process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP",
            text: `Your OTP is ${otp}`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(info.response);

    } catch (error) {
        console.log(error);
    }
}



const LoginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email && !password) {
            return res.status(400).json({ Message: "tidak boleh kosong" });
        }

        const checkDataUsers = await EmployeeUser.findOne({ email: email });

        if (!checkDataUsers) {
            return res.status(404).json({ Message: "email is not found" });
        }

        const match = await bcrypt.compare(password, checkDataUsers.password);

        if (!match) {
            return res.status(400).json({ Message: "Wrong password !" });
        }

        const id = checkDataUsers._id;
        const Name = checkDataUsers.name;
        const Email = checkDataUsers.email;

        const accessToken = jwt.sign({ id, Name, Email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });


        const refresh_Token = jwt.sign({ id, Name, Email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });

        await EmployeeUser.updateOne({ _id: id }, { $set: { refresh_Token: refresh_Token } });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000 ,
            secure: true,
            sameSite: "none"
        });

        res.cookie('refreshToken', refresh_Token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none"
        });


        const otp = randomize("0", 6);
        checkDataUsers.otp = otp;

        await checkDataUsers.save();

        await SendOtpEmail(email, otp);

        return res.status(200).json({
         
            Login: true,
            accessToken,
            Message: "OTP sent to email",
            // success: false
        });

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ msg: "Internal server error", error });
    }
}



 


const resetPassword = async (req, res) => {
        
    const { email , newPassword , confirmPassword } = req.body

    if (!email || !newPassword || !confirmPassword) {
        res.status(400).json({ Message : "colom input tidak boleh kosong!"})
        return
    }

    if (newPassword !== confirmPassword) {
        res.status(400).json({ Message : "password dan confirm password tidak cocok!"})
        return
    }

    try {
        const users = await EmployeeUser.
                                        findOne({ email })


        if (!users) return res.status(404).json( { Message : "Email is not found" } )

        // const saltNumber = 10;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword , salt)


        users.password = hashedPassword;
        await users.save()

        res.status(200).json({ Message : "password reset successfully"})
        return 
    } catch (error) {
        res.status(500).json({ Message : "internal server error"})
        return 
    }

};





const logout = ( req , res ) => {

    const refreshToken = req.cookies.refreshToken;


    if (!refreshToken) return res.status(204)


    EmployeeUser.find({
        refresh_Token : refreshToken
    })
    .then(result => {
        if (!result) return res.status(204)
        const id = result._id

        EmployeeUser.updateOne({_id : id }, { $set : {refresh_Token : ""}})
        .then(() => {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            res.status(200).json({
                Logout : true,
                Message: "Berhasil Logout!"
            })
        })
        .catch(() => {
            res.status(400).json({
                Logout : false,
                Message: "Gagal Logout!"
            })
        })
    })
}









module.exports = { RegisterUser  , LoginUsers , logout , resetPassword , verifyOtp }





