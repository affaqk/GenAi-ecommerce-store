import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        min : [3, "You have to pass atleast 3 characters in name"],
        max : [12, "You are allowed to pass only 12 characters"]
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    profile : {
        type : String,
        required : true
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
},{
    timestamps : true
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return 
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJWT = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET,{expiresIn : "7d"})
}

userSchema.methods.resetPassword = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 ;
    // 10:24
    return resetToken
}

const User = mongoose.model("User", userSchema);
export default User



// 12345689868 => 365cdgfhif9)&*&(&*) => *&6746vgxsfsf356758798o76e75erf