import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOncCloudinary } from "../utils/cloudinaryService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not all empty
  // check if user already exists: username or email;
  // check for images , check for avatar;
  // upload avtara to cloudinary,avatar;
  // create user object - create etery in db;
  // remove password and refres token from user object
  // check for user creation
  // return response;

  const { fullName, email, userName, password } = req.body;
  if (
    [fullName, email, userName, password].some((filed) => filed.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImagePath[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOncCloudinary(avatarLocalPath);
  const coverImage = await uploadOncCloudinary(coverImagePath);
  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }
  const user = User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while checking user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
