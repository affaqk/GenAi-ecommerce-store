import User from "../models/usersModels.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendMail.js";
import crypto from "crypto"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile} = req.body;
        if(!name || !email || !password || !profile){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
        const user = await User.create({
            name,email,password,profile
        });
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not created"
            })
        }

        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All input fields are required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        const isPasswordMatched = await user.comparePassword(password)

        if(!isPasswordMatched){
            return res.status(400).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }

        return res.status(200).json({
            success : true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(400).json({
                success : false,
                message : "Users not found"
            })
        }

        return res.status(200).json({
            success : true,
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body,{
            new : true,
            runValidators : true
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "User updated successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        let resetToken = user.resetPassword();
        await user.save();

        const resetPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `if you want to reset your password click on above link ${resetPasswordUrl}`;

        await sendEmail({
            email : user.email,
            subject : "Reset Password",
            message
        })

        return res.status(200).json({
            success : true,
            message : `Email sent successfully to ${user.email}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire : { $gt : Date.now()}
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid token or time has been expired"
            })
        }

        const { password, confirmPassword } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password doesnt match with each other"
            })
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

// const logoutUser = async (req, res) => {
//     try {
//         return res.cookies("null").json({
//             success : true,
//             message : "Loggedout successfully"
//         })
//     } catch (error) {
        
//     }
// }

// 9:54