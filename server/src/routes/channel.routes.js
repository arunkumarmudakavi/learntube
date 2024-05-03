import { Router } from "express";
import {} from "../controllers/channel.controller.js";
import { upload } from "../middlewares/multer.middleware.js"

const channelRouter = Router();

channelRouter.route("/register-channel").post();
channelRouter.route("/login-channel").post();
channelRouter.route("/logout-channel").post();
channelRouter.route("/refresh-token").post();
channelRouter.route("/channel-profile").get();
channelRouter.route("/changePassword").post();
channelRouter.route("/uploadVideo").post();
channelRouter.route("/videos/:_id").get();
channelRouter.route("/avatar").patch();

export { channelRouter };
