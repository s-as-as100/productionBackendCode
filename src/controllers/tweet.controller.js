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
  
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
