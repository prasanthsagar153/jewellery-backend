import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

/**
 * @desc Register a new user
 */
const registerUser = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;

  if ([userName, fullName, email, password].some(f => f?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName: userName.trim().toLowerCase() }, { email: email.trim().toLowerCase() }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    userName: userName.trim().toLowerCase(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    password
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while User Registration");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

/**
 * @desc Login a user
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json(new ApiResponse(200, { accessToken }, "Login successful"));
});

/**
 * @desc Logout a user
 */
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 }
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * @desc Get current user profile
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json(new ApiResponse(200, user));
});

/**
 * @desc Update current user's profile
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  if (!fullName?.trim()) {
    throw new ApiError(400, "Full Name is required");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { fullName: fullName.trim() },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

/**
 * @desc Change password for the logged-in user
 */
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  changePassword
};
