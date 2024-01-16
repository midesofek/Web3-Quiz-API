const jwt = require("jsonwebtoken");
const User = require("../models/Users/UserModel");
require("dotenv").config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const authController = {};

const signToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

authController.signup = async function (req, res) {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    //log in user immediately after signup completes
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      data: err,
    });
  }
};

authController.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    /// 1) Check if password and email exists
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        data: "Please provide email and password!",
      });
    }

    /// 2) Check if user exists and password is correct
    // explicitly select password bcos it has been excluded from query results
    // by using "select: false" --> in the UserModel
    // the use of "+" means that the field to be selected
    const user = await User.findOne({ email }).select("+password");

    /// 2b) Compare user with what you have in the database
    // This comparison is done on the Schema itself using the "instance method"

    /// N.B: NEVER CHECK PASSWORD AND EMAIL SEPARATELY, it is intentional to keep
    /// the check vague to not give potential attackers, any ideas
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        data: "Incorrect email or password!",
      });
    }

    console.log(user);

    /// 3) All good? Send the token
    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      data: err,
    });
  }
};

module.exports = authController;
