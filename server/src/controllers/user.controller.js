import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generaterefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get details
  const { firstName, lastName, username, email, mobileNumber, password } =
    req.body;

  // validate - empty fields
  if (
    [firstName, lastName, username, email, mobileNumber, password].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }, { mobileNumber }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User already exists with this email or number or username"
    );
  }

  // create user object - create entry in db
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password,
    username: username?.toLowerCase(),
  });

  // remove password and refreshToken field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully..."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;

  if (!(email || userName))
    throw new ApiError(400, "username or email is required");

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) throw new ApiError(404, "User does not exists");

  const isPasswordValid = await User.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findOne(req.user).select(
    "-createdAt -updatedAt"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, currentUser, "user details fetched successfully")
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await User.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getVideos = asyncHandler(async (_, res) => {
  const videos = await Video.find();

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const getVideo = asyncHandler(async (req, res) => {
  const videoId = req.params._id;
  const video = await Video.findById(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

export {
  generateAccessAndRefreshTokens,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  getVideos,
  getVideo,
};
