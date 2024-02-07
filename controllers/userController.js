const User = require("../models/Users/UserModel");
const catchAsync = require("../utils/catchAsyncError");

exports.createUser = catchAsync(async function (req, res, next) {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
});

exports.deleteUser = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
});
