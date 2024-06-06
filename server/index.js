const dotenv = require("dotenv")
dotenv.config();

const express       = require("express")
const cors          = require("cors")
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser");
const cookieParser   = require("cookie-parser")
const app = express();


// const ApiServer = process.env.DEV ? process.env.PORT : "http://localhost:8000";



// if (process.env.mode.Dev) {
//     console.log("dalam mode pengembangan");
// } else {
//     console.log("dalam mode productsi");
// }




app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())




// Route import 

const RegisterUsers = require("./router/UserRouter");




// Route check ENDPOINT

app.use("/api/v1/users" , RegisterUsers)








mongoose.connect( process.env.MONGODB_LOCAL_PORT ).then(() => {
    console.log("mongodb connect");
    app.listen(process.env.PORT, (req , res) => {
        console.log(`server running in port ${process.env.PORT}....`);
    })
})
.catch((err) => console.log(err))

