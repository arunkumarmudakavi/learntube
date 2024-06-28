import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import status from 'express-status-monitor'

const app = express();

app.use(status())

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import { userRouter } from "./routes/user.routes.js";
import { channelRouter } from "./routes/channel.routes.js";
import { adminRouter } from "./routes/admin.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
