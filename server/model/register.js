const mongoose = require("mongoose")
const Schema = mongoose.Schema



const EmployeeUser = new Schema ({
    name : {
            type : String,
            required: true,
    } ,
    email : {
            type : String,
            unique : true,
    },
    password : {
            type : String,
            required: true,
    },
    otp: {
        type: String, 
        default: "", 
        required: false 
    },
    refresh_Token : {
            type : String,
            required: false,
    }
} , {
    timestamps : true
} , {
        toJSON : true,
        transform( doc , ret ) {
                delete ret.__v,
                ret.id = ret._id
                delete ret._id
        }
}) 




const RegisUser = mongoose.model("employeUser" , EmployeeUser)

module.exports = RegisUser;

