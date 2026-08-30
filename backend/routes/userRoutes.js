import express from "express";
import { deleteUser, getAllUsers, loginUser, registerUser, resetPassword, resetPasswordRequest, updateUser, userProfile } from "../controllers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js";
const userRouter = express.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.get("/user-profile/:id", isAuthenticatedUser, userProfile)
userRouter.get("/get-all-users", isAuthenticatedUser, isAdmin("admin"), getAllUsers);
userRouter.patch("/update-user/:id", isAuthenticatedUser, updateUser);
userRouter.delete("/delete-user/:id", isAuthenticatedUser, isAdmin("admin"), deleteUser)
userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.post("/reset-password/:token", resetPassword)
export default userRouter