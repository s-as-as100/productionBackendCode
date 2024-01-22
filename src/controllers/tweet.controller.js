import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
// import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //1. get content from user
  //2. find user id
  //3. check tweet is available or not
  //4. create tweet {owner , content}
  try {
    const { content } = req.body;
    const userId = req.user._id;
    if (!content) {
      throw new ApiError(404, "tweet content cannot be empty");
    }
    const createTweet = await Tweet.create({
      owner: userId,
      content,
    });

    if (!createTweet) {
      throw new ApiError(500, "Error occurred creating tweet");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { createTweet }, "Tweet created successfully")
      );
  } catch (error) {
    throw new ApiError(400, error.message || "Error during creating tweet   ");
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  // get user tweets

  try {
    // 1. find user id
    // 2. check if userId present or not
    // 3.  find in the database
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "you don't have access to get user tweets");
    }

    const allUserTweets = await Tweet.findOne({
      owner: new mongoose.Types.ObjectId(userId),
    });
    if (!allUserTweets) {
      throw new ApiError(500, "Something went wrong");
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          allUserTweets,
        },
        "tweets fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(400, error.message || "Error during get user tweets");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  //update tweet
  // 1. find user id
  // 2. get comment id and content
  // 3. user id present or not present
  // 4.
  try {
    const userId = req.user._id;
    const { commentId } = req.params;
    const { content } = req.body;
    if (!userId) {
      throw new ApiError(401, "you don't have access to get user tweets");
    }
    const ownerDetails = await Tweet.findOne({
      owner: new mongoose.Types.ObjectId(userId),
    }).select("-content");
    if (!ownerDetails) throw new ApiError(401, "User not found");
    const updateTweet = await Tweet.updateOne(
      {
        _id: commentId,
      },
      {
        $set: {
          content: content,
        },
      }
    );
    if (!updateTweet) {
      throw new ApiError(500, "Twwet not updated");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          updateTweet,
        },
        "successfully updated"
      )
    );
  } catch (error) {
    throw new ApiError(400, error.message || "Error during update user tweets");
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  //delete tweet
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const ownerDetails = await Tweet.findOne({
      owner: new mongoose.Types.ObjectId(userId),
    }).select("-content");
    if (!ownerDetails) throw new ApiError(401, "not authentic");
    const deleteTweet = await Tweet.findByIdAndDelete(commentId);
    if (!deleteTweet) throw new ApiError(500, "unable to delete tweet");

    return res.status(200).json(new ApiResponse(200, { deleteTweet }, "Succe"));
  } catch (error) {
    throw new ApiError(401, e.message || "Some error occurred");
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
