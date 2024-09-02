import { Router } from "express";
import {
  registerChannel,
  loginChannel,
  logoutChannel,
  getChannelDetails,
  changePassword,
  refreshAccessToken,
  uploadVideo,
  changeAvatar,
  getOwnVideos,
  getVideo,
  getAllComments,
  commentsOnVideoByChannel,
  searchVideoFromChannel,
} from "../controllers/channel.controller.js";
import { verifyChannelJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const channelRouter = Router();

channelRouter.route("/register-channel").post(registerChannel);
channelRouter.route("/login-channel").post(loginChannel);
channelRouter.route("/logout-channel").post(verifyChannelJWT, logoutChannel);
channelRouter.route("/refresh-token").post(refreshAccessToken);
channelRouter
  .route("/channel-profile")
  .get(verifyChannelJWT, getChannelDetails);
channelRouter.route("/changePassword").post(verifyChannelJWT, changePassword);
channelRouter.route("/uploadVideo").post(
  verifyChannelJWT,
  upload.any([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadVideo
);
// channelRouter.route("/videos/:_id").get(verifyChannelJWT);
channelRouter
  .route("/avatar")
  .patch(verifyChannelJWT, upload.single("avatar"), changeAvatar);

channelRouter.route("/home").get(verifyChannelJWT, getOwnVideos);
channelRouter.route("/videos/:_id").get(verifyChannelJWT, getVideo);
channelRouter.route("/comments/:_id").get(verifyChannelJWT, getAllComments);
channelRouter
  .route("/comments/:_id")
  .post(verifyChannelJWT, commentsOnVideoByChannel);

channelRouter.route("/:key").get(verifyChannelJWT, searchVideoFromChannel)

export { channelRouter };
