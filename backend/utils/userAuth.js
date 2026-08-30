// protected routes
// role based access

import jwt from "jsonwebtoken"
import User from "../models/usersModels.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                success : false,
                message : "Plz Login first"
            })
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decodedData.id)
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            error
        })
    }
}

// ["admin"], ["manager"], ["doctor"], ["patient"], ["user"], ["owner"]
export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success : false,
                message : "You are not authorised to access this route"
            })
        }
        next()
    }
}
