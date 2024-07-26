const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const hasUserExists = await User.findOne({ email });
  if (hasUserExists) {
    res.status(404);
    throw new Error("User already exists!!");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    const { _id, name, email, isAdmin, pic } = user;
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      pic,
      token: generateToken(_id)
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!!");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin, pic } = user;
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      pic,
      token: generateToken(_id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!!");
  }
});

module.exports = { registerUser, authUser };
