import { Router } from "express";
import * as userController from "../../controllers/v1/user.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const userRouter = Router();

// Public routes
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/refresh-token", userController.refreshAccessToken);

// Protected routes (after login)
userRouter.get("/profile", verifyJWT, userController.getProfile);
userRouter.put("/update-profile", verifyJWT, userController.updateProfile);
userRouter.post("/logout", verifyJWT, userController.logoutUser);
userRouter.post("/change-password", verifyJWT, userController.changePassword);

export default userRouter;