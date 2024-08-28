import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getVideo,
  getVideos,
  changePassword,
  refreshAccessToken,
  likesOnVideo,
  commentsOnVideo,
  getAllComments,
  getAllLikes,
  storeHistory,
  getHistory,
  removeFromHistory,
  searchVideo,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { Likes } from "../models/likes.model.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/profile").get(verifyJWT, getCurrentUser);
userRouter.route("/changePassword").post(verifyJWT, changePassword);

userRouter.route("/videos").get(verifyJWT, getVideos);
userRouter.route("/videos/:_id").get(verifyJWT, getVideo);

userRouter.route("/likes/:_id").post(verifyJWT, likesOnVideo);
userRouter.route("/likes/:_id").get(verifyJWT, getAllLikes);

userRouter.route("/comments/:_id").put(verifyJWT, commentsOnVideo);
userRouter.route("/comments/:_id").get(verifyJWT, getAllComments);
userRouter.route("/history/:_id").post(verifyJWT, storeHistory);
userRouter.route("/history").get(verifyJWT, getHistory);
userRouter.route("/history").delete(verifyJWT, removeFromHistory);

userRouter.route("/:key").get(verifyJWT, searchVideo)

export { userRouter };
