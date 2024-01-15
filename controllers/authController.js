const User = require("../models/Users/UserModel");

const authController = {};

authController.signup = async function (req, res) {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      data: err,
    });
  }
};

module.exports = authController;
