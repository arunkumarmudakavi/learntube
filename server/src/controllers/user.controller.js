import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Likes } from "../models/likes.model.js";
import { Comment } from "../models/comment.model.js";
import { History } from "../models/history.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

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
  const { firstName, lastName, userName, email, mobileNumber, password } =
    req.body;
  // console.log(req.body);
  // validate - empty fields
  if (
    [firstName, lastName, userName, email, mobileNumber, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { userName }, { mobileNumber }],
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
    userName: userName?.toLowerCase(),
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

  const isPasswordValid = await user.isPasswordCorrect(password);

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

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

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

const likesOnVideo = asyncHandler(async (req, res) => {
  // get videoId from params
  const videoId = req.params;
  // console.log(videoId);

  try {
    // db check using videoId
    const video = await Video.findById(videoId);
    if (!video) throw new ApiError(404, "Video doesn't exists");

    // get userId
    const loggedInUser = req.user?._id;

    const existingLikeByUser = await Likes.findOne({
      likedBy: loggedInUser,
      videoId: video?._id,
    });

    // check whether the user already liked to the video
    if (existingLikeByUser) {
      await Likes.findByIdAndDelete(existingLikeByUser?._id);
      return res.status(200).json(new ApiResponse(200, false, "removed like"));
    }
    // if already liked delete the existing like or else create new like
    //return liked video
    else {
      const LikedVideo = await Likes.create({
        likedBy: loggedInUser,
        videoId: videoId,
      });
      // console.log(LikedVideo);
      return res
        .status(200)
        .json(new ApiResponse(200, LikedVideo, "video liked"));
    }
  } catch (error) {
    throw new ApiError(500, error, "something went wrong");
  }
});

const getAllLikes = asyncHandler(async (req, res) => {
  const videoId = req.params?._id;
// console.log(videoId);



  const likes = await Likes.aggregate([
    {
      $match: { $expr : { $eq: [ '$videoId' , { $toObjectId: videoId } ] } } 
      //  {
      //   videoId: videoId
      // }
    },
    {
      $group: {
        _id: "$videoId",
        quantity: {
          $sum: 1
        }
      }
    }
  ])

  console.log(likes[0].quantity);

  return res
  .status(200)
  .json(
    new ApiResponse(200, likes[0].quantity,"Likes fetched successfully")
  )
});

const commentsOnVideo = asyncHandler(async (req, res) => {
  const videoId = req.params?._id;
  const { content } = req.body;
  // console.log(videoId);
  const userName = req.user?.userName;
  const commentedBy = req.user?._id;
  // console.log(id);
  // console.log(commentedBy);

  if (!commentedBy) throw new ApiError(404, "User Id Not Found");

  if ([userName, videoId, content].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "Error occurred while adding comment to the video!"
    );
  }

  const comment = await Comment.create({
    commentedBy,
    userName,
    videoId,
    content,
  });

  if (!comment) throw new ApiError(404, "Comment Not Found!");

  return res
    .status(201)
    .json(new ApiResponse(200, comment, "Comment added successfully..."));
});

const getAllComments = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const videoId = req.params?._id;
  // console.log(videoId);

  if (!videoId) throw new ApiError(404, "Video Id Not Found!");

  const comments = await Comment.find({ videoId });

  // console.log(comments);
  if (!comments) throw new ApiError(404, "Comments not found");

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const storeHistory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const userId = req.user?._id;

  console.log(_id, " ", userId);

  if (!(_id || userId)) throw new ApiError(404, "video or user id not found!");

  const history = await History.create({
    videoId: _id,
    userId,
  });

  // console.log(history);

  return res
    .status(200)
    .json(new ApiResponse(200, history, "History stored successfully..."));
});

const getHistory = asyncHandler(async (req, res) => {
  // const videoId = req.params?._id;
  const userId = req.user?._id;
  // console.log(userId);
  const history = await History.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videoId",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $project: {
        "result.videoFile": 1,
        "result.thumbnail": 1,
        "result.title": 1,
      },
    },
  ]);

  // console.log(history);

  return res
    .status(200)
    .json(new ApiResponse(200, history, "History fetched successfully"));
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
  likesOnVideo,
  commentsOnVideo,
  getAllComments,
  getAllLikes,
  storeHistory,
  getHistory,
};
