import { Router } from "express";
import {} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post();
userRouter.route("/login").post();
userRouter.route("/logout").post();
userRouter.route("/refresh-token").post();
userRouter.route("/profile").get();
userRouter.route("/changePassword").post();
userRouter.route("/videos").get();
userRouter.route("/videos/:_id").get();

export { userRouter };
