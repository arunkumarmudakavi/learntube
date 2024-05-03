import { Router } from "express";
import {} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.route("/register").post();
adminRouter.route("/login").post();
adminRouter.route("/logout").post();
adminRouter.route("/refresh-token").post();
adminRouter.route("/profile").get();
adminRouter.route("/changePassword").post();
adminRouter.route("/videos").get();
adminRouter.route("/videos/:_id").get();

export { adminRouter };