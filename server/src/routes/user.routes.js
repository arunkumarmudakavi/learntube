import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getVideo,
  getVideos,
  changePassword,
  refreshAccessToken
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/profile").get(verifyJWT, getCurrentUser);
userRouter.route("/changePassword").post(verifyJWT, changePassword);
userRouter.route("/videos").get(getVideos);
userRouter.route("/videos/:_id").get(getVideo);

export { userRouter };
