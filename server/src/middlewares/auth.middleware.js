import { User } from "../models/user.model.js";
import { Channel } from "../models/channel.model.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import Jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) throw new ApiError(401, "Unauthorized reguest");

    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

const verifyChannelJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) throw new ApiError(401, "Unauthorized reguest");

    const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);

    const user = await Channel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { verifyJWT, verifyChannelJWT };
